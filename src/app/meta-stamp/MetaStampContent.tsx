"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Home as HomeIcon, 
  Copy, 
  Check, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import type { MediaMode, MediaFile, StampOptions, ExifData } from '@/lib/meta-stamp/types';
import { NATIVE_W, NATIVE_H } from '@/lib/meta-stamp/types';
import { readExif, processPhoto } from '@/lib/meta-stamp/exif-stamper';
import { readMp4Metadata, processVideo } from '@/lib/meta-stamp/mp4-stamper';

import Sidebar from '@/components/Sidebar';
import ModeSelector from '@/components/meta-stamp/ModeSelector';
import Dropzone from '@/components/meta-stamp/Dropzone';
import MetadataPanel from '@/components/meta-stamp/MetadataPanel';
import OptionsPanel from '@/components/meta-stamp/OptionsPanel';
import TransferGuide from '@/components/meta-stamp/TransferGuide';

type Status = 'idle' | 'loading' | 'ready' | 'processing' | 'done' | 'error';

export default function MetaStampContent() {
  const [mode, setMode] = useState<MediaMode>('photo');
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [options, setOptions] = useState<StampOptions>({ resize: 'native' });
  const [status, setStatus] = useState<Status>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleModeChange = (newMode: MediaMode) => {
    setMode(newMode);
    setMedia(null);
    setStatus('idle');
    setStatusMsg('');
  };

  const handleFile = useCallback(async (file: File) => {
    setStatus('loading');
    setStatusMsg('');

    try {
      const isImage = /^image\/(jpeg|png|webp)/.test(file.type);
      const isVideo = /^video\/(mp4|quicktime)/.test(file.type);

      if (mode === 'photo' && !isImage) {
        setStatus('error');
        setStatusMsg('Ese archivo no es una imagen compatible. Usa JPEG, PNG o WebP.');
        return;
      }
      if (mode === 'video' && !isVideo) {
        setStatus('error');
        setStatusMsg('Ese archivo no es un video compatible. Usa MP4 o MOV.');
        return;
      }

      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);

      let originalExif: ExifData;
      let width = 0;
      let height = 0;

      if (mode === 'photo') {
        originalExif = readExif(buf);
        const bitmap = await createImageBitmap(file);
        width = bitmap.width;
        height = bitmap.height;
        bitmap.close();
      } else {
        originalExif = readMp4Metadata(buf);
        const videoEl = document.createElement('video');
        videoEl.preload = 'metadata';
        const dims = await new Promise<{ w: number; h: number }>((resolve) => {
          videoEl.onloadedmetadata = () => {
            resolve({ w: videoEl.videoWidth, h: videoEl.videoHeight });
            URL.revokeObjectURL(videoEl.src);
          };
          videoEl.src = URL.createObjectURL(file);
        });
        width = dims.w;
        height = dims.h;
      }

      const previewUrl = URL.createObjectURL(file);

      setMedia({
        file,
        bytes,
        mode,
        originalExif,
        previewUrl,
        width,
        height,
      });
      setStatus('ready');
    } catch (err) {
      setStatus('error');
      setStatusMsg(err instanceof Error ? err.message : 'Error al procesar el archivo.');
    }
  }, [mode]);

  const handleStamp = async () => {
    if (!media) return;
    setStatus('processing');
    setStatusMsg('Inyectando metadatos de Ray-Ban Meta…');

    try {
      const result = media.mode === 'photo'
        ? await processPhoto(media, options)
        : await processVideo(media, options);

      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);

      setStatus('done');
      setStatusMsg(`Archivo listo. Se descargó ${result.filename}`);
    } catch (err) {
      setStatus('error');
      setStatusMsg(err instanceof Error ? err.message : 'Error al generar el archivo.');
    }
  };

  const getNewDimensions = (): string => {
    if (!media) return '';
    if (mode === 'video') return `${media.width} × ${media.height} px`;
    if (options.resize === 'native') return `${NATIVE_W} × ${NATIVE_H} px`;
    return `${media.width} × ${media.height} px`;
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#f5f5f7] font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <Sidebar activeLog="meta-stamp" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Status Bar Banner */}
        <div className="bg-[#a3e635] text-black text-[11px] font-mono tracking-widest font-semibold text-center py-2 uppercase border-b border-[#2c2c2c] px-4">
          HERRAMIENTA GRATUITA · ONYX LABS · BYALCANTAR
        </div>

        {/* Top Local Header Bar (Sticky) */}
        <header className="flex items-center justify-between border-b border-[#2c2c2c] px-6 py-4 sticky top-0 bg-[#191919]/90 backdrop-blur z-10">
          <div className="flex items-center gap-2 text-[13px] font-mono text-white/90">
            <Link href="/" className="text-[#a3e635] hover:underline flex items-center gap-1.5">
              <HomeIcon size={14} />
              <span>Home</span>
            </Link>
            <span className="text-[#9b9b9b] font-mono">/</span>
            <span className="text-white font-mono font-medium">Meta Stamp Studio</span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-[12px] font-mono text-[#9b9b9b] hover:text-white transition border border-[#2c2c2c] rounded px-3 py-1 bg-[#222222]/40 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={12} className="text-[#a3e635]" />
                <span className="text-white">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Compartir</span>
              </>
            )}
          </button>
        </header>

        {/* Inner Content Body */}
        <div className="p-6 md:p-8 lg:p-10 space-y-8 max-w-3xl">
          
          {/* Header Title Section */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-5 h-px bg-[#a3e635]" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#a3e635] font-semibold">
                ONYX LABS · FREE UTILITY
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans flex items-center gap-2.5">
                  Meta Stamp Studio
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#a3e635]/40 text-[#a3e635] bg-[#a3e635]/10 font-normal">
                    v2.0
                  </span>
                </h1>
                <p className="text-[13.5px] sm:text-[14.5px] text-[#9b9b9b] font-sans leading-relaxed max-w-2xl">
                  Reescribe la identidad de cámara <span className="text-white font-medium">Ray-Ban Meta</span> en tus fotos y videos para activar el visor interactivo <span className="text-[#a3e635] font-medium font-mono text-[13px]">Spin View</span> y etiquetas oficiales en Instagram. Todo el proceso ocurre en tu navegador.
                </p>
              </div>

              {/* Brand mark */}
              <div className="hidden sm:flex flex-col items-end shrink-0 pt-1">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-[15px] relative overflow-hidden border border-[#a3e635]/35 shadow-[0_0_16px_rgba(163,230,53,0.2)] text-[#a3e635]"
                  style={{
                    background: "linear-gradient(135deg, rgba(163,230,53,0.15), rgba(163,230,53,0.03))"
                  }}
                >
                  <span>A/</span>
                </div>
                <span className="text-[10px] font-mono text-[#9b9b9b]/60 mt-1 uppercase tracking-wider">
                  byalcantar
                </span>
              </div>
            </div>
          </section>

          {/* Mode Switcher */}
          <ModeSelector mode={mode} onChange={handleModeChange} />

          {/* Core App Tool Section */}
          <section className="space-y-6">
            <Dropzone
              mode={mode}
              onFile={handleFile}
              hasFile={!!media}
              previewUrl={media?.previewUrl ?? null}
              isVideo={mode === 'video'}
            />

            {media && (
              <MetadataPanel
                original={media.originalExif}
                mode={mode}
                dimensions={`${media.width} × ${media.height} px`}
                newDimensions={getNewDimensions()}
              />
            )}

            {media && (
              <OptionsPanel
                options={options}
                onChange={setOptions}
                mode={mode}
              />
            )}

            {statusMsg && (
              <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-xs sm:text-sm font-mono ${
                status === 'error'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : status === 'done'
                    ? 'bg-[#a3e635]/10 border-[#a3e635]/40 text-[#a3e635]'
                    : 'bg-[#222222] border-[#2c2c2c] text-[#9b9b9b]'
              }`}>
                {status === 'error' && <XCircle size={15} className="shrink-0 text-rose-400" />}
                {status === 'done' && <CheckCircle2 size={15} className="shrink-0 text-[#a3e635]" />}
                {status === 'processing' && <Loader2 size={15} className="shrink-0 animate-spin text-[#a3e635]" />}
                <span>{statusMsg}</span>
              </div>
            )}

            {media && status !== 'loading' && (
              <button
                type="button"
                onClick={handleStamp}
                disabled={status === 'processing'}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-mono text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  status === 'processing'
                    ? 'bg-[#a3e635]/50 text-black/70 cursor-wait'
                    : status === 'done'
                      ? 'bg-[#a3e635] text-black hover:bg-[#b8f069] shadow-[0_0_20px_rgba(163,230,53,0.35)]'
                      : 'bg-[#a3e635] text-black hover:bg-[#b8f069] shadow-[0_0_20px_rgba(163,230,53,0.25)]'
                }`}
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Procesando bytes en memoria…</span>
                  </>
                ) : status === 'done' ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Descargar de nuevo</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Inyectar Metadatos y Descargar</span>
                  </>
                )}
              </button>
            )}

            {media && <TransferGuide />}
          </section>

          {/* Footer Notice */}
          <footer className="pt-8 border-t border-[#2c2c2c] space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#9b9b9b]">
              <ShieldCheck size={14} className="text-[#a3e635]" />
              <span>Tus fotos y videos nunca salen de tu dispositivo. Procesamiento 100% local.</span>
            </div>
            <p className="text-[12px] font-mono text-[#9b9b9b]/60">
              Desarrollado en Jalisco, México por{' '}
              <Link href="/about" className="text-white hover:text-[#a3e635] transition underline underline-offset-4">
                Juan Alcántar
              </Link>{' '}
              · ONYX Inc.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
