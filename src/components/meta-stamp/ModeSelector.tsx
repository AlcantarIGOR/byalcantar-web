"use client";

import { Camera, Film } from 'lucide-react';
import type { MediaMode } from '@/lib/meta-stamp/types';

interface ModeSelectorProps {
  mode: MediaMode;
  onChange: (mode: MediaMode) => void;
}

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="border-b border-[#2c2c2c] pb-4 mb-6">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onChange('photo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-[13px] font-mono transition-all duration-150 cursor-pointer border ${
            mode === 'photo'
              ? 'bg-[#a3e635] text-black font-semibold border-[#a3e635] shadow-[0_0_14px_rgba(163,230,53,0.25)]'
              : 'bg-[#222222]/40 text-[#9b9b9b] border-[#2c2c2c] hover:text-white hover:border-[#3c3c3c]'
          }`}
        >
          <Camera size={14} className={mode === 'photo' ? 'text-black' : 'text-[#a3e635]'} />
          <span>FOTOS</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
              mode === 'photo' ? 'bg-black/20 text-black' : 'bg-[#2c2c2c] text-[#9b9b9b]'
            }`}
          >
            Spin View
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChange('video')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-[13px] font-mono transition-all duration-150 cursor-pointer border ${
            mode === 'video'
              ? 'bg-[#a3e635] text-black font-semibold border-[#a3e635] shadow-[0_0_14px_rgba(163,230,53,0.25)]'
              : 'bg-[#222222]/40 text-[#9b9b9b] border-[#2c2c2c] hover:text-white hover:border-[#3c3c3c]'
          }`}
        >
          <Film size={14} className={mode === 'video' ? 'text-black' : 'text-[#a3e635]'} />
          <span>VIDEOS</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
              mode === 'video' ? 'bg-black/20 text-black' : 'bg-[#2c2c2c] text-[#9b9b9b]'
            }`}
          >
            Ray-Ban Meta
          </span>
        </button>
      </div>
    </div>
  );
}
