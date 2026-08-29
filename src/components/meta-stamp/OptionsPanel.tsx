"use client";

import { Crop, Maximize2, Sliders } from 'lucide-react';
import type { StampOptions, MediaMode } from '@/lib/meta-stamp/types';
import { NATIVE_W, NATIVE_H } from '@/lib/meta-stamp/types';

interface OptionsPanelProps {
  options: StampOptions;
  onChange: (options: StampOptions) => void;
  mode: MediaMode;
}

export default function OptionsPanel({ options, onChange, mode }: OptionsPanelProps) {
  if (mode === 'video') return null;

  return (
    <div className="border border-[#2c2c2c] rounded-xl overflow-hidden bg-[#1e1e1e]/40 shadow-lg">
      <div className="px-5 py-3 border-b border-[#2c2c2c] bg-[#191919] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-white/90">
          <Sliders size={13} className="text-[#a3e635]" />
          <span>PROPORCIÓN & MEDIDAS DE SALIDA</span>
        </div>
        <span className="text-[10px] font-mono text-[#9b9b9b]/60 uppercase tracking-widest">
          3:4 REENCODE
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-2.5">
        <label
          className={`flex items-start gap-3.5 p-3.5 rounded-lg cursor-pointer transition-all duration-150 border ${
            options.resize === 'native'
              ? 'bg-[#a3e635]/10 border-[#a3e635]/50 ring-1 ring-[#a3e635]/30'
              : 'border-[#2c2c2c] bg-[#191919]/50 hover:bg-[#222222]/50 hover:border-[#3c3c3c]'
          }`}
        >
          <input
            type="radio"
            name="resize"
            value="native"
            checked={options.resize === 'native'}
            onChange={() => onChange({ ...options, resize: 'native' })}
            className="mt-1 accent-[#a3e635] cursor-pointer"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Crop size={14} className={options.resize === 'native' ? 'text-[#a3e635]' : 'text-[#9b9b9b]'} />
              <span className="text-[13.5px] font-mono font-medium text-white">
                {NATIVE_W} × {NATIVE_H} px
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#a3e635]/20 text-[#a3e635] px-1.5 py-0.2 rounded">
                Recomendado (3:4)
              </span>
            </div>
            <p className="text-xs text-[#9b9b9b] leading-relaxed">
              Encuadre exacto que capturan los lentes Ray-Ban Meta. Recorta y escala en alta definición.
            </p>
          </div>
        </label>

        <label
          className={`flex items-start gap-3.5 p-3.5 rounded-lg cursor-pointer transition-all duration-150 border ${
            options.resize === 'original'
              ? 'bg-[#a3e635]/10 border-[#a3e635]/50 ring-1 ring-[#a3e635]/30'
              : 'border-[#2c2c2c] bg-[#191919]/50 hover:bg-[#222222]/50 hover:border-[#3c3c3c]'
          }`}
        >
          <input
            type="radio"
            name="resize"
            value="original"
            checked={options.resize === 'original'}
            onChange={() => onChange({ ...options, resize: 'original' })}
            className="mt-1 accent-[#a3e635] cursor-pointer"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Maximize2 size={14} className={options.resize === 'original' ? 'text-[#a3e635]' : 'text-[#9b9b9b]'} />
              <span className="text-[13.5px] font-mono font-medium text-white">
                Medidas Originales
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#2c2c2c] text-[#9b9b9b] px-1.5 py-0.2 rounded">
                Sin recorte
              </span>
            </div>
            <p className="text-xs text-[#9b9b9b] leading-relaxed">
              Conserva el tamaño y resolución intactos. Si es JPEG con orientación correcta, no pierde calidad.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
