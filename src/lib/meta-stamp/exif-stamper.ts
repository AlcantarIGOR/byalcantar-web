import type { ExifData, MediaFile, StampOptions, StampResult } from './types';
import { META_MAKE, META_MODEL, NATIVE_W, NATIVE_H } from './types';

/**
 * Lee los metadatos EXIF de un archivo JPEG.
 * @param buf El ArrayBuffer de la imagen
 * @returns Los datos EXIF encontrados o un objeto con valores nulos
 */
export function readExif(buf: ArrayBuffer): ExifData {
  const dataView = new DataView(buf);
  let offset = 0;

  const defaultExif: ExifData = { make: null, model: null, orientation: 1 };

  // Verifica si es un archivo JPEG válido
  if (dataView.byteLength < 2 || dataView.getUint16(offset) !== 0xFFD8) {
    return defaultExif;
  }
  offset += 2;

  while (offset < dataView.byteLength) {
    const marker = dataView.getUint16(offset);
    offset += 2;
    const length = dataView.getUint16(offset);

    // APP1 Marker (EXIF)
    if (marker === 0xFFE1) {
      const isExif = dataView.getUint32(offset + 2) === 0x45786966; // "Exif"
      if (!isExif) {
        offset += length;
        continue;
      }
      
      const tiffOffset = offset + 8;
      const endianness = dataView.getUint16(tiffOffset);
      const isLittleEndian = endianness === 0x4949; // "II"

      const ifdOffset = dataView.getUint32(tiffOffset + 4, isLittleEndian);
      let currentOffset = tiffOffset + ifdOffset;

      const numTags = dataView.getUint16(currentOffset, isLittleEndian);
      currentOffset += 2;

      let make: string | null = null;
      let model: string | null = null;
      let orientation = 1;

      for (let i = 0; i < numTags; i++) {
        const tag = dataView.getUint16(currentOffset, isLittleEndian);
        const numValues = dataView.getUint32(currentOffset + 4, isLittleEndian);
        const valueOffset = dataView.getUint32(currentOffset + 8, isLittleEndian);

        if (tag === 0x010F) { // Make
          make = getString(dataView, tiffOffset + valueOffset, numValues - 1);
        } else if (tag === 0x0110) { // Model
          model = getString(dataView, tiffOffset + valueOffset, numValues - 1);
        } else if (tag === 0x0112) { // Orientation
          orientation = valueOffset >> 16;
          if (isLittleEndian) {
              orientation = valueOffset & 0xFFFF;
          }
        }
        currentOffset += 12;
      }
      return { make, model, orientation };
    }
    offset += length;
  }
  return defaultExif;
}

function getString(dataView: DataView, offset: number, length: number): string {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(dataView.getUint8(offset + i));
  }
  return str;
}

/**
 * Construye un segmento APP1 EXIF completo.
 * @returns Un Uint8Array con los datos del segmento APP1
 */
export function buildApp1(): Uint8Array {
  const makeStr = META_MAKE + '\0';
  const modelStr = META_MODEL + '\0';
  
  const headerSize = 18; // APP1 marker(2) + size(2) + "Exif\0\0"(6) + TIFF header(8)
  const numTags = 7;
  const ifdSize = 2 + (numTags * 12) + 4; 
  const valuesOffset = headerSize + ifdSize;
  
  const makeLen = makeStr.length;
  const modelLen = modelStr.length;
  const rationalSize = 8;
  
  const totalSize = valuesOffset + makeLen + modelLen + (rationalSize * 2);
  const buffer = new Uint8Array(totalSize);
  const dv = new DataView(buffer.buffer);
  
  // Escribiendo marcadores JPEG y cabecera
  dv.setUint16(0, 0xFFE1); // APP1
  dv.setUint16(2, totalSize - 2); // Size
  dv.setUint32(4, 0x45786966); // "Exif"
  dv.setUint16(8, 0x0000); 
  
  // TIFF Header (Big-Endian)
  dv.setUint16(10, 0x4D4D); // "MM"
  dv.setUint16(12, 0x002A); // Magic
  dv.setUint32(14, 0x00000008); // Offset a IFD0
  
  // IFD0
  let offset = headerSize;
  dv.setUint16(offset, numTags);
  offset += 2;
  
  let currentDataOffset = valuesOffset;
  const tiffBase = 10;
  
  // Tag: Make (0x010F)
  dv.setUint16(offset, 0x010F);
  dv.setUint16(offset + 2, 2); // ASCII
  dv.setUint32(offset + 4, makeLen);
  dv.setUint32(offset + 8, currentDataOffset - tiffBase);
  offset += 12;
  
  for (let i = 0; i < makeLen; i++) {
    buffer[currentDataOffset++] = makeStr.charCodeAt(i);
  }
  
  // Tag: Model (0x0110)
  dv.setUint16(offset, 0x0110);
  dv.setUint16(offset + 2, 2); // ASCII
  dv.setUint32(offset + 4, modelLen);
  dv.setUint32(offset + 8, currentDataOffset - tiffBase);
  offset += 12;
  
  for (let i = 0; i < modelLen; i++) {
    buffer[currentDataOffset++] = modelStr.charCodeAt(i);
  }
  
  // Tag: Orientation (0x0112)
  dv.setUint16(offset, 0x0112);
  dv.setUint16(offset + 2, 3); // SHORT
  dv.setUint32(offset + 4, 1);
  dv.setUint32(offset + 8, 1 << 16);
  offset += 12;
  
  // Tag: XResolution (0x011A)
  dv.setUint16(offset, 0x011A);
  dv.setUint16(offset + 2, 5); // RATIONAL
  dv.setUint32(offset + 4, 1);
  dv.setUint32(offset + 8, currentDataOffset - tiffBase);
  offset += 12;
  dv.setUint32(currentDataOffset, 72);
  dv.setUint32(currentDataOffset + 4, 1);
  currentDataOffset += 8;
  
  // Tag: YResolution (0x011B)
  dv.setUint16(offset, 0x011B);
  dv.setUint16(offset + 2, 5); // RATIONAL
  dv.setUint32(offset + 4, 1);
  dv.setUint32(offset + 8, currentDataOffset - tiffBase);
  offset += 12;
  dv.setUint32(currentDataOffset, 72);
  dv.setUint32(currentDataOffset + 4, 1);
  currentDataOffset += 8;
  
  // Tag: ResolutionUnit (0x0128)
  dv.setUint16(offset, 0x0128);
  dv.setUint16(offset + 2, 3); // SHORT
  dv.setUint32(offset + 4, 1);
  dv.setUint32(offset + 8, 2 << 16);
  offset += 12;
  
  // Tag: YCbCrPositioning (0x0213)
  dv.setUint16(offset, 0x0213);
  dv.setUint16(offset + 2, 3); // SHORT
  dv.setUint32(offset + 4, 1);
  dv.setUint32(offset + 8, 1 << 16);
  offset += 12;
  
  dv.setUint32(offset, 0); // Next IFD offset
  
  return buffer;
}

/**
 * Inserta el segmento EXIF modificado en los bytes originales.
 * @param bytes Los bytes originales de la imagen JPEG
 * @returns Un Uint8Array con los bytes modificados
 */
export function stampPhoto(bytes: Uint8Array): Uint8Array {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 2; // Salta SOI
  
  const segments: Uint8Array[] = [];
  segments.push(bytes.slice(0, 2)); // SOI
  segments.push(buildApp1()); // Nuevo APP1
  
  while (offset < dv.byteLength) {
    const marker = dv.getUint16(offset);
    if (marker === 0xFFDA) { // SOS (Start of Scan) - copiar resto del archivo
      segments.push(bytes.slice(offset));
      break;
    }
    
    const length = dv.getUint16(offset + 2);
    if (!((marker >= 0xFFE0 && marker <= 0xFFEF) || marker === 0xFFFE)) {
      segments.push(bytes.slice(offset, offset + 2 + length));
    }
    
    offset += 2 + length;
  }
  
  const totalLength = segments.reduce((acc, seg) => acc + seg.length, 0);
  const result = new Uint8Array(totalLength);
  let currentOffset = 0;
  for (const seg of segments) {
    result.set(seg, currentOffset);
    currentOffset += seg.length;
  }
  
  return result;
}

/**
 * Procesa un archivo de foto aplicando la marca EXIF y redimensionando si es necesario.
 * @param file Objeto MediaFile con los datos a procesar
 * @param options Opciones de estampado (resize)
 * @returns Promesa con el resultado de estampado (blob y nombre de archivo)
 */
export async function processPhoto(file: MediaFile, options: StampOptions): Promise<StampResult> {
  let finalBytes: Uint8Array;
  
  const isJpeg = file.file.type === 'image/jpeg' || file.file.type === 'image/jpg';
  
  if (options.resize === 'original' && isJpeg && file.originalExif.orientation === 1) {
    finalBytes = stampPhoto(file.bytes);
  } else {
    let img: ImageBitmap | HTMLImageElement;
    
    try {
      img = await createImageBitmap(file.file, { imageOrientation: 'from-image' });
    } catch {
      img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = URL.createObjectURL(file.file);
      });
    }
    
    const canvas = document.createElement('canvas');
    if (options.resize === 'native') {
      canvas.width = NATIVE_W;
      canvas.height = NATIVE_H;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }
    
    const ctx = canvas.getContext('2d')!;
    
    if (options.resize === 'native') {
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / scale - img.width) / 2;
      const y = (canvas.height / scale - img.height) / 2;
      ctx.scale(scale, scale);
      ctx.drawImage(img as CanvasImageSource, x, y);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      ctx.drawImage(img as CanvasImageSource, 0, 0);
    }
    
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(b => {
        if (b) resolve(b);
        else reject(new Error('Fallo al exportar canvas a Blob'));
      }, 'image/jpeg', 0.96);
    });
    
    const arrayBuffer = await blob.arrayBuffer();
    finalBytes = stampPhoto(new Uint8Array(arrayBuffer));
  }
  
  const extIndex = file.file.name.lastIndexOf('.');
  const baseName = extIndex !== -1 ? file.file.name.substring(0, extIndex) : file.file.name;
  const filename = `${baseName}_META_SPIN.jpg`;
  
  return {
    blob: new Blob([new Uint8Array(finalBytes)], { type: 'image/jpeg' }),
    filename
  };
}
