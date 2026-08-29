"use client";

import { useCallback, useRef, useState } from 'react';
import { Upload, ImagePlus, Film, RefreshCw } from 'lucide-react';
import type { MediaMode } from '@/lib/meta-stamp/types';

interface DropzoneProps {
  mode: MediaMode;
  onFile: (file: File) => void;
  hasFile: boolean;
  previewUrl: string | null;
  isVideo: boolean;
}

export default function Dropzone({ mode, onFile, hasFile, previewUrl, isVideo }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = mode === 'photo'
    ? 'image/jpeg,image/png,image/webp'
    : 'video/mp4,video/quicktime';

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden select-none ${
        isDragging
          ? 'border-[#a3e635] bg-[#a3e635]/5 ring-1 ring-[#a3e635]'
          : hasFile
            ? 'border-[#2c2c2c] bg-[#1e1e1e]/40 hover:border-[#3c3c3c]'
            : 'border-[#2c2c2c] border-dashed bg-[#1e1e1e]/30 hover:border-[#a3e635]/60 hover:bg-[#222222]/40'
      } ${hasFile ? 'min-h-[220px]' : 'min-h-[260px]'}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {hasFile && previewUrl ? (
        <div className="relative w-full flex items-center justify-center p-5 bg-[#141414]">
          {isVideo ? (
            <video
              src={previewUrl}
              controls
              className="max-h-[340px] rounded-lg object-contain shadow-2xl border border-[#2c2c2c]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-[340px] rounded-lg object-contain shadow-2xl border border-[#2c2c2c]"
            />
          )}

          <div className="absolute inset-0 bg-[#000000]/70 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl backdrop-blur-xs">
            <div className="flex items-center gap-2 text-white text-xs font-mono bg-[#222222] border border-[#2c2c2c] px-4 py-2 rounded-lg shadow-xl">
              <RefreshCw size={13} className="text-[#a3e635]" />
              <span>Click o arrastra para cambiar archivo</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[260px] gap-4 p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#222222] border border-[#2c2c2c] flex items-center justify-center shadow-inner">
            {mode === 'photo' ? (
              <ImagePlus size={24} className="text-[#a3e635]" />
            ) : (
              <Film size={24} className="text-[#a3e635]" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-white font-medium text-[15px] font-sans">
              {mode === 'photo' ? 'Suelta una foto aquí' : 'Suelta un video aquí'}
            </p>
            <p className="text-[#9b9b9b] text-xs font-mono">
              {mode === 'photo'
                ? 'JPEG, PNG o WebP · Arrastra o selecciona'
                : 'MP4 o MOV · Arrastra o selecciona'
              }
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9b9b9b]/70 border border-[#2c2c2c] rounded px-2.5 py-1 bg-[#222222]/30">
            <Upload size={12} className="text-[#a3e635]" />
            <span>PROCESAMIENTO 100% CLIENT-SIDE</span>
          </div>
        </div>
      )}
    </div>
  );
}
