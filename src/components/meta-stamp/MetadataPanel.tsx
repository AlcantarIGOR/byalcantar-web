"use client";

import { ArrowRight, Eye } from 'lucide-react';
import type { ExifData, MediaMode } from '@/lib/meta-stamp/types';
import { META_MAKE, META_MODEL, META_SOFTWARE } from '@/lib/meta-stamp/types';

interface MetadataPanelProps {
  original: ExifData | null;
  mode: MediaMode;
  dimensions: string | null;
  newDimensions: string;
}

export default function MetadataPanel({ original, mode, dimensions, newDimensions }: MetadataPanelProps) {
  if (!original) return null;

  return (
    <div className="border border-[#2c2c2c] rounded-xl overflow-hidden bg-[#1e1e1e]/40 shadow-lg">
      <div className="px-5 py-3 border-b border-[#2c2c2c] bg-[#191919] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-white/90">
          <Eye size={13} className="text-[#a3e635]" />
          <span>INSPECTOR DE METADATOS</span>
        </div>
        <span className="text-[10px] font-mono text-[#9b9b9b]/60 uppercase tracking-widest">
          EXIF / ATOM DIFF
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch divide-x divide-[#2c2c2c]">
        {/* Columna: Antes */}
        <div className="p-4 sm:p-5 space-y-3 bg-[#191919]/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9b9b9b]/40" />
            <p className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#9b9b9b]">
              ORIGINAL
            </p>
          </div>
          <div className="space-y-2.5">
            <MetaRow label="Cámara" value={original.make || 'sin datos'} />
            <MetaRow label="Modelo" value={original.model || 'sin datos'} />
            {dimensions && <MetaRow label="Medidas" value={dimensions} />}
            {mode === 'photo' && (
              <MetaRow label="GPS / Ubicación" value="eliminada por privacidad" muted />
            )}
          </div>
        </div>

        {/* Separador central */}
        <div className="flex items-center justify-center px-2 sm:px-3 bg-[#141414]">
          <div className="w-7 h-7 rounded-lg bg-[#222222] border border-[#2c2c2c] flex items-center justify-center">
            <ArrowRight size={13} className="text-[#a3e635]" />
          </div>
        </div>

        {/* Columna: Después */}
        <div className="p-4 sm:p-5 space-y-3 bg-[#1e1e1e]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
            <p className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#a3e635]">
              META STAMP INYECTADO
            </p>
          </div>
          <div className="space-y-2.5">
            <MetaRow label="Cámara" value={META_MAKE} highlight />
            <MetaRow label="Modelo" value={META_MODEL} highlight />
            <MetaRow label="Medidas" value={newDimensions} highlight />
            {mode === 'video' && (
              <MetaRow label="Software" value={META_SOFTWARE} highlight />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value, highlight = false, muted = false }: {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-mono text-[#9b9b9b]/70 uppercase tracking-wider">{label}</p>
      <p className={`text-[13px] font-mono truncate ${
        highlight
          ? 'text-[#a3e635] font-medium'
          : muted
            ? 'text-[#9b9b9b]/60 italic text-xs'
            : 'text-white/90'
      }`}>
        {value}
      </p>
    </div>
  );
}
