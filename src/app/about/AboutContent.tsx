"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Home as HomeIcon, 
  Copy, 
  Check, 
  ArrowUpRight,
  Briefcase 
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BentoAbout from "@/components/BentoAbout";

function AnimatedMemoji() {
  const images = [
    "/memoji_1.png",
    "/memoji_2.png",
    "/memoji_3.png",
    "/memoji_4.png",
    "/memoji_5.png",
    "/memoji_6.png",
    "/memoji_7.png",
    "/memoji_8.png",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div 
      onClick={() => setIndex((prev) => (prev + 1) % images.length)}
      className="w-44 h-44 md:w-56 md:h-56 relative rounded-2xl bg-[#222222]/40 border border-[#2c2c2c] p-3 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-[#a3e635]/30 transition-all duration-300 shrink-0 select-none shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#191919]/40" />
      <div className="relative w-full h-full">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Memoji state ${i + 1}`}
            fill
            className={`object-contain transition-all duration-700 ease-in-out absolute inset-0 ${
              i === index 
                ? "opacity-100 scale-100 rotate-0" 
                : "opacity-0 scale-90 -rotate-6 pointer-events-none"
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-1 right-2 text-[8px] font-mono text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Click to change
      </div>
    </div>
  );
}

export default function AboutContent() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://byalcantar.me/about");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const experience = [
    {
      company: "ONYX Inc.",
      role: "Fundador y Líder de IA",
      period: "2026 – Presente",
      logo: "/logo_onyx.jpg"
    },
    {
      company: "Empresa Privada",
      role: "Encargado de Sistemas",
      period: "2024 – 2026",
      logo: null
    }
  ];

  const education = [
    {
      institution: "TecNM ITCG",
      degree: "Ingeniería en Inteligencia Artificial (1ª Gen)",
      period: "2025 – Presente",
      logo: "/logo_itcg.png"
    },
    {
      institution: "CBTis 226",
      degree: "Técnico en Programación",
      period: "2022 – 2025",
      logo: "/logo_cbtis.png"
    }
  ];

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
            <span className="text-[#9b9b9b]">About</span>
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

        {/* Scrollable About Content */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 max-w-4xl space-y-12">
          
          {/* Antecedentes Section */}
          <section className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              <div className="flex-1 space-y-5">
                <h2 className="text-[20px] font-sans font-bold text-white tracking-tight">
                  Antecedentes
                </h2>
                <div className="space-y-5 text-[14px] text-[#9b9b9b] leading-relaxed font-sans">
                  <p>
                    Desde que tengo memoria, siempre me ha atraído crear cosas y entender cómo funcionan por dentro. Empecé escribiendo mis primeras líneas de código sin saber bien qué era Git, motivado únicamente por la curiosidad de ver cómo mis ideas cobraban vida en una pantalla y cómo otros podían interactuar con ellas.
                  </p>
                  <p>
                    Cuando descubrí la inteligencia artificial y la automatización, sentí que era el punto de encuentro perfecto entre la ingeniería de sistemas y la resolución de problemas reales. Actualmente curso la Ingeniería en Inteligencia Artificial (1ª generación) en el ITCG, enfocado en el desarrollo de software pragmático, LLMs y sistemas que realmente aguanten el uso en producción.
                  </p>
                  <p>
                    Fundé ONYX Inc. con el propósito de llevar esta tecnología a negocios locales y PyMEs, creando soluciones operativas que automaticen sus flujos diarios y mejoren su productividad. Mi rincón personal es mi laboratorio de experimentación; ONYX es el lugar donde esas ideas se convierten en software robusto y profesional.
                  </p>
                </div>
              </div>
              
              {/* Animated Memoji Avatar Container */}
              <div className="w-full lg:w-auto flex justify-center shrink-0 self-center">
                <AnimatedMemoji />
              </div>
            </div>
          </section>

          {/* Algunos datos adicionales Section */}
          <section className="space-y-3 pt-4 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Algunos datos adicionales
            </span>
            <h3 className="text-[14px] text-white/90 font-medium font-sans">
              Últimamente, he estado:
            </h3>
            <ul className="font-mono text-[13px] text-[#9b9b9b] space-y-2.5 pt-1">
              <li className="flex items-center gap-2">
                <span className="shrink-0 text-[14px]">☕</span>
                <span>Bebiendo 3+ cafés al día</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="shrink-0 text-[14px]">🥁</span>
                <span>Batería de bossa nova</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="shrink-0 text-[14px]">⌚</span>
                <span>Estoy pensando en qué reloj debería comprar a continuación</span>
              </li>
            </ul>
          </section>

          {/* Bento About Section */}
          <section className="pt-4 border-t border-[#2c2c2c]/40">
            <BentoAbout />
          </section>

          {/* Experiencia Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Experiencia
            </span>
            
            <div className="space-y-4">
              {experience.map((item) => (
                <div
                  key={item.company}
                  className="flex items-center justify-between text-[14px] py-1"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Logo Image */}
                    <div className="w-7 h-7 rounded-full overflow-hidden relative bg-[#222222] border border-[#2c2c2c] flex items-center justify-center shrink-0">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={`${item.company} Logo`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Briefcase size={13} className="text-[#9b9b9b]" />
                      )}
                    </div>

                    {/* Company / Role */}
                    <div className="min-w-0 flex items-center gap-1.5 text-[14px]">
                      <span className="text-white font-medium truncate">{item.company}</span>
                      <span className="text-[#9b9b9b]/40">/</span>
                      <span className="text-[#9b9b9b] truncate">{item.role}</span>
                    </div>
                  </div>

                  {/* Period */}
                  <span className="text-[13px] font-mono text-[#9b9b9b]/50 shrink-0 ml-4">
                    {item.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Educación Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Educación
            </span>
            
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.institution}
                  className="flex items-center justify-between text-[14px] py-1"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Logo Image */}
                    <div className="w-7 h-7 rounded-full overflow-hidden relative bg-[#222222] border border-[#2c2c2c] flex items-center justify-center shrink-0">
                      <Image
                        src={item.logo}
                        alt={`${item.institution} Logo`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Institution / Degree */}
                    <div className="min-w-0 flex items-center gap-1.5 text-[14px]">
                      <span className="text-white font-medium truncate">{item.institution}</span>
                      <span className="text-[#9b9b9b]/40">/</span>
                      <span className="text-[#9b9b9b] truncate">{item.degree}</span>
                    </div>
                  </div>

                  {/* Period */}
                  <span className="text-[13px] font-mono text-[#9b9b9b]/50 shrink-0 ml-4">
                    {item.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Certificaciones Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Certificaciones
            </span>
            
            <div className="bg-[#222222]/10 border border-dashed border-[#2c2c2c] rounded-xl p-5 text-center">
              <span className="text-[13px] font-mono text-[#9b9b9b]/60">
                Próximamente · Certificaciones de Especialización en Inteligencia Artificial y Automatización
              </span>
            </div>
          </section>

          {/* Get in Touch / CTA Section */}
          <section className="pt-10 border-t border-[#2c2c2c]/40 space-y-4">
            <p className="text-[14px] text-[#9b9b9b] leading-relaxed font-sans">
              Si deseas conocer los detalles de algún proyecto o mi disponibilidad, ¡ponte en contacto! Puedes escribirme con total comodidad a través de mi{" "}
              <a 
                href="https://www.linkedin.com/in/john-alcantar-ia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#a3e635] underline underline-offset-4 transition"
              >
                LinkedIn
              </a>
              {" "}o mi{" "}
              <a 
                href="mailto:founder@onyxinc.dev"
                className="text-white hover:text-[#a3e635] underline underline-offset-4 transition"
              >
                correo electrónico
              </a>
              .
            </p>

            <div className="flex gap-3 pt-2">
              <a 
                href="https://www.linkedin.com/in/john-alcantar-ia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white hover:text-[#a3e635] transition border border-[#2c2c2c] rounded-lg px-4 py-2 bg-[#222222]/40"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>
              <a 
                href="mailto:founder@onyxinc.dev"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white hover:text-[#a3e635] transition border border-[#2c2c2c] rounded-lg px-4 py-2 bg-[#222222]/40"
              >
                <span>Email</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
