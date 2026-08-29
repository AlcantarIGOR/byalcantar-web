"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Home as HomeIcon, 
  Copy, 
  Check, 
  Mail, 
  Instagram,
  GraduationCap,
  MessageSquare,
  Activity,
  Gamepad2,
  Briefcase,
  FlaskConical,
  Code2,
  MapPin,
  Phone,
  Link as LinkIcon,
  Clock,
  User
} from "lucide-react";
import LocalTime from "@/components/LocalTime";
import Sidebar from "@/components/Sidebar";
import GithubContributions from "@/components/GithubContributions";

// Experience Table Configuration
const experience = [
  {
    company: "ONYX Inc.",
    role: "Founder & AI Lead",
    period: "Present",
    id: "onyx-inc",
    logo: "/logo_onyx.jpg",
  },
  {
    company: "Empresa Privada",
    role: "Encargado de Sistemas",
    period: "2024–2026",
    id: "empresa-privada",
    logo: null,
  },
  {
    company: "TecNM ITCG",
    role: "Ingeniería en IA (1ª Gen)",
    period: "2025–Present",
    id: "itcg",
    logo: "/logo_itcg.png",
  },
  {
    company: "CBTis 226",
    role: "Técnico en Programación",
    period: "2022–2025",
    id: "cbtis",
    logo: "/logo_cbtis.png",
  }
];

// Projects Configuration
const projects = [
  {
    id: "moodlesync",
    title: "MoodleSync",
    subtitle: "PLATAFORMA EDUCATIVA · EL OS DEL ESTUDIANTE ITCG",
    desc: "Plataforma que moderniza el portal Moodle de mi instituto. Sincroniza tareas, horarios, calificaciones y notificaciones en tiempo real, integrando un tablero Kanban y un bloc de notas dinámico. Migrado exitosamente a Next.js y deployado en Vercel.",
    image: "/moodlesync_login.png",
    fallbackColor: "from-lime-500/10 to-transparent",
    icon: <GraduationCap size={20} className="text-[#a3e635]" />
  },
  {
    id: "onyx-digital-system",
    title: "ONYX Digital System",
    subtitle: "SISTEMA OPERATIVO DIGITAL PARA PYMES",
    desc: "Solución integral que combina sitio web profesional (Framer/Webflow), flujos de atención y comunicación automatizados (n8n, Evolution API, Google Calendar) y dashboards de métricas operativas en una sola entrega gestionada.",
    image: "/onyx_digital_system.png",
    fallbackColor: "from-emerald-500/10 to-transparent",
    icon: <Briefcase size={20} className="text-emerald-400" />
  },
  {
    id: "onyx-launch-pro",
    title: "ONYX Launch / Pro",
    subtitle: "PRESENCIA WEB Y AUTOMATIZACIÓN INICIAL",
    desc: "Paquetes de despegue digital. Desde sitios web profesionales mobile-first sin fricción, hasta la integración de flujos simples de comunicación automática mediante n8n para optimizar la atención de leads.",
    image: "/onyx_launch_pro.png",
    fallbackColor: "from-purple-500/10 to-transparent",
    icon: <Code2 size={20} className="text-purple-400" />
  },
  {
    id: "onyx-care",
    title: "ONYX Care",
    subtitle: "MANTENIMIENTO Y SOPORTE RECURRENTE",
    desc: "Servicio de retención mensual post-implementación. Asegura el correcto funcionamiento de tus sistemas, actualizaciones menores, soporte técnico inmediato y revisiones periódicas de métricas operativas del negocio.",
    image: "/onyx_care.png",
    fallbackColor: "from-blue-500/10 to-transparent",
    icon: <Activity size={20} className="text-blue-400" />
  }
];

// Fallback project image renderer
function ProjectImage({ 
  src, 
  alt, 
  fallbackColor, 
  icon,
  id 
}: { 
  src: string; 
  alt: string; 
  fallbackColor: string; 
  icon: React.ReactNode;
  id: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-full aspect-[16/10] relative rounded-xl border border-[#2c2c2c] overflow-hidden bg-[#1e1e1e]/40 shadow-lg select-none">
      {!imgFailed ? (
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          onError={() => setImgFailed(true)}
          priority={id === "moodlesync"}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor} flex flex-col items-center justify-center p-6 text-center select-none`}>
          <div className="absolute top-3 right-3 text-[10px] font-mono text-[#9b9b9b]/35 uppercase tracking-widest">
            Mockup temporal
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#222222]/85 border border-[#2c2c2c] flex items-center justify-center mb-4 shadow-inner">
            {icon}
          </div>
          <h4 className="text-white font-semibold text-[17px] tracking-tight mb-1">{alt}</h4>
          <p className="text-[#9b9b9b] text-xs font-mono max-w-xs leading-normal">
            Imágenes profesionales próximamente. Automatización diseñada por ONYX.
          </p>
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-[#9b9b9b]/25">
            <span>ID: {id.toUpperCase()}</span>
            <span>SYSTEM STATUS: ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://byalcantar.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#191919] text-[#f7facf] font-sans flex flex-col md:flex-row">
      
      {/* ──────────────────────────────────────────────────────── */}
      {/* LEFT COLUMN: SIDEBAR */}
      {/* ──────────────────────────────────────────────────────── */}
      {/* LEFT COLUMN: SIDEBAR */}
      <Sidebar />

      {/* ──────────────────────────────────────────────────────── */}
      {/* RIGHT COLUMN: MAIN CONTENT (Scrollable) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Status Bar Banner */}
        <div className="bg-[#a3e635] text-black text-[11px] font-mono tracking-widest font-semibold text-center py-2 uppercase border-b border-[#2c2c2c]">
          Disponible para proyectos · Automatizando desde Jalisco
        </div>

        {/* Top Local Bar (Breadcrumb & Copy Link) */}
        <header className="flex items-center justify-between border-b border-[#2c2c2c] px-6 py-4 sticky top-0 bg-[#191919]/90 backdrop-blur z-10">
          <div className="flex items-center gap-2 text-[13px] font-mono text-white/90">
            <HomeIcon size={14} className="text-[#a3e635]" />
            <span>Home</span>
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

        {/* Inner Content Padding */}
        <div className="p-6 md:p-8 lg:p-10 space-y-12 max-w-3xl">
          
          {/* Hero Bio - Firdaus Style */}
          <section className="space-y-6">
            <div className="flex items-center gap-6">
              
              {/* Large Circular Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#2c2c2c] bg-[#222222] overflow-hidden relative shadow-lg shrink-0">
                <Image 
                  src="/avatar_juan.png"
                  alt="Juan Alcántar"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Title / Name & Role */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[24px] md:text-[28px] font-bold text-white tracking-tight leading-none font-sans">
                    Juan Alcántar
                  </h1>
                  {/* Verified Badge Check */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500 fill-current shrink-0" aria-label="Verified Profile">
                    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                  </svg>
                </div>
                <p className="text-[14px] md:text-[15px] font-mono text-[#9b9b9b]">
                  Estudiante de Ingeniería de IA
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-[14px] text-white/80 font-sans leading-relaxed">
              Bienvenido a mi pequeño rincón de la web.
            </p>

            {/* Divider */}
            <div className="h-px bg-[#2c2c2c]" />

            {/* Metadata Grid (Firdaus Style) */}
            <div className="space-y-3">
              {/* Full-width Items */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#9b9b9b] shrink-0">
                  <Code2 size={13} />
                </div>
                <span className="font-mono text-[12.5px] text-[#f5f5f7] tracking-tight">
                  Estudiante de Ingeniería de IA
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#9b9b9b] shrink-0">
                  <Briefcase size={13} />
                </div>
                <span className="font-mono text-[12.5px] text-[#f5f5f7] tracking-tight">
                  Fundador @ONYX Inc. & Creador de MoodleSync
                </span>
              </div>

              {/* Split 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-1">
                {/* Column 1 */}
                <div className="space-y-3">
                  {[
                    { icon: <MapPin size={13} />, text: "Ciudad Guzmán, Jalisco, México" },
                    { icon: <Phone size={13} />, text: "+52 334 086 5087" },
                    { icon: <LinkIcon size={13} />, text: "www.byalcantar.me" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#9b9b9b] shrink-0">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[12.5px] text-[#f5f5f7] tracking-tight truncate">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-3">
                  {[
                    { icon: <Clock size={13} />, text: <LocalTime /> },
                    { icon: <Mail size={13} />, text: "founder@onyxinc.dev" },
                    { 
                      icon: (
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#9b9b9b]">
                          <circle cx="10" cy="14" r="5"/>
                          <path d="M14 10l6-6M20 10V4h-6"/>
                        </svg>
                      ), 
                      text: "él/él" 
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#9b9b9b] shrink-0">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[12.5px] text-[#f5f5f7] tracking-tight truncate">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>

          {/* Trayectoria / Experience */}
          <section className="space-y-4">
            <h2 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#9b9b9b]/60 font-semibold">
              Trayectoria / Experience
            </h2>
            
            <div className="border border-[#2c2c2c] rounded-xl overflow-hidden bg-[#1e1e1e]/40 divide-y divide-[#2c2c2c]">
              {experience.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-4 flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      
                      {/* Brand Logo Image */}
                      <div className="w-8 h-8 rounded-full overflow-hidden relative bg-[#222222] border border-[#2c2c2c] flex items-center justify-center shrink-0 shadow-inner">
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt={`${item.company} Logo`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Briefcase size={14} className="text-[#9b9b9b]" />
                        )}
                      </div>

                      {/* Info strings */}
                      <div className="min-w-0 flex flex-wrap items-baseline gap-1 text-[14px]">
                        <span className="text-white font-medium truncate">{item.company}</span>
                        <span className="text-[#9b9b9b]/50 shrink-0">/</span>
                        <span className="text-[#9b9b9b] truncate">{item.role}</span>
                      </div>

                    </div>

                    <div className="flex items-center gap-2 text-[13px] font-mono text-[#9b9b9b]/80 shrink-0">
                      <span>{item.period}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Github Contributions */}
          <section className="pt-4 border-t border-[#2c2c2c]/40">
            <GithubContributions />
          </section>


        </div>
      </div>

    </main>
  );
}
