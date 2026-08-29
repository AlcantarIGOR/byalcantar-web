"use client";

import { Smartphone, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TransferGuide() {
  return (
    <div className="border border-[#2c2c2c] rounded-xl overflow-hidden bg-[#1e1e1e]/40 shadow-lg">
      <div className="px-5 py-3 border-b border-[#2c2c2c] bg-[#191919] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-white/90">
          <Smartphone size={13} className="text-[#a3e635]" />
          <span>GUÍA DE TRANSFERENCIA AL CELULAR</span>
        </div>
        <span className="text-[10px] font-mono text-[#9b9b9b]/60 uppercase tracking-widest">
          EXIF PRESERVATION
        </span>
      </div>

      <div className="p-5 space-y-4">
        <ol className="space-y-3.5">
          <li className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-md bg-[#222222] border border-[#2c2c2c] text-[#a3e635] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              01
            </div>
            <p className="text-[13.5px] text-[#9b9b9b] leading-relaxed font-sans">
              Descarga el archivo generado <code className="text-white text-xs font-mono bg-[#222222] px-1.5 py-0.5 rounded border border-[#2c2c2c]">_META_SPIN</code> directamente en tu computadora.
            </p>
          </li>

          <li className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-md bg-[#222222] border border-[#2c2c2c] text-[#a3e635] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              02
            </div>
            <div className="space-y-1.5">
              <p className="text-[13.5px] text-[#9b9b9b] leading-relaxed font-sans">
                Transfiérelo por <span className="text-white font-medium">AirDrop</span> al iPhone o por <span className="text-white font-medium">cable USB / Telegram como archivo</span> a Android.
              </p>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                <AlertTriangle size={12} className="shrink-0" />
                <span>Evita WhatsApp o Google Drive: reescriben los metadatos y borran la marca.</span>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-md bg-[#222222] border border-[#2c2c2c] text-[#a3e635] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              03
            </div>
            <p className="text-[13.5px] text-[#9b9b9b] leading-relaxed font-sans">
              Guarda el archivo en tu galería de fotos y súbelo normalmente a <span className="text-white font-medium">Instagram</span>. La app activará la interacción automáticamente.
            </p>
          </li>
        </ol>

        <div className="pt-3 border-t border-[#2c2c2c] flex items-center justify-between text-[11px] font-mono text-[#9b9b9b]/70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#a3e635]" />
            <span>Sin servidores involucrados · Privacidad total</span>
          </div>
          <span className="text-[#a3e635]">100% Client-Side</span>
        </div>
      </div>
    </div>
  );
}
