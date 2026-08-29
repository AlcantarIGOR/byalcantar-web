// Tipos compartidos para el proyecto Meta Stamp Studio en byalcantar-web

export type MediaMode = 'photo' | 'video';

export interface ExifData {
  make: string | null;
  model: string | null;
  orientation: number;
}

export interface MediaFile {
  file: File;
  bytes: Uint8Array;
  mode: MediaMode;
  originalExif: ExifData;
  previewUrl: string;
  width: number;
  height: number;
}

export interface StampOptions {
  resize: 'native' | 'original';
}

export interface StampResult {
  blob: Blob;
  filename: string;
}

export const META_MAKE = 'Meta AI';
export const META_MODEL = 'Ray-Ban Meta Smart Glasses 2';
export const META_SOFTWARE = 'Meta View';
export const NATIVE_W = 3024;
export const NATIVE_H = 4032;
