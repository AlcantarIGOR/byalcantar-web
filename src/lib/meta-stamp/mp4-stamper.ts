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
    let boxOffset = offset;
    let dataOffset = offset + 8;
    
    if (size === 1) {
      if (offset + 16 > dv.byteLength) break;
      const sizeBig = dv.getBigUint64(offset + 8);
      size = Number(sizeBig);
      dataOffset = offset + 16;
    } else if (size === 0) {
      size = dv.byteLength - offset;
    }
    
    if (type === 'moov' || type === 'udta' || type === 'meta' || type === 'ilst') {
      if (type === 'meta') {
        dataOffset += 4;
      }
      offset = dataOffset;
      continue;
    }
    
    if (type === '©mak' || type === '©mod') {
      const dataSize = dv.getUint32(dataOffset);
      const dataType = getStr(dv, dataOffset + 4, 4);
      if (dataType === 'data') {
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

interface Box {
  type: string;
  size: number;
  offset: number;
  headerSize: number;
}

/**
 * Modifica el MP4 para inyectar metadatos Meta.
 * @param bytes Los bytes originales del video
 * @returns El video modificado
 */
export function stampVideo(bytes: Uint8Array): Uint8Array {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  
  let offset = 0;
  let moovBox: Box | null = null;
  const boxes: Box[] = [];
  
  while (offset < dv.byteLength) {
    if (offset + 8 > dv.byteLength) break;
    let size = dv.getUint32(offset);
    const type = getStr(dv, offset + 4, 4);
    let headerSize = 8;
    
    if (size === 1) {
      size = Number(dv.getBigUint64(offset + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = dv.byteLength - offset;
    }
    
    const box = { type, size, offset, headerSize };
    boxes.push(box);
    
    if (type === 'moov') {
      moovBox = box;
    }
    
    offset += size;
  }
  
  if (!moovBox) throw new Error('No se encontro el box moov');
  
  // Extraer moov
  const moovBytes = bytes.slice(moovBox.offset, moovBox.offset + moovBox.size);
  const moovDv = new DataView(moovBytes.buffer, moovBytes.byteOffset, moovBytes.byteLength);
  
  // Eliminar udta viejo de moov
  let moovOffset = moovBox.headerSize;
  const newMoovBoxes: Uint8Array[] = [];
  
  while (moovOffset < moovBytes.length) {
    let size = moovDv.getUint32(moovOffset);
    const type = getStr(moovDv, moovOffset + 4, 4);
    if (size === 1) {
        size = Number(moovDv.getBigUint64(moovOffset + 8));
    }
    
    if (type !== 'udta') {
      newMoovBoxes.push(moovBytes.slice(moovOffset, moovOffset + size));
    }
    
    moovOffset += size;
  }
  
  // Construir nuevo udta
  const makeStr = META_MAKE;
  const modelStr = META_MODEL;
  const softwareStr = META_SOFTWARE;
  
  // Apple QuickTime Keys meta format
  const keysPayloadSize = 8 + 
                          (8 + 24) + 
                          (8 + 25) + 
                          (8 + 28);  
  const keysBoxSize = 8 + keysPayloadSize;
  
  const ilstItemHeader = 8; 
  const dataHeader = 16; 
  const makeDataSize = dataHeader + makeStr.length;
  const modelDataSize = dataHeader + modelStr.length;
  const softDataSize = dataHeader + softwareStr.length;
  
  const ilstPayloadSize = (ilstItemHeader + makeDataSize) +
                          (ilstItemHeader + modelDataSize) +
                          (ilstItemHeader + softDataSize);
  const ilstBoxSize = 8 + ilstPayloadSize;
  
  const hdlrBoxSize = 33;
  const metaBoxSize = 12 + hdlrBoxSize + keysBoxSize + ilstBoxSize;
  const udtaBoxSize = 8 + metaBoxSize;
  
  const udtaBuf = new Uint8Array(udtaBoxSize);
  const uDv = new DataView(udtaBuf.buffer);
  
  // udta
  uDv.setUint32(0, udtaBoxSize);
  writeStr(udtaBuf, 4, 'udta');
  
  // meta
  let p = 8;
  uDv.setUint32(p, metaBoxSize);
  writeStr(udtaBuf, p + 4, 'meta');
  uDv.setUint32(p + 8, 0); 
  p += 12;
  
  // hdlr
  uDv.setUint32(p, hdlrBoxSize);
  writeStr(udtaBuf, p + 4, 'hdlr');
  uDv.setUint32(p + 8, 0); 
  uDv.setUint32(p + 12, 0); 
  writeStr(udtaBuf, p + 16, 'mdta');
  uDv.setUint32(p + 20, 0);
  uDv.setUint32(p + 24, 0);
  uDv.setUint32(p + 28, 0);
  udtaBuf[p + 32] = 0;
  p += hdlrBoxSize;
  
  // keys
  uDv.setUint32(p, keysBoxSize);
  writeStr(udtaBuf, p + 4, 'keys');
  uDv.setUint32(p + 8, 0); 
  uDv.setUint32(p + 12, 3); 
  p += 16;
  
  const writeKey = (str: string) => {
    uDv.setUint32(p, 8 + str.length);
    writeStr(udtaBuf, p + 4, 'mdta');
    writeStr(udtaBuf, p + 8, str);
    p += 8 + str.length;
  };
  writeKey('com.apple.quicktime.make');
  writeKey('com.apple.quicktime.model');
  writeKey('com.apple.quicktime.software');
  
  // ilst
  uDv.setUint32(p, ilstBoxSize);
  writeStr(udtaBuf, p + 4, 'ilst');
  p += 8;
  
  const writeData = (idx: number, val: string) => {
    uDv.setUint32(p, 8 + 16 + val.length);
    uDv.setUint32(p + 4, idx); 
    
    uDv.setUint32(p + 8, 16 + val.length);
    writeStr(udtaBuf, p + 12, 'data');
    uDv.setUint32(p + 16, 1); 
    uDv.setUint32(p + 20, 0); 
    writeStr(udtaBuf, p + 24, val);
    
    p += 8 + 16 + val.length;
  };
  writeData(1, makeStr);
  writeData(2, modelStr);
  writeData(3, softwareStr);
  
  newMoovBoxes.push(udtaBuf);
  
  // Ensamblar nuevo moov
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
  
  // Actualizar stco / co64 offsets
  const ftypBox = boxes.find(b => b.type === 'ftyp');
  const mdatBox = boxes.find(b => b.type === 'mdat');
  
  if (!ftypBox) throw new Error('Sin ftyp');
  if (!mdatBox) throw new Error('Sin mdat');
  
  const initialOffset = ftypBox.size + newMoovSize;
  const offsetDelta = initialOffset - mdatBox.offset;
  
  const adjustOffsets = (buffer: Uint8Array, start: number, length: number) => {
    const d = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let o = start;
    while (o < start + length) {
      if (o + 8 > buffer.byteLength) break;
      let size = d.getUint32(o);
      const type = getStr(d, o + 4, 4);
      let head = 8;
      if (size === 1) {
          size = Number(d.getBigUint64(o + 8));
          head = 16;
      }
      
      if (type === 'trak' || type === 'mdia' || type === 'minf' || type === 'stbl') {
        adjustOffsets(buffer, o + head, size - head);
      } else if (type === 'stco') {
        const count = d.getUint32(o + head + 4);
        let pStco = o + head + 8;
        for (let i = 0; i < count; i++) {
          const val = d.getUint32(pStco);
          d.setUint32(pStco, val + offsetDelta);
          pStco += 4;
        }
      } else if (type === 'co64') {
        const count = d.getUint32(o + head + 4);
        let pCo64 = o + head + 8;
        for (let i = 0; i < count; i++) {
          const val = d.getBigUint64(pCo64);
          d.setBigUint64(pCo64, val + BigInt(offsetDelta));
          pCo64 += 8;
        }
      }
      o += size;
    }
  };
  
  adjustOffsets(newMoovBuf, moovBox.headerSize, newMoovContentLength);
  
  // Re-ensamblar final
  const outputLength = bytes.byteLength - moovBox.size + newMoovSize;
  const output = new Uint8Array(outputLength);
  
  output.set(bytes.slice(ftypBox.offset, ftypBox.offset + ftypBox.size), 0);
  output.set(newMoovBuf, ftypBox.size);
  
  let outPos = ftypBox.size + newMoovSize;
  for (const box of boxes) {
    if (box.type === 'ftyp' || box.type === 'moov') continue;
    output.set(bytes.slice(box.offset, box.offset + box.size), outPos);
    outPos += box.size;
  }
  
  return output;
}

/**
 * Procesa un video inyectando metadatos sin recodificar.
 * @param file El archivo a procesar
 * @param _options Opciones (no aplicadas a video)
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
