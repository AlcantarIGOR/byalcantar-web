"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Bot,
  Cpu,
  MessageSquare,
  Zap,
  HandshakeIcon,
  MapPin,
  Sparkles,
  Target,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroBackground, AmbientGlow } from "@/components/Background";

const services = [
  {
    icon: <Globe2 size={22} />,
    t: "Sitios web con IA integrada",
    d: "Landings que convierten + chat inteligente que califica leads. Next.js + Vercel + LLM en la capa de contacto.",
  },
  {
    icon: <Bot size={22} />,
    t: "Bots de WhatsApp",
    d: "Asistentes 24/7 que responden FAQ, agendan citas y cierran ventas. n8n + Evolution API + Claude/Ollama.",
  },
  {
    icon: <Cpu size={22} />,
    t: "Automatizaciones",
    d: "Flujos que quitan trabajo repetitivo: reportes automáticos, alertas, seguimiento a clientes sin tocar un botón.",
  },
  {
    icon: <MessageSquare size={22} />,
    t: "Asistentes de negocio",
    d: "Agente que conoce tu negocio y atiende como si fuera tú — pero nunca duerme, nunca se olvida, nunca tarda.",
  },
];

const differentiators = [
  {
    icon: <MapPin size={20} />,
    t: "Cercanía local",
    d: "Estamos en Ciudad Guzmán. No somos agencia de CDMX cobrando en dólares. Entendemos el contexto PyMEs en Jalisco.",
  },
  {
    icon: <Zap size={20} />,
    t: "IA aplicada real",
    d: "No es marketing. LLMs trabajando dentro de procesos de negocio. Resultados medibles, no buzzwords.",
  },
  {
    icon: <ShieldCheck size={20} />,
    t: "Servicio gestionado",
    d: "No tienes que aprender nada técnico. Implementamos, operamos y mantenemos. Tú vendes, nosotros resolvemos.",
  },
  {
    icon: <HandshakeIcon size={20} />,
    t: "Founder visible",
    d: "Trabajas directo con @byalcantar — no con un account manager. Decisiones rápidas, ejecución directa.",
  },
];

const process = [
  {
    n: "01",
    t: "Diagnóstico",
    d: "Llamada gratuita · 30 min. Mapeamos qué tareas te roban tiempo y cuáles podemos automatizar hoy.",
  },
  {
    n: "02",
    t: "Diseño",
    d: "Te entregamos plan con alcance claro, precio fijo y tiempo estimado. Sin sorpresas ni hora-hombre infladas.",
  },
  {
    n: "03",
    t: "Construcción",
    d: "Implementamos. Setup típico: 3 a 10 días. Te vemos pruebas reales antes de soltar a producción.",
  },
  {
    n: "04",
    t: "ONYX Care",
    d: "Mantenimiento mensual opcional. Nos aseguramos que lo que construimos siga vivo — y mejorando — con el tiempo.",
  },
];

export default function OnyxPage() {
  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <HeroBackground />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <SectionLabel>My company</SectionLabel>
            <motion.div
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.28em", opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono font-medium text-white text-[clamp(56px,10vw,120px)] mb-4 mx-auto"
              style={{ textShadow: "0 0 60px rgba(163,230,53,0.25)" }}
            >
              ONYX
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10"
            >
              La empresa de IA aplicada que fundé para ayudar a negocios locales a
              crecer sin necesidad de un equipo técnico interno.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="https://onyxinc.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-7 h-12 text-[14px] font-semibold transition"
              >
                Sitio oficial de ONYX <ArrowUpRight size={15} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:border-white/25 text-white rounded-full px-7 h-12 text-[14px] font-medium transition"
              >
                Cotizar proyecto
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-14 inline-flex items-center gap-2 font-mono text-xs text-white/35 tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              OPERANDO DESDE 2026 · CIUDAD GUZMÁN, JALISCO
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proposal */}
      <section className="relative px-6 py-20 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16"
          >
            <div>
              <SectionLabel>Propuesta de valor</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.1]">
                Tu negocio merece trabajar con{" "}
                <span className="text-gradient-lime">tecnología real</span>.
              </h2>
            </div>
            <div className="space-y-5 text-white/60 text-[16px] leading-[1.75]">
              <p>
                La mayoría de agencias te venden una landing bonita que no hace
                nada. ONYX te entrega <span className="text-white">sistemas</span>:
                cosas que responden, agendan, cobran y reportan — mientras tú te
                dedicas a vender.
              </p>
              <p>
                No es SaaS. No es autoservicio. Es{" "}
                <span className="text-white">servicio gestionado</span>:
                implementamos, configuramos y mantenemos. El cliente recibe
                resultados, no herramientas.
              </p>
              <p>
                Arrancamos en Ciudad Guzmán con dueños de gimnasios, barberías,
                y negocios locales con atención al cliente repetitiva. De ahí
                escalamos a PyMEs en todo Jalisco — y eventualmente LATAM.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="relative px-6 py-24">
        <AmbientGlow />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-14">
            <SectionLabel>Servicios</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Qué construimos para nuestros clientes.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative bg-[#111114] border border-white/[0.07] hover:border-[#a3e635]/25 rounded-2xl p-7 transition-all group overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a3e635]/[0.05] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] flex items-center justify-center mb-5">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{s.t}</h3>
                  <p className="text-white/55 text-[14px] leading-relaxed">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <SectionLabel>Diferenciadores</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Por qué <span className="text-gradient-lime">ONYX</span>, no otra agencia.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 bg-[#0a0a0c] border border-white/[0.06] rounded-2xl p-6 hover:border-[#a3e635]/20 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] flex items-center justify-center flex-shrink-0">
                  {d.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1.5">{d.t}</h3>
                  <p className="text-white/50 text-[14px] leading-relaxed">{d.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <SectionLabel>Proceso</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              De la llamada al sistema en vivo.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gradient-to-b from-[#111114] to-[#0a0a0c] border border-white/[0.07] rounded-2xl p-6 group hover:border-[#a3e635]/20 transition"
              >
                <div className="font-mono text-[#a3e635]/40 text-3xl font-semibold mb-4 group-hover:text-[#a3e635]/80 transition">
                  {p.n}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{p.t}</h3>
                <p className="text-white/50 text-[13.5px] leading-relaxed">
                  {p.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-[#111114] to-[#0a0a0c] border border-white/[0.08] rounded-3xl p-10 md:p-14 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#a3e635]/[0.06] rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] flex items-center justify-center mb-6">
                <Target size={22} />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-5 max-w-2xl">
                ¿Eres el cliente ideal de ONYX?
              </h3>
              <p className="text-white/60 text-[15.5px] leading-relaxed mb-6">
                Arrancamos con negocios locales en Ciudad Guzmán — dueños que operan
                uno o varios puntos de contacto sin equipo técnico, con procesos
                manuales que les quitan 10+ horas a la semana.
              </p>
              <p className="text-white/45 text-[14px]">
                Gimnasios, barberías, consultorios, comercios con WhatsApp saturado,
                restaurantes con reservas manuales. Si te suena, hablemos.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full px-6 h-11 text-[13px] font-semibold transition"
                >
                  Agendar diagnóstico gratis <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-32 overflow-hidden">
        <AmbientGlow />
        <div className="max-w-4xl mx-auto text-center relative">
          <Sparkles className="text-[#a3e635] mx-auto mb-6" size={32} />
          <h2 className="font-display text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.02] mb-6">
            El futuro es <em className="text-[#a3e635] font-display italic">ONYX</em>.
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto mb-10">
            Visita el sitio oficial para conocer ONYX EDU, ONYX APS y la visión
            completa de la empresa.
          </p>
          <a
            href="https://onyxinc.dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-[14px] font-semibold transition"
          >
            Ir a ONYX Inc. <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
