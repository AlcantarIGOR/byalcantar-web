"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Circle,
  Clock,
  ExternalLink,
  FileSearch,
  Github,
  GraduationCap,
  Building2,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroBackground, AmbientGlow } from "@/components/Background";

const featured = {
  name: "MoodleSync",
  tagline: "El OS del estudiante ITCG",
  status: "En producción · Fase 6 activa",
  url: "https://moodlesync.onyxinc.dev",
  repo: "github.com/AlcantarIGOR/moodlesync-saas",
  desc: "Convierte el portal escolar del ITCG en una experiencia moderna. Todo lo que un estudiante necesita — tareas, horario, calificaciones — en un solo lugar, siempre al día.",
  stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "Supabase", "Tailwind v4", "Vercel"],
  features: [
    { t: "Todo en un lugar", d: "Tus tareas, horario y calificaciones aparecen solas — sin copiar, sin pegar, sin perder nada." },
    { t: "Tablero de tareas", d: "Arrastra y organiza lo pendiente, lo que estás haciendo y lo que ya entregaste. Sin fricción." },
    { t: "Exporta a tu calendario", d: "Tus entregas aparecen en Google Calendar o Apple Calendar con un click. Recordatorios incluidos." },
    { t: "Pensado para el ITCG", d: "Entiende el semestre en curso, tu carrera y tu rutina. Hecho por un estudiante, para estudiantes." },
  ],
  roadmap: [
    { phase: "Fase 1", state: "done", t: "Auth + Scaffold" },
    { phase: "Fase 2", state: "done", t: "Sync de tareas + Dashboard" },
    { phase: "Fase 3", state: "done", t: "Tareas manuales + Kanban" },
    { phase: "Fase 4", state: "done", t: "Landing pública + .ics" },
    { phase: "Fase 5", state: "done", t: "Free para todos · eliminada paywall" },
    { phase: "Fase 6", state: "active", t: "Entrega de PDFs + reportes" },
    { phase: "Fase 7", state: "soon", t: "Multi-campus expansion" },
  ],
};

const otherProjects = [
  {
    name: "ONYX Inc.",
    type: "Empresa",
    icon: <Building2 size={18} />,
    status: "En operación",
    tagline: "Servicios digitales con IA para PyMEs locales",
    desc: "Mi empresa de IA aplicada. Entregamos sitios, automatizaciones y asistentes — servicio gestionado, no SaaS. Arrancamos con dueños de gimnasios y barberías en CG.",
    tags: ["n8n", "WhatsApp", "Claude", "Next.js"],
    url: "https://onyxinc.dev",
  },
  {
    name: "Diagnóstico Digital",
    type: "Automatización · ONYX Inc.",
    icon: <FileSearch size={18} />,
    status: "Piloto interno",
    tagline: "De entrevista a propuesta comercial en minutos",
    desc: "Flujo que escucha la entrevista con un prospecto, detecta oportunidades de automatización y genera una propuesta comercial pre-llenada lista para presentar. El asistente de ventas que ONYX usa con sus clientes.",
    tags: ["n8n", "IA", "Automatización"],
    url: null,
  },
  {
    name: "ONYX Digital System",
    type: "Producto",
    icon: <GraduationCap size={18} />,
    status: "Diseño",
    tagline: "Plataforma de servicios digitales unificada",
    desc: "Sistema interno de ONYX Inc. para orquestar clientes, proyectos, automatizaciones activas y métricas. Pensado para escalar cuando el equipo crezca.",
    tags: ["Next.js", "Postgres", "Dashboards"],
    url: null,
  },
];

const comingSoon = [
  {
    type: "Producto",
    t: "byalcantar/blog",
    d: "Notas técnicas sobre lo que estoy aprendiendo — IA, producto, sistemas.",
    tag: "2026-Q3",
  },
  {
    type: "Herramienta",
    t: "ONYX Care",
    d: "Panel de mantenimiento mensual para clientes de ONYX — uptime, logs, métricas.",
    tag: "Q2",
  },
  {
    type: "Experimento",
    t: "Agente de ventas",
    d: "LLM + n8n para calificar leads entrantes de ONYX y agendar demo automáticamente.",
    tag: "WIP",
  },
];

function StatusIcon({ state }: { state: string }) {
  if (state === "done")
    return <Check size={13} className="text-emerald-400" />;
  if (state === "active")
    return <Circle size={10} fill="currentColor" className="text-[#a3e635] animate-pulse" />;
  return <Clock size={12} className="text-white/30" />;
}

export default function Projects() {
  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <HeroBackground />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionLabel>Showcase</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(42px,6vw,78px)] font-extrabold text-white tracking-tight leading-[1.03] mb-6"
          >
            Cosas que <em className="text-[#a3e635] font-display italic">construí</em>
            <br />
            <span className="text-white/60">— y cosas que estoy construyendo.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/55 text-lg max-w-2xl"
          >
            Proyectos reales, en producción o en camino. Todo es código propio,
            deployado, con usuarios — no demos de portafolio.
          </motion.p>
        </div>
      </section>

      {/* Featured — MoodleSync */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-[#111114] to-[#0a0a0c] border border-white/[0.08] rounded-3xl overflow-hidden"
          >
            <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#a3e635]/[0.08] rounded-full blur-3xl pointer-events-none" />

            <div className="p-10 md:p-14 relative">
              <div className="flex items-start justify-between mb-10 flex-wrap gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#a3e635]/10 border border-[#a3e635]/25 rounded-full px-3 py-1 mb-5">
                    <GraduationCap size={13} className="text-[#a3e635]" />
                    <span className="font-mono text-[11px] tracking-wider uppercase text-[#c4f060]">
                      PROYECTO DESTACADO
                    </span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                    {featured.name}
                  </h2>
                  <p className="text-white/50 text-lg">{featured.tagline}</p>
                </div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#a3e635]">
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                  {featured.status}
                </div>
              </div>

              <p className="text-white/60 text-[15px] leading-relaxed max-w-3xl mb-10">
                {featured.desc}
              </p>

              {/* Feature grid */}
              <div className="grid md:grid-cols-2 gap-3 mb-10">
                {featured.features.map((f) => (
                  <div
                    key={f.t}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
                  >
                    <p className="text-white text-[14px] font-semibold mb-1">
                      {f.t}
                    </p>
                    <p className="text-white/45 text-[13px] leading-relaxed">
                      {f.d}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="mb-10">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/40 mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[12px] font-mono px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roadmap */}
              <div className="mb-10">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/40 mb-4">
                  Roadmap
                </p>
                <div className="space-y-0">
                  {featured.roadmap.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`grid grid-cols-[100px_20px_1fr] gap-4 items-center py-3 border-t border-white/[0.05] ${
                        r.state === "soon" ? "opacity-55" : ""
                      }`}
                    >
                      <span className="font-mono text-xs text-white/50 tracking-wider">
                        {r.phase}
                      </span>
                      <span className="flex items-center justify-center">
                        <StatusIcon state={r.state} />
                      </span>
                      <span
                        className={`text-[14px] ${
                          r.state === "active"
                            ? "text-white font-medium"
                            : r.state === "done"
                            ? "text-white/70"
                            : "text-white/40"
                        }`}
                      >
                        {r.t}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-6 h-11 text-[13px] font-semibold transition"
                >
                  Ver en vivo <ExternalLink size={13} />
                </a>
                <a
                  href={`https://${featured.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:border-white/25 text-white rounded-full px-6 h-11 text-[13px] font-medium transition"
                >
                  <Github size={14} /> Repositorio
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other projects */}
      <section className="relative px-6 py-24">
        <AmbientGlow />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-14">
            <SectionLabel>Otros proyectos</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Lo que sostiene el resto del ecosistema.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {otherProjects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-[#111114] border border-white/[0.07] hover:border-[#a3e635]/25 rounded-2xl p-6 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                    {p.status}
                  </span>
                </div>
                <p className="font-mono text-[10px] tracking-wider text-[#a3e635]/70 uppercase mb-1">
                  {p.type}
                </p>
                <h3 className="text-white font-semibold text-xl mb-1">{p.name}</h3>
                <p className="text-white/55 text-[13px] mb-3">{p.tagline}</p>
                <p className="text-white/45 text-[13px] leading-relaxed mb-5 flex-1">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10.5px] font-mono px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#a3e635] text-[13px] font-medium hover:gap-2 transition-all"
                  >
                    Ver proyecto <ArrowUpRight size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <SectionLabel>Próximamente</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4 flex-wrap">
              En el horno
              <Sparkles className="text-[#a3e635]" size={32} />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {comingSoon.map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0c] border border-dashed border-white/[0.08] rounded-2xl p-6 hover:border-white/15 transition"
              >
                <p className="font-mono text-[10px] tracking-wider text-white/30 uppercase mb-3">
                  {c.type}
                </p>
                <h3 className="text-white/60 font-semibold text-lg mb-2">{c.t}</h3>
                <p className="text-white/35 text-[13px] leading-relaxed mb-4">
                  {c.d}
                </p>
                <span className="inline-block text-[10.5px] font-mono px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-white/40">
                  {c.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Te late colaborar en algo así?
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-7 h-12 text-[14px] font-semibold shadow-[0_0_28px_rgba(163,230,53,0.35)] transition"
          >
            Hablemos <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
