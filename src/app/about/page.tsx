"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Brain,
  Zap,
  GraduationCap,
  Building2,
  Briefcase,
  ArrowUpRight,
  Github,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroBackground } from "@/components/Background";

const timeline = [
  {
    year: "2026 →",
    title: "Fundador — ONYX Inc.",
    icon: <Building2 size={18} />,
    desc: "Fundo ONYX Inc. en Ciudad Guzmán para entregar IA aplicada a PyMEs locales. Sitios, automatizaciones y asistentes de negocio reales.",
    tags: ["Founder", "IA", "Negocios"],
    active: true,
  },
  {
    year: "2025 →",
    title: "AI Engineering — TecNM ITCG",
    icon: <GraduationCap size={18} />,
    desc: "1ª generación de Ingeniería en Inteligencia Artificial en el Instituto Tecnológico de Ciudad Guzmán. Enfocado en LLMs, sistemas y producto.",
    tags: ["Ingeniería", "IA", "Académico"],
  },
  {
    year: "2024 — 2026",
    title: "Encargado de Sistemas — Cremería La Primavera",
    icon: <Briefcase size={18} />,
    desc: "Operé el ERP Microsip, básculas Dibal, inventarios y procesos POS. Ahí aprendí en serio lo que significa que un sistema falle en producción.",
    tags: ["Microsip", "Dibal", "POS"],
  },
  {
    year: "2022 — 2025",
    title: "Programación — CBTis 226",
    icon: <Code2 size={18} />,
    desc: "Bachillerato técnico en programación. De ahí salió la base: escribir código con la disciplina de quien va a mantenerlo.",
    tags: ["Fundamentos", "CS"],
  },
];

const principles = [
  {
    icon: <Brain size={22} />,
    t: "Pensar en sistemas",
    d: "Un producto no es una feature — es cómo todas las piezas se sostienen entre sí cuando el usuario aparece.",
  },
  {
    icon: <Zap size={22} />,
    t: "Enviar rápido, iterar siempre",
    d: "El primer deploy importa más que la arquitectura perfecta. Si nadie lo usa, no existe.",
  },
  {
    icon: <Code2 size={22} />,
    t: "Código que se pueda leer en 6 meses",
    d: "Escribo para el yo del futuro — o para quien herede el repo. Claridad > cleverness.",
  },
  {
    icon: <Building2 size={22} />,
    t: "Construir en público",
    d: "El proceso vale tanto como el producto. Comparto lo que funciona — y lo que no.",
  },
];

const skills: { k: string; level: "Dominio" | "Experiencia" | "Aprendiendo" }[] = [
  { k: "Python / IA", level: "Dominio" },
  { k: "Next.js / React", level: "Dominio" },
  { k: "TypeScript", level: "Experiencia" },
  { k: "n8n / Automatización", level: "Experiencia" },
  { k: "PostgreSQL / Prisma", level: "Experiencia" },
  { k: "UI / Diseño", level: "Aprendiendo" },
];

const levelDots = { Dominio: 3, Experiencia: 2, Aprendiendo: 1 } as const;

export default function About() {
  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <HeroBackground />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionLabel>Sobre mí</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(40px,6vw,78px)] font-extrabold text-white leading-[1.04] tracking-tight mb-8"
          >
            Soy{" "}
            <em className="text-[#a3e635] font-display italic not-italic">
              Juan Alcántar
            </em>
            . Construyo productos digitales que{" "}
            <span className="text-white/60">aguantan</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/55 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            Desde Ciudad Guzmán, Jalisco. Tengo{" "}
            <span className="text-white">19 años</span> y estudio{" "}
            <span className="text-white">Ingeniería en IA</span> en el ITCG
            mientras construyo ONYX Inc. y producto real — aprendiendo en
            público y mostrando el proceso.
          </motion.p>
        </div>
      </section>

      {/* Grid: Identity + Photo */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.5fr_1fr] gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-white/65 text-[15.5px] leading-[1.75]"
          >
            <p>
              Empecé a escribir código antes de saber qué era Git. Hoy diseño,
              construyo y opero sistemas completos — del primer wireframe al
              deploy en producción.
            </p>
            <p>
              Me interesa la <span className="text-white">IA aplicada</span>:
              no como buzzword, sino como la capa que permite que un negocio
              local responda a clientes a las 3am, que un estudiante vea su
              horario sin pelear con Moodle, que un dueño de gimnasio deje de
              responder el mismo WhatsApp diez veces al día.
            </p>
            <p>
              Fundé{" "}
              <Link
                href="/onyx"
                className="text-[#a3e635] hover:underline underline-offset-4"
              >
                ONYX Inc.
              </Link>{" "}
              para profesionalizar ese trabajo. Mi portafolio personal
              (@byalcantar) es el laboratorio — ONYX es donde esas ideas se
              convierten en servicios reales.
            </p>
            <p>
              Cuando no estoy codeando, estoy leyendo sobre sistemas,
              escuchando podcasts de founders, o rompiendo algo para aprender
              cómo se arma.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] bg-gradient-to-br from-[#111114] to-[#0a0a0c] border border-white/[0.08] rounded-2xl overflow-hidden glow-lime">
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#a3e635]/50" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#a3e635]/50" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#a3e635]/50" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#a3e635]/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                <div
                  className="w-28 h-28 rounded-full border-[1.5px] border-[#a3e635]/40 flex items-center justify-center mb-4"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(163,230,53,0.25), transparent 70%)",
                  }}
                >
                  <span className="font-mono text-5xl text-[#c4f060] font-medium">
                    A/
                  </span>
                </div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase text-center">
                  Juan Alcántar
                </p>
                <p className="font-mono text-[10px] tracking-[0.14em] text-[#a3e635]/60 mt-1">
                  CG · JALISCO · MX
                </p>
              </div>
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, #080809 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <SectionLabel>Recorrido</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              El camino — así de lineal como se puede.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/[0.07] hidden md:block" />
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start group"
                >
                  <div className="flex items-center gap-3 md:pl-0">
                    <div
                      className={`relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        t.active
                          ? "bg-[#a3e635]"
                          : "bg-[#111114] border border-white/15"
                      }`}
                    >
                      {t.active && (
                        <span className="absolute inset-0 rounded-full bg-[#a3e635] animate-ping opacity-50" />
                      )}
                      <span
                        className={`relative w-2 h-2 rounded-full ${
                          t.active ? "bg-black" : "bg-white/40"
                        }`}
                      />
                    </div>
                    <span className="font-mono text-xs text-white/45 tracking-wider">
                      {t.year}
                    </span>
                  </div>

                  <div className="bg-[#111114] border border-white/[0.07] group-hover:border-[#a3e635]/25 rounded-xl p-5 md:p-6 transition">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] flex items-center justify-center">
                        {t.icon}
                      </div>
                      <h3 className="text-white font-semibold text-[16px]">
                        {t.title}
                      </h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-3">
                      {t.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.tags.map((x) => (
                        <span
                          key={x}
                          className="text-[10.5px] font-mono px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/55 tracking-wider"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <SectionLabel>Principios</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Cómo pienso antes de
              <br />
              <span className="text-gradient-lime">escribir la primera línea</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-[#111114] border border-white/[0.07] rounded-2xl p-6 hover:border-[#a3e635]/25 transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] flex items-center justify-center">
                    {p.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg">{p.t}</h3>
                </div>
                <p className="text-white/55 text-[14px] leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <SectionLabel>Stack</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Las herramientas que uso todos los días.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            {skills.map((s, i) => {
              const filled = levelDots[s.level];
              return (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between py-3 border-b border-white/[0.05]"
                >
                  <span className="text-white text-[14px] font-medium">{s.k}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-wider uppercase text-[#a3e635]/70">
                      {s.level}
                    </span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 + dot * 0.08 + 0.2, duration: 0.3 }}
                          className={`w-1.5 h-1.5 rounded-full ${
                            dot < filled
                              ? "bg-[#a3e635] shadow-[0_0_6px_rgba(163,230,53,0.6)]"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Quieres saber qué estoy construyendo ahora?
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-6 h-11 text-[13px] font-semibold transition"
            >
              Ver proyectos <ArrowUpRight size={14} />
            </Link>
            <a
              href="https://github.com/AlcantarIGOR"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:border-white/25 text-white rounded-full px-6 h-11 text-[13px] font-medium transition"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
