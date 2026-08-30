import type { ExifData, MediaFile, StampOptions, StampResult } from './types';
import { META_MAKE, META_MODEL, META_SOFTWARE } from './types';

/**
 * Lee los metadatos de un archivo MP4.
 * @param buf El ArrayBuffer del video
 * @returns Los datos encontrados
 */
export function readMp4Metadata(buf: ArrayBuffer): ExifData {
  const dv = new DataView(buf);
  let offset = 0;
  
  let make: string | null = null;
  let model: string | null = null;
  
  while (offset < dv.byteLength) {
    if (offset + 8 > dv.byteLength) break;
    let size = dv.getUint32(offset);
    const type = getStr(dv, offset + 4, 4);
    const boxOffset = offset;
    let dataOffset = offset + 8;
    
    if (size === 1) {
      if (offset + 16 > dv.byteLength) break;
      const sizeBig = dv.getBigUint64(offset + 8);
      size = Number(sizeBig);
      dataOffset = offset + 16;
    } else if (size === 0) {
      size = dv.byteLength - offset;
    }
    
    if (size < 8) break;
    
    if (type === 'moov' || type === 'udta' || type === 'meta' || type === 'ilst') {
      if (type === 'meta') {
        dataOffset += 4; // meta tiene version + flags (4 bytes)
      }
      offset = dataOffset;
      continue;
    }
    
    if (type === '©mak' || type === '©mod') {
      const dataSize = dv.getUint32(dataOffset);
      const dataType = getStr(dv, dataOffset + 4, 4);
      if (dataType === 'data' && dataSize >= 16) {
        const val = getStr(dv, dataOffset + 16, dataSize - 16);
        if (type === '©mak') make = val;
        if (type === '©mod') model = val;
      }
    }
    
    offset = boxOffset + size;
  }
  
  return { make, model, orientation: 1 };
}

function getStr(dv: DataView, offset: number, len: number): string {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += String.fromCharCode(dv.getUint8(offset + i));
  }
  return s;
}

function writeStr(buf: Uint8Array, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    buf[offset + i] = str.charCodeAt(i);
  }
}

interface BoxInfo {
  type: string;
  size: number;
  offset: number;
  headerSize: number;
}

/**
 * Modifica el MP4 para inyectar metadatos Meta preservando el flujo de video y ajustando stco/co64.
 * @param bytes Los bytes originales del video
 * @returns El video modificado en un Uint8Array
 */
export function stampVideo(bytes: Uint8Array): Uint8Array {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  
  let offset = 0;
  let moovBox: BoxInfo | null = null;
  const boxes: BoxInfo[] = [];
  
  while (offset < dv.byteLength) {
    if (offset + 8 > dv.byteLength) break;
    let size = dv.getUint32(offset);
    const type = getStr(dv, offset + 4, 4);
    let headerSize = 8;
    
    if (size === 1) {
      if (offset + 16 > dv.byteLength) break;
      size = Number(dv.getBigUint64(offset + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = dv.byteLength - offset;
    }
    
    if (size < 8) break;
    
    const box: BoxInfo = { type, size, offset, headerSize };
    boxes.push(box);
    
    if (type === 'moov') {
      moovBox = box;
    }
    
    offset += size;
  }
  
  if (!moovBox) throw new Error('No se encontró el átomo moov en el archivo de video.');
  
  // 1. Extraer y filtrar cajas internas de moov (eliminando udta anterior)
  const moovBytes = bytes.subarray(moovBox.offset, moovBox.offset + moovBox.size);
  const moovDv = new DataView(moovBytes.buffer, moovBytes.byteOffset, moovBytes.byteLength);
  
  let moovOffset = moovBox.headerSize;
  const newMoovBoxes: Uint8Array[] = [];
  
  while (moovOffset < moovBytes.length) {
    if (moovOffset + 8 > moovBytes.length) break;
    let size = moovDv.getUint32(moovOffset);
    const type = getStr(moovDv, moovOffset + 4, 4);
    if (size === 1) {
      if (moovOffset + 16 > moovBytes.length) break;
      size = Number(moovDv.getBigUint64(moovOffset + 8));
    } else if (size === 0) {
      size = moovBytes.length - moovOffset;
    }
    
    if (size < 8) break;
    
    if (type !== 'udta') {
      newMoovBoxes.push(moovBytes.subarray(moovOffset, moovOffset + size));
    }
    
    moovOffset += size;
  }
  
  // 2. Construir nuevo átomo udta completo (QuickTime Keys + iTunes 4CC metadata)
  const makeStr = META_MAKE;
  const modelStr = META_MODEL;
  const softwareStr = META_SOFTWARE;
  
  const encoder = new TextEncoder();
  const makeBytes = encoder.encode(makeStr);
  const modelBytes = encoder.encode(modelStr);
  const softBytes = encoder.encode(softwareStr);
  
  // Keys box (QuickTime)
  const key1 = 'com.apple.quicktime.make';
  const key2 = 'com.apple.quicktime.model';
  const key3 = 'com.apple.quicktime.software';
  
  const keysPayloadSize = 8 + (8 + key1.length) + (8 + key2.length) + (8 + key3.length);
  const keysBoxSize = 8 + keysPayloadSize;
  
  // ilst box items (Keys + 4CC)
  const dataHeaderSize = 16;
  const itemHeaderSize = 8;
  
  const item1Size = itemHeaderSize + dataHeaderSize + makeBytes.length;
  const item2Size = itemHeaderSize + dataHeaderSize + modelBytes.length;
  const item3Size = itemHeaderSize + dataHeaderSize + softBytes.length;
  
  // 4CC items: ©mak, ©mod, ©swr
  const fourcc1Size = itemHeaderSize + dataHeaderSize + makeBytes.length;
  const fourcc2Size = itemHeaderSize + dataHeaderSize + modelBytes.length;
  const fourcc3Size = itemHeaderSize + dataHeaderSize + softBytes.length;
  
  const ilstPayloadSize = item1Size + item2Size + item3Size + fourcc1Size + fourcc2Size + fourcc3Size;
  const ilstBoxSize = 8 + ilstPayloadSize;
  
  // hdlr box
  const hdlrBoxSize = 33;
  
  // meta box (FullBox: 12 bytes header)
  const metaBoxSize = 12 + hdlrBoxSize + keysBoxSize + ilstBoxSize;
  const udtaBoxSize = 8 + metaBoxSize;
  
  const udtaBuf = new Uint8Array(udtaBoxSize);
  const uDv = new DataView(udtaBuf.buffer);
  
  // Escribir udta
  uDv.setUint32(0, udtaBoxSize);
  writeStr(udtaBuf, 4, 'udta');
  
  // Escribir meta (FullBox)
  let p = 8;
  uDv.setUint32(p, metaBoxSize);
  writeStr(udtaBuf, p + 4, 'meta');
  uDv.setUint32(p + 8, 0); // version + flags
  p += 12;
  
  // Escribir hdlr
  uDv.setUint32(p, hdlrBoxSize);
  writeStr(udtaBuf, p + 4, 'hdlr');
  uDv.setUint32(p + 8, 0);
  uDv.setUint32(p + 12, 0);
  writeStr(udtaBuf, p + 16, 'mdta');
  p += hdlrBoxSize;
  
  // Escribir keys
  uDv.setUint32(p, keysBoxSize);
  writeStr(udtaBuf, p + 4, 'keys');
  uDv.setUint32(p + 8, 0); // version + flags
  uDv.setUint32(p + 12, 3); // count
  p += 16;
  
  const writeKeyEntry = (keyName: string) => {
    uDv.setUint32(p, 8 + keyName.length);
    writeStr(udtaBuf, p + 4, 'mdta');
    writeStr(udtaBuf, p + 8, keyName);
    p += 8 + keyName.length;
  };
  writeKeyEntry(key1);
  writeKeyEntry(key2);
  writeKeyEntry(key3);
  
  // Escribir ilst
  uDv.setUint32(p, ilstBoxSize);
  writeStr(udtaBuf, p + 4, 'ilst');
  p += 8;
  
  const writeIndexedData = (index: number, valBytes: Uint8Array) => {
    const totalItem = 8 + 16 + valBytes.length;
    uDv.setUint32(p, totalItem);
    uDv.setUint32(p + 4, index);
    uDv.setUint32(p + 8, 16 + valBytes.length);
    writeStr(udtaBuf, p + 12, 'data');
    uDv.setUint32(p + 16, 1); // UTF-8 text type
    uDv.setUint32(p + 20, 0); // locale
    udtaBuf.set(valBytes, p + 24);
    p += totalItem;
  };
  
  writeIndexedData(1, makeBytes);
  writeIndexedData(2, modelBytes);
  writeIndexedData(3, softBytes);
  
  const writeFourCCData = (tagFourCC: string, valBytes: Uint8Array) => {
    const totalItem = 8 + 16 + valBytes.length;
    uDv.setUint32(p, totalItem);
    writeStr(udtaBuf, p + 4, tagFourCC);
    uDv.setUint32(p + 8, 16 + valBytes.length);
    writeStr(udtaBuf, p + 12, 'data');
    uDv.setUint32(p + 16, 1);
    uDv.setUint32(p + 20, 0);
    udtaBuf.set(valBytes, p + 24);
    p += totalItem;
  };
  
  writeFourCCData('\xa9mak', makeBytes);
  writeFourCCData('\xa9mod', modelBytes);
  writeFourCCData('\xa9swr', softBytes);
  
  newMoovBoxes.push(udtaBuf);
  
  // 3. Ensamblar nuevo moov
  const newMoovContentLength = newMoovBoxes.reduce((acc, b) => acc + b.length, 0);
  const newMoovSize = moovBox.headerSize + newMoovContentLength;
  const newMoovBuf = new Uint8Array(newMoovSize);
  const nmDv = new DataView(newMoovBuf.buffer);
  
  if (moovBox.headerSize === 8) {
    nmDv.setUint32(0, newMoovSize);
    writeStr(newMoovBuf, 4, 'moov');
  } else {
    nmDv.setUint32(0, 1);
    writeStr(newMoovBuf, 4, 'moov');
    nmDv.setBigUint64(8, BigInt(newMoovSize));
  }
  
  let cp = moovBox.headerSize;
  for (const b of newMoovBoxes) {
    newMoovBuf.set(b, cp);
    cp += b.length;
  }
  
  // 4. Calcular delta de desplazamiento de bytes
  const delta = newMoovSize - moovBox.size;
  const moovOffsetPos = moovBox.offset;
  
  // 5. Ajustar offsets de chunks (stco y co64) de forma precisa
  const adjustStcoOffsets = (buffer: Uint8Array, start: number, end: number) => {
    const d = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let o = start;
    while (o < end) {
      if (o + 8 > end) break;
      let size = d.getUint32(o);
      const type = getStr(d, o + 4, 4);
      let head = 8;
      if (size === 1) {
        if (o + 16 > end) break;
        size = Number(d.getBigUint64(o + 8));
        head = 16;
      } else if (size === 0) {
        size = end - o;
      }
      
      if (size < 8) break;
      
      if (type === 'trak' || type === 'mdia' || type === 'minf' || type === 'stbl' || type === 'moov') {
        adjustStcoOffsets(buffer, o + head, o + size);
      } else if (type === 'stco') {
        const count = d.getUint32(o + head + 4);
        let pStco = o + head + 8;
        for (let i = 0; i < count; i++) {
          const val = d.getUint32(pStco);
          // Si el chunk estaba después del átomo moov en el archivo original, se desplaza por delta
          if (val > moovOffsetPos) {
            d.setUint32(pStco, val + delta);
          }
          pStco += 4;
        }
      } else if (type === 'co64') {
        const count = d.getUint32(o + head + 4);
        let pCo64 = o + head + 8;
        for (let i = 0; i < count; i++) {
          const val = d.getBigUint64(pCo64);
          if (val > BigInt(moovOffsetPos)) {
            d.setBigUint64(pCo64, val + BigInt(delta));
          }
          pCo64 += 8;
        }
      }
      
      o += size;
    }
  };
  
  adjustStcoOffsets(newMoovBuf, moovBox.headerSize, newMoovSize);
  
  // 6. Ensamblaje final in-place: [antes de moov] + [nuevo moov] + [después de moov]
  const totalLength = bytes.byteLength + delta;
  const output = new Uint8Array(totalLength);
  
  // Parte 1: Todo antes de moov (ftyp, etc.)
  output.set(bytes.subarray(0, moovBox.offset), 0);
  
  // Parte 2: Nuevo moov con metadatos actualizados y stco corregido
  output.set(newMoovBuf, moovBox.offset);
  
  // Parte 3: Todo después de moov (mdat, etc.) en su posición correcta
  output.set(bytes.subarray(moovBox.offset + moovBox.size), moovBox.offset + newMoovSize);
  
  return output;
}

/**
 * Procesa un video inyectando metadatos sin recodificar y conservando 100% de calidad.
 * @param file El archivo a procesar
 * @param _options Opciones
 * @returns Promesa con el resultado
 */
export async function processVideo(file: MediaFile, _options: StampOptions): Promise<StampResult> {
  const finalBytes = stampVideo(file.bytes);
  
  const extIndex = file.file.name.lastIndexOf('.');
  const baseName = extIndex !== -1 ? file.file.name.substring(0, extIndex) : file.file.name;
  const filename = `${baseName}_META_SPIN.mp4`;
  
  return {
    blob: new Blob([new Uint8Array(finalBytes)], { type: 'video/mp4' }),
    filename
  };
}
