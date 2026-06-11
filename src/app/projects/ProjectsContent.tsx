"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Home as HomeIcon, 
  Copy, 
  Check, 
  ArrowUpRight,
  Play,
  Pause,
  RotateCw,
  Send,
  Calendar,
  Sparkles
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

// 1. Audio Visualizer Prototype Component
function AudioVisualizerWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(12).fill(15));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setBars(bars.map(() => Math.floor(Math.random() * 55) + 8));
      }, 120);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setBars(Array(12).fill(15));
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="bg-[#222222]/20 border border-[#2c2c2c] rounded-xl p-5 space-y-4 flex flex-col justify-between h-64">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest font-semibold">
            Audio & Motion
          </span>
          <span className="text-[10px] font-mono text-white/30 uppercase">PROT-01</span>
        </div>
        <h3 className="text-white font-semibold text-[15px] mb-1">Visualizador de Audio</h3>
        <p className="text-[#9b9b9b] text-[13px] leading-relaxed">
          Experimento de animación reactiva que sincroniza dinámicamente frecuencias de sonido con elementos de la interfaz.
        </p>
      </div>

      {/* Visualizer bars */}
      <div className="h-20 flex items-end justify-center gap-1.5 bg-[#191919]/50 border border-[#2c2c2c]/40 rounded-lg px-4 select-none">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-2.5 bg-[#a3e635] rounded-t-sm transition-all duration-150 shadow-[0_0_8px_rgba(163,230,53,0.3)]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-black bg-[#a3e635] hover:bg-[#b8f069] transition rounded-lg h-9 select-none"
      >
        {isPlaying ? (
          <>
            <Pause size={12} fill="currentColor" />
            <span>Pausar Simulación</span>
          </>
        ) : (
          <>
            <Play size={12} fill="currentColor" />
            <span>Tocar Audio</span>
          </>
        )}
      </button>
    </div>
  );
}

// 2. 3D Particle Space Prototype Component
function ParticleSpaceWidget() {
  const [rotation, setRotation] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let animFrame: number;
    const tick = () => {
      setRotation((prev) => (prev + 0.8) % 360);
      animFrame = requestAnimationFrame(tick);
    };
    if (isActive) {
      animFrame = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [isActive]);

  return (
    <div className="bg-[#222222]/20 border border-[#2c2c2c] rounded-xl p-5 space-y-4 flex flex-col justify-between h-64">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest font-semibold">
            3D WebGL Space
          </span>
          <span className="text-[10px] font-mono text-white/30 uppercase">PROT-02</span>
        </div>
        <h3 className="text-white font-semibold text-[15px] mb-1">Proyecto Despertar 3D</h3>
        <p className="text-[#9b9b9b] text-[13px] leading-relaxed">
          Mini-motor de render de partículas interactivo en 3D para modelar atmósferas y shaders en navegadores.
        </p>
      </div>

      {/* 3D Simulation Box */}
      <div className="h-20 bg-[#191919]/50 border border-[#2c2c2c]/40 rounded-lg flex items-center justify-center relative overflow-hidden select-none">
        <div 
          className="w-10 h-10 border border-dashed border-[#a3e635]/40 rounded-full flex items-center justify-center transition-transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="w-1.5 h-1.5 bg-[#a3e635] rounded-full absolute -top-0.5" />
          <div className="w-1.5 h-1.5 bg-[#a3e635] rounded-full absolute -bottom-0.5" />
          <div className="w-2.5 h-2.5 border border-[#a3e635] rounded-full" />
        </div>
        
        {/* Secondary rotating ring */}
        <div 
          className="w-16 h-16 border border-dashed border-white/5 rounded-full absolute transition-transform"
          style={{ transform: `rotate(${-rotation * 0.5}deg)` }}
        >
          <div className="w-1 h-1 bg-white/20 rounded-full absolute -left-0.5" />
        </div>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className="w-full inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-white hover:text-white transition border border-[#2c2c2c] rounded-lg h-9 bg-[#222222]/40 select-none"
      >
        <RotateCw size={12} className={isActive ? "animate-spin text-[#a3e635]" : "opacity-60"} />
        <span>{isActive ? "Detener Rotación" : "Girar Orbitas"}</span>
      </button>
    </div>
  );
}

// 3. Conversational Form Prototype Component
function ConversationalFormWidget() {
  const [step, setStep] = useState(0); // 0: Start, 1: Name, 2: Goal, 3: Completed
  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const resetForm = () => {
    setStep(0);
    setNameInput("");
    setName("");
    setGoal("");
  };

  return (
    <div className="bg-[#222222]/20 border border-[#2c2c2c] rounded-xl p-5 space-y-4 flex flex-col justify-between h-64">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest font-semibold">
            UX Flow & Logic
          </span>
          <span className="text-[10px] font-mono text-white/30 uppercase">PROT-03</span>
        </div>
        <h3 className="text-white font-semibold text-[15px] mb-1">Conversational Form</h3>
        <p className="text-[#9b9b9b] text-[13px] leading-relaxed">
          Motor de recopilación guiada que convierte inputs monótonos en un flujo conversacional animado.
        </p>
      </div>

      {/* Form Area */}
      <div className="h-20 bg-[#191919]/50 border border-[#2c2c2c]/40 rounded-lg p-3 flex flex-col justify-center text-[12px] font-mono relative overflow-hidden select-none">
        {step === 0 && (
          <div className="text-center space-y-1">
            <span className="text-white/60">¿Listo para probar el formulario?</span>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-1">
            <span className="text-[#a3e635] block">SYS: ¿Cuál es tu nombre?</span>
            <div className="flex gap-1.5 mt-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Escribe aquí..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && nameInput.trim()) {
                    setName(nameInput);
                    setStep(2);
                  }
                }}
                className="bg-[#222222]/50 border border-[#2c2c2c] rounded px-2 py-0.5 text-white w-full outline-none focus:border-[#a3e635]/40"
              />
              <button 
                onClick={() => {
                  if (nameInput.trim()) {
                    setName(nameInput);
                    setStep(2);
                  }
                }}
                className="p-1 bg-[#a3e635] text-black rounded"
              >
                <Send size={10} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-1.5">
            <span className="text-[#a3e635] block">SYS: Hola {name}, ¿qué buscas automatizar?</span>
            <div className="flex gap-1 mt-1 justify-between">
              {["Agenda", "Chatbot", "Reportes"].map((choice) => (
                <button
                  key={choice}
                  onClick={() => {
                    setGoal(choice);
                    setStep(3);
                  }}
                  className="px-2 py-1 bg-[#222222]/60 hover:bg-[#a3e635] hover:text-black border border-[#2c2c2c] rounded text-[10px] text-white/80 transition"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-1">
            <span className="text-emerald-400 block font-bold">✓ Formulario Completado</span>
            <span className="text-white/40 text-[10px]">Meta: {goal} · ¡Listo!</span>
          </div>
        )}
      </div>

      {step === 0 && (
        <button
          onClick={() => setStep(1)}
          className="w-full inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-white hover:text-white transition border border-[#2c2c2c] rounded-lg h-9 bg-[#222222]/40 select-none"
        >
          <span>Comenzar Prototipo</span>
        </button>
      )}

      {step > 0 && (
        <button
          onClick={resetForm}
          className="w-full inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-white/50 hover:text-white transition border border-[#2c2c2c]/30 hover:border-[#2c2c2c] rounded-lg h-9 bg-transparent select-none"
        >
          <span>Reiniciar Flujo</span>
        </button>
      )}
    </div>
  );
}

// 4. Smart Scheduler Prototype Component
function SmartSchedulerWidget() {
  const [isScheduled, setIsScheduled] = useState(false);

  return (
    <div className="bg-[#222222]/20 border border-[#2c2c2c] rounded-xl p-5 space-y-4 flex flex-col justify-between h-64">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest font-semibold">
            Scheduling UI
          </span>
          <span className="text-[10px] font-mono text-white/30 uppercase">PROT-04</span>
        </div>
        <h3 className="text-white font-semibold text-[15px] mb-1">Smart Scheduler UI</h3>
        <p className="text-[#9b9b9b] text-[13px] leading-relaxed">
          Módulo de agenda interactiva que calcula colisiones horarias y ofrece feedback visual de confirmación.
        </p>
      </div>

      {/* Scheduler display */}
      <div className="h-20 bg-[#191919]/50 border border-[#2c2c2c]/40 rounded-lg flex items-center justify-center p-3 select-none relative overflow-hidden">
        {isScheduled ? (
          <div className="flex items-center gap-2 text-white/90 text-[12px] font-mono animate-fade-in">
            <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              ✓
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Llamada de Diagnóstico</span>
              <span className="text-[10px] text-[#9b9b9b]">Hoy · 5:30 PM (Confirmado)</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-mono text-white/40 uppercase">Espacio sugerido</span>
            <div className="px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/25 rounded text-[11px] font-mono text-[#a3e635] animate-pulse">
              Hoy · 5:30 PM
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsScheduled(!isScheduled)}
        className="w-full inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-white hover:text-white transition border border-[#2c2c2c] rounded-lg h-9 bg-[#222222]/40 select-none"
      >
        <Calendar size={12} className={isScheduled ? "text-emerald-400" : "opacity-60"} />
        <span>{isScheduled ? "Cancelar Reservación" : "Sugerir y Reservar"}</span>
      </button>
    </div>
  );
}

export default function ProjectsContent() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://byalcantar.me/projects");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#191919] text-[#f7facf] font-sans flex flex-col md:flex-row">
      
      {/* LEFT COLUMN: SIDEBAR */}
      <Sidebar />

      {/* RIGHT COLUMN: CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto bg-[#191919]">
        
        {/* Status Bar Banner */}
        <div className="bg-[#a3e635] text-black text-[11px] font-mono tracking-widest font-semibold text-center py-2 uppercase border-b border-[#2c2c2c] shrink-0">
          Disponible para proyectos · Automatizando desde Jalisco
        </div>

        {/* Top Local Navigation Bar */}
        <header className="flex items-center justify-between border-b border-[#2c2c2c] px-6 py-4 sticky top-0 bg-[#191919]/90 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-2 text-[13px] font-mono text-white/90">
            <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
              <HomeIcon size={14} className="text-[#a3e635]" />
              <span>Home</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#9b9b9b]">Interface Lab</span>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-[12px] font-mono text-[#9b9b9b] hover:text-white transition border border-[#2c2c2c] rounded px-3 py-1 bg-[#222222]/40"
          >
            {copied ? (
              <>
                <Check size={12} className="text-[#a3e635]" />
                <span className="text-white">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy link</span>
              </>
            )}
          </button>
        </header>

        {/* Scrollable Projects Content */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 max-w-4xl space-y-12">
          
          {/* Hero Bio */}
          <section className="space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest block font-semibold">
                Design Engineering
              </span>
              <h1 className="text-[32px] md:text-[42px] font-sans font-bold text-white tracking-tight leading-tight">
                Interface Lab
              </h1>
            </div>
            <p className="text-[14px] text-[#9b9b9b] leading-relaxed font-sans max-w-2xl">
              Una colección de prototipos interactivos, exploraciones de diseño y pruebas de concepto de frontend desarrolladas en código (Next.js, Framer Motion y Tailwind CSS).
            </p>
          </section>

          {/* Interactive Prototypes Grid */}
          <section className="pt-6 border-t border-[#2c2c2c]/40 space-y-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-wider">
              <span>Prototipos Activos</span>
              <span>Total: 4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AudioVisualizerWidget />
              <ParticleSpaceWidget />
              <ConversationalFormWidget />
              <SmartSchedulerWidget />
            </div>
          </section>

          {/* Get in Touch CTA */}
          <section className="pt-10 border-t border-[#2c2c2c]/40 space-y-4">
            <div className="bg-[#222222]/20 border border-[#2c2c2c] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#a3e635] text-[13px] font-mono uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>¿Tienes un reto de interfaz?</span>
                </div>
                <p className="text-[14px] text-[#9b9b9b] leading-relaxed font-sans max-w-lg">
                  Si quieres llevar alguna de estas interacciones o integraciones a tus sistemas o proyectos de negocio, ponte en contacto.
                </p>
              </div>

              <a
                href="https://wa.me/523340865087"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-black bg-[#a3e635] hover:bg-[#b8f069] transition rounded-lg px-4 py-2 shrink-0 select-none"
              >
                <span>Hablemos de tu proyecto</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
