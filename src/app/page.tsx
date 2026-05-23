"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Brain,
  GraduationCap,
  Zap,
  Github,
  Instagram,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroBackground, AmbientGlow } from "@/components/Background";
import { SectionLabel } from "@/components/SectionLabel";
import { MagneticButton } from "@/components/MagneticButton";

/* ──────────────────────── HERO ──────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 320], [1, 0]);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-24 pb-16 px-6">
      <HeroBackground />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.15fr_auto] gap-12 md:gap-20 items-center relative z-10">
        <motion.div style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 mb-8"
          >
            <span className="w-8 h-px bg-[#a3e635]" />
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#a3e635]">
              AI Engineering · Founder · Builder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-[clamp(48px,7vw,88px)] font-extrabold leading-[1.02] tracking-tight text-white mb-6"
          >
            Hola — soy <em className="text-[#a3e635] not-italic font-display italic">Juan</em>.
            <br />
            <span className="text-white/70">
              Construyo{" "}
              <span className="text-gradient-lime">sistemas digitales</span>
              {" "}que piensan.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/55 text-lg md:text-xl leading-relaxed max-w-xl mb-4"
          >
            Estudiante de Ingeniería en IA en el ITCG Ciudad Guzmán. Fundador
            de <span className="text-white">ONYX Inc.</span>. Creador de{" "}
            <span className="text-white">MoodleSync</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg mb-10"
          >
            Diseño herramientas, productos y automatizaciones que resuelven
            problemas reales — con IA cuando suma, con código cuando aguanta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-3 items-center"
          >
            <MagneticButton
              href="/projects"
              className="group inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-6 h-11 text-[14px] font-semibold shadow-[0_0_28px_rgba(163,230,53,0.35)] transition"
            >
              Ver proyectos
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/[0.04] text-white border border-white/[0.1] hover:border-white/25 hover:bg-white/[0.08] rounded-full px-6 h-11 text-[14px] font-medium transition"
            >
              Contacto →
            </MagneticButton>

            <div className="inline-flex items-center gap-2 pl-2 text-xs font-mono text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
              DISPONIBLE PARA PROYECTOS
            </div>
          </motion.div>
        </motion.div>

        {/* Visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block relative w-[320px] h-[400px]"
        >
          <div className="absolute inset-0 rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-[#111114] to-[#0a0a0c] overflow-hidden glow-lime">
            {/* corner marks */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#a3e635]/60" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#a3e635]/60" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#a3e635]/60" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#a3e635]/60" />

            {/* scanline */}
            <motion.div
              animate={{ y: [0, 380, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a3e635]/60 to-transparent"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(163,230,53,0.25) 0%, transparent 60%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div
                className="w-24 h-24 rounded-full border-[1.5px] border-[#a3e635]/45 flex items-center justify-center mb-4"
                style={{
                  background:
                    "radial-gradient(circle, rgba(163,230,53,0.2), transparent 65%)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-mono text-4xl text-[#c4f060] font-medium"
                >
                  A/
                </motion.div>
              </div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
                Juan Alcántar
              </p>
              <p className="font-mono text-[10px] tracking-[0.14em] text-[#a3e635]/70 mt-1">
                AI · BUILDER · FOUNDER
              </p>
            </div>

            {/* grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(163,230,53,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* floating badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-6 top-10 bg-[#111114]/90 backdrop-blur border border-white/10 rounded-xl px-3 py-2 text-[11px] font-mono text-white/70"
          >
            <span className="text-[#a3e635]">→</span> Next.js 16
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            className="absolute -right-4 top-1/3 bg-[#111114]/90 backdrop-blur border border-white/10 rounded-xl px-3 py-2 text-[11px] font-mono text-white/70"
          >
            <span className="text-[#a3e635]">✦</span> n8n + Claude
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute -left-4 bottom-8 bg-[#111114]/90 backdrop-blur border border-white/10 rounded-xl px-3 py-2 text-[11px] font-mono text-white/70"
          >
            <span className="text-[#a3e635]">⌘</span> TypeScript
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-9 border border-white/15 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── STATS ─────────────────────── */
function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { v: "Jalisco", l: "Ciudad Guzmán · Home base" },
    { v: "1ª gen", l: "AI Engineering · ITCG" },
    { v: "Full-stack", l: "De diseño a deploy" },
    { v: "2026", l: "ONYX Inc. fundada" },
  ];

  return (
    <section
      ref={ref}
      className="border-y border-white/[0.05] py-14 px-6 bg-[#080809]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 + 0.1, duration: 0.6 }}
          >
            <p className="font-display text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight">
              {s.v}
            </p>
            <p className="text-white/40 text-xs md:text-sm font-mono uppercase tracking-wider">
              {s.l}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── FEATURED PROJECT ─────────────────── */
function FeaturedProject() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <SectionLabel>Proyecto destacado</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
              MoodleSync
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[13px] text-white/50 hover:text-[#a3e635] font-mono inline-flex items-center gap-1 transition"
          >
            Ver todos los proyectos <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -4 }}
          className="relative bg-gradient-to-br from-[#111114] to-[#0a0a0c] border border-white/[0.08] hover:border-[#a3e635]/30 rounded-3xl overflow-hidden transition-all group"
        >
          <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-[#a3e635]/[0.08] rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-[1fr_1.2fr]">
            <div className="p-10 md:p-14 relative">
              <div className="inline-flex items-center gap-2 bg-[#a3e635]/10 border border-[#a3e635]/25 rounded-full px-3 py-1 mb-6">
                <GraduationCap size={13} className="text-[#a3e635]" />
                <span className="font-mono text-[11px] tracking-wider uppercase text-[#c4f060]">
                  SaaS Educativo
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                El OS del estudiante ITCG
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-8">
                Convierte el portal Moodle del TecNM Ciudad Guzmán en una
                experiencia moderna. Tareas, horario, calificaciones y
                notificaciones — todo en un lugar, sincronizado automáticamente.
              </p>

              <ul className="space-y-2.5 mb-8 text-sm text-white/65">
                {[
                  "Sincroniza tareas, horario y calificaciones",
                  "Tablero Kanban drag-and-drop",
                  "Export .ics a Google/Apple Calendar",
                  "Tablero de notas tipo canvas",
                  "Entrega de PDFs directo a Moodle",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_rgba(163,230,53,0.6)]" />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://moodlesync.onyxinc.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-5 h-10 text-[13px] font-semibold transition"
                >
                  Ver en vivo <ArrowUpRight size={14} />
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:border-white/25 text-white rounded-full px-5 h-10 text-[13px] font-medium transition"
                >
                  Case study
                </Link>
              </div>
            </div>

            {/* Mockup preview */}
            <div className="relative bg-[#0a0a0c] border-l border-white/[0.06] p-8 md:p-10 flex items-center justify-center overflow-hidden min-h-[380px]">
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>

              <div className="relative w-full max-w-sm bg-[#0f0f12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-[#141417]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="ml-3 font-mono text-[10px] text-white/40">
                    moodlesync.onyxinc.dev
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-3 w-24 rounded bg-white/10 mb-1.5" />
                      <div className="h-2 w-16 rounded bg-white/5" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#a3e635]/20 border border-[#a3e635]/30" />
                  </div>

                  {[72, 55, 85].map((w, i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
                      className="relative bg-[#16161a] rounded-lg p-3 border border-white/5"
                    >
                      <div className="h-2 w-2/3 bg-white/10 rounded mb-2" />
                      <div className="h-1.5 w-1/2 bg-[#a3e635]/30 rounded" />
                    </motion.div>
                  ))}

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 rounded-lg bg-gradient-to-br from-[#16161a] to-[#0f0f12] border border-white/5 flex items-end p-2"
                      >
                        <div className="h-1.5 w-full bg-[#a3e635]/40 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── ONYX PREVIEW ─────────────────── */
function OnyxPreview() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#0f0f12] to-[#080809] border border-white/[0.08] rounded-3xl overflow-hidden"
        >
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#a3e635]/[0.07] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

          <div className="relative text-center px-8 md:px-16 py-20 md:py-24">
            <motion.div
              initial={{ letterSpacing: "0.15em", opacity: 0 }}
              whileInView={{ letterSpacing: "0.28em", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
              className="font-mono text-4xl md:text-6xl text-white mb-4"
              style={{ textShadow: "0 0 40px rgba(163,230,53,0.2)" }}
            >
              ONYX
            </motion.div>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Mi empresa. Entregamos soluciones digitales con IA real — sitios,
              automatizaciones y herramientas — para PyMEs que quieren crecer
              sin contratar un equipo técnico interno.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/onyx"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-6 h-11 text-[13px] font-semibold transition"
              >
                Conocer ONYX Inc. <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://onyxinc.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:border-white/25 text-white rounded-full px-6 h-11 text-[13px] font-medium transition"
              >
                Sitio oficial →
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-14 text-left">
              {[
                { icon: <Zap size={16} />, t: "Automatización", d: "WhatsApp bots, n8n, IA que trabaja 24/7" },
                { icon: <Code2 size={16} />, t: "Desarrollo", d: "Sitios y apps a medida con stack moderno" },
                { icon: <Brain size={16} />, t: "IA aplicada", d: "LLMs integrados en procesos reales" },
              ].map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5"
                >
                  <div className="text-[#a3e635] mb-3">{x.icon}</div>
                  <p className="text-white font-semibold text-sm mb-1.5">{x.t}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{x.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA / CONTACT ─────────────────── */
function FinalCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <AmbientGlow />
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel>Trabajemos juntos</SectionLabel>
          <h2 className="font-display text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.02] mb-8">
            ¿Tienes algo{" "}
            <em className="text-[#a3e635] font-display italic">ambicioso</em>
            <br />en mente?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Colaboro en proyectos donde el reto importa más que el cheque.
            Si estás construyendo algo que no existe, hablemos.
          </p>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            <MagneticButton
              href="mailto:founder@onyxinc.dev"
              className="inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-7 h-12 text-[14px] font-semibold shadow-[0_0_32px_rgba(163,230,53,0.4)] transition"
            >
              <Mail size={16} /> founder@onyxinc.dev
            </MagneticButton>
          </div>

          <div className="flex justify-center gap-5 mt-10">
            {[
              { i: <Github size={18} />, h: "https://github.com/AlcantarIGOR", l: "GitHub" },
              { i: <Instagram size={18} />, h: "https://www.instagram.com/byalcantar.dev", l: "Instagram" },
            ].map((x) => (
              <a
                key={x.l}
                href={x.h}
                target="_blank"
                rel="noreferrer"
                aria-label={x.l}
                className="w-11 h-11 rounded-full border border-white/10 hover:border-[#a3e635]/40 hover:text-[#a3e635] text-white/60 flex items-center justify-center transition"
              >
                {x.i}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function Home() {
  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedProject />
      <OnyxPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
