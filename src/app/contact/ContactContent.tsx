"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Instagram,
  Globe2,
  ArrowUpRight,
  Clock,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroBackground, AmbientGlow } from "@/components/Background";

const channels = [
  {
    icon: <Mail size={22} />,
    label: "Email — preferido",
    value: "founder@onyxinc.dev",
    href: "mailto:founder@onyxinc.dev",
    note: "Respuesta típica en 24h · Para cotizaciones, colaboraciones, o preguntas técnicas",
    primary: true,
  },
  {
    icon: <Github size={22} />,
    label: "GitHub",
    value: "@AlcantarIGOR",
    href: "https://github.com/AlcantarIGOR",
    note: "Repositorios públicos · Ahí vive MoodleSync, ONYX Inc., y experimentos",
  },
  {
    icon: <Instagram size={22} />,
    label: "Instagram",
    value: "@byalcantar.dev",
    href: "https://www.instagram.com/byalcantar.dev",
    note: "Proceso diario · Construyo en público · Behind the scenes",
  },
  {
    icon: <Globe2 size={22} />,
    label: "ONYX Inc. oficial",
    value: "onyxinc.dev",
    href: "https://onyxinc.dev",
    note: "Sitio oficial de la empresa · Servicios, tiers, cotizaciones",
  },
];

function ContactCard({
  c,
  i,
}: {
  c: (typeof channels)[number];
  i: number;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(c.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.a
      href={c.href}
      target={c.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ y: -4 }}
      className={`group relative block rounded-2xl border p-6 transition-all overflow-hidden ${
        c.primary
          ? "bg-gradient-to-br from-[#a3e635]/[0.08] to-[#111114] border-[#a3e635]/30 hover:border-[#a3e635]/60"
          : "bg-[#111114] border-white/[0.07] hover:border-[#a3e635]/25"
      }`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a3e635]/[0.06] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              c.primary
                ? "bg-[#a3e635] text-black"
                : "bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635]"
            }`}
          >
            {c.icon}
          </div>
          <ArrowUpRight
            size={18}
            className="text-white/30 group-hover:text-[#a3e635] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
          />
        </div>

        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/40 mb-1">
          {c.label}
        </p>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <p className="text-white font-semibold text-lg break-all">{c.value}</p>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-white/40 hover:text-[#a3e635] transition"
          >
            {copied ? (
              <>
                <Check size={11} /> COPIADO
              </>
            ) : (
              <>
                <Copy size={11} /> COPIAR
              </>
            )}
          </button>
        </div>
        <p className="text-white/50 text-[13.5px] leading-relaxed">{c.note}</p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <HeroBackground />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <SectionLabel>Contacto</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(44px,7vw,88px)] font-extrabold text-white tracking-tight leading-[1.02] mb-8"
          >
            ¿Qué estás
            <br />
            <em className="text-[#a3e635] font-display italic">construyendo?</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/55 text-lg max-w-2xl mx-auto mb-8"
          >
            Cuéntame de tu proyecto, tu idea, o el problema que no te deja
            dormir. Si hay forma de construirlo, la encontramos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-5 text-xs font-mono text-white/35 tracking-wider"
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> RESPUESTA EN 24H
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} /> CIUDAD GUZMÁN, JALISCO
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DISPONIBLE
            </span>
          </motion.div>
        </div>
      </section>

      {/* Channels */}
      <section className="relative px-6 py-16">
        <AmbientGlow />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-5">
            {channels.map((c, i) => (
              <ContactCard key={c.label} c={c} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Decision helper */}
      <section className="px-6 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <SectionLabel>Qué escribir</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Antes de enviar el mensaje…
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                t: "Si eres empresa/negocio",
                d: "Cuéntame qué problema quieres resolver y en cuánto tiempo. Me ahorras 3 correos si incluyes presupuesto aproximado.",
                tag: "ONYX Inc.",
                href: "https://onyxinc.dev",
              },
              {
                t: "Si eres founder/dev",
                d: "Dime qué estás construyendo y qué necesitas. Colaboro gratis en cosas que me intrigan — si hay chemistry, seguimos.",
                tag: "Colab · open",
                href: "mailto:founder@onyxinc.dev",
              },
              {
                t: "Si eres estudiante",
                d: "Si usas MoodleSync o estás por entrar a IA, escríbeme. Siempre contesto preguntas técnicas de otros estudiantes.",
                tag: "Free",
                href: "mailto:founder@onyxinc.dev",
              },
            ].map((x, i) => (
              <motion.a
                key={x.t}
                href={x.href}
                target={x.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="group bg-[#0a0a0c] border border-white/[0.06] hover:border-[#a3e635]/25 rounded-2xl p-6 block transition"
              >
                <h3 className="text-white font-semibold text-lg mb-3">{x.t}</h3>
                <p className="text-white/50 text-[13.5px] leading-relaxed mb-5">
                  {x.d}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono px-2 py-1 rounded-md bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#c4f060]">
                    {x.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-white/30 group-hover:text-[#a3e635] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer signoff */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display italic text-white/50 text-xl md:text-2xl leading-relaxed"
          >
            &quot;Construyendo desde Jalisco — IA, automatización y herramientas
            para el siguiente nivel.&quot;
          </motion.p>
          <p className="font-mono text-xs text-white/30 tracking-widest mt-4">
            — @byalcantar
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
