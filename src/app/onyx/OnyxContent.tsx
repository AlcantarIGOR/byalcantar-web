"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home as HomeIcon, 
  Copy, 
  Check, 
  ArrowUpRight,
  Globe2,
  Bot,
  Cpu,
  MessageSquare,
  MapPin,
  Zap,
  ShieldCheck,
  HandshakeIcon,
  Target
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function OnyxContent() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://byalcantar.me/onyx");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const services = [
    {
      icon: <Globe2 size={16} />,
      t: "Páginas web inteligentes",
      d: "Sitios web profesionales con un chat de atención integrado que responde preguntas de tus servicios, califica el interés de tus visitas y agenda contactos calificados automáticamente."
    },
    {
      icon: <Bot size={16} />,
      t: "Asistentes en WhatsApp",
      d: "Sistemas de respuesta automática que atienden a tus clientes las 24 horas del día. Resuelven dudas comunes, agendan citas en tu calendario de forma directa y facilitan tus ventas por chat."
    },
    {
      icon: <Cpu size={16} />,
      t: "Automatización de tareas",
      d: "Conexiones que eliminan el trabajo repetitivo del día a día: envío automático de alertas de confirmación a tus clientes, generación de reportes automáticos y sincronización de bases de datos."
    },
    {
      icon: <MessageSquare size={16} />,
      t: "Asistentes virtuales de negocio",
      d: "Agentes digitales entrenados exclusivamente con la información de tu negocio para atender dudas especializadas y guiar a tus clientes, asegurando respuestas inmediatas y precisas."
    }
  ];

  const differentiators = [
    {
      icon: <MapPin size={16} />,
      t: "Cercanía local",
      d: "Estoy en Ciudad Guzmán. Trabajo de cerca con los negocios de la región, entendiendo de primera mano las necesidades operativas de las PyMEs en Jalisco."
    },
    {
      icon: <Zap size={16} />,
      t: "Tecnología útil y medible",
      d: "No te vendo ideas abstractas. Diseño e instalo herramientas prácticas diseñadas para ahorrar tiempo real en tus tareas diarias y mejorar tu atención al cliente."
    },
    {
      icon: <ShieldCheck size={16} />,
      t: "Servicio gestionado completo",
      d: "No necesitas aprender programación ni configurar sistemas. Yo me encargo de construir, mantener y actualizar todo. Tú te enfocas en vender, yo en la tecnología."
    },
    {
      icon: <HandshakeIcon size={16} />,
      t: "Trato directo y transparente",
      d: "Trabajas directamente con el fundador. Sin intermediarios, sin demoras de agencias tradicionales y con respuestas y modificaciones rápidas ante cualquier cambio en tu negocio."
    }
  ];

  const processSteps = [
    {
      n: "01",
      t: "Diagnóstico",
      d: "Llamada gratuita · 30 min. Mapeo qué tareas te roban tiempo y cuáles podemos automatizar hoy."
    },
    {
      n: "02",
      t: "Diseño",
      d: "Te entrego un plan con alcance claro, precio fijo y tiempo estimado. Sin sorpresas ni cobros sorpresa."
    },
    {
      n: "03",
      t: "Construcción",
      d: "Implemento el sistema. Tiempo estimado: 3 a 10 días. Realizo pruebas contigo antes de activarlo públicamente."
    },
    {
      n: "04",
      t: "ONYX Care",
      d: "Mantenimiento mensual opcional. Me aseguro que lo que construyo siga activo — y mejorando — con el tiempo."
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
            <span className="text-[#9b9b9b]">ONYX</span>
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

        {/* Scrollable ONYX Content */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 max-w-4xl space-y-16">
          
          {/* Hero Bio */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest block font-semibold">
                MY COMPANY
              </span>
              <h1 className="text-[44px] md:text-[56px] font-mono font-medium text-white tracking-[0.25em] leading-none">
                ONYX
              </h1>
            </div>

            <p className="text-[15px] text-white/80 leading-relaxed font-sans max-w-3xl">
              La empresa de IA aplicada que fundé para ayudar a negocios locales a crecer sin necesidad de un equipo técnico interno.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://onyxinc.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-black bg-white hover:bg-white/90 transition rounded-lg px-4 py-2.5"
              >
                <span>Sitio oficial de ONYX</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href="mailto:founder@onyxinc.dev"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white hover:text-[#a3e635] transition border border-[#2c2c2c] rounded-lg px-4 py-2.5 bg-[#222222]/40"
              >
                <span>Cotizar proyecto</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>
            </div>

            <div className="pt-4 flex items-center gap-2 font-mono text-[10px] text-[#9b9b9b]/55 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPERANDO DESDE 2026 · CIUDAD GUZMÁN, JALISCO</span>
            </div>
          </section>

          {/* Propuesta de Valor Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Propuesta de valor
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-start pt-2">
              <h2 className="text-[20px] font-sans font-bold text-white tracking-tight leading-snug">
                Tu negocio merece trabajar con <span className="text-[#a3e635]">tecnología real</span>.
              </h2>
              <div className="space-y-5 text-[14px] text-[#9b9b9b] leading-relaxed font-sans">
                <p>
                  La mayoría de las agencias te entregan una página web sencilla que solo sirve de aparador digital. En ONYX te construyo sistemas completos: herramientas automáticas que atienden a tus visitas, organizan tu agenda de citas, procesan reservas y facilitan la administración de tu negocio.
                </p>
                <p>
                  No es una plataforma compleja en la que tengas que pasar horas aprendiendo a configurar conexiones. Es un servicio gestionado: me encargo del diseño, la puesta en marcha de todas las conexiones automáticas y el soporte técnico constante para que todo funcione sin complicaciones.
                </p>
                <p>
                  Comencé en Ciudad Guzmán ayudando a comercios locales, barberías y gimnasios que perdían valiosas horas resolviendo las mismas dudas una y otra vez por WhatsApp, y hoy llevo esas automatizaciones para optimizar la operación de PyMEs en todo Jalisco.
                </p>
              </div>
            </div>
          </section>

          {/* Servicios Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Servicios
            </span>
            
            <div className="space-y-4">
              {services.map((item) => (
                <div
                  key={item.t}
                  className="flex items-start gap-4 text-[14px] py-1"
                >
                  <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#9b9b9b] shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-medium">{item.t}</h3>
                    <p className="text-[#9b9b9b] leading-relaxed text-[13.5px]">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Diferenciadores Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Diferenciadores
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {differentiators.map((item) => (
                <div
                  key={item.t}
                  className="flex gap-4 text-[14px]"
                >
                  <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#9b9b9b] shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-medium">{item.t}</h3>
                    <p className="text-[#9b9b9b] leading-relaxed text-[13.5px]">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Proceso Section */}
          <section className="space-y-4 pt-6 border-t border-[#2c2c2c]/40">
            <span className="text-[11px] font-mono text-[#9b9b9b]/50 uppercase tracking-widest block font-semibold">
              Proceso
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((step) => (
                <div
                  key={step.n}
                  className="bg-[#222222]/20 border border-[#2c2c2c] rounded-xl p-5 space-y-3"
                >
                  <span className="font-mono text-[22px] font-bold text-[#a3e635]/50 block leading-none">
                    {step.n}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-white font-semibold text-[14px]">
                      {step.t}
                    </h4>
                    <p className="text-[#9b9b9b] text-[13px] leading-relaxed">
                      {step.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cliente Ideal Section */}
          <section className="pt-6 border-t border-[#2c2c2c]/40">
            <div className="bg-[#222222]/30 border border-[#2c2c2c] rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#222222] border border-[#2c2c2c] flex items-center justify-center text-[#a3e635] shrink-0">
                  <Target size={14} />
                </div>
                <h3 className="text-[18px] font-bold text-white tracking-tight">
                  ¿Eres el cliente ideal de ONYX?
                </h3>
              </div>

              <div className="space-y-4 text-[14px] text-[#9b9b9b] leading-relaxed font-sans">
                <p>
                  Trabajo principalmente con negocios locales — dueños que operan uno o varios puntos de contacto físicos o digitales sin equipo técnico, y que pierden más de 10 horas semanales atendiendo tareas repetitivas y manuales.
                </p>
                <p className="text-[13.5px] opacity-85">
                  Gimnasios con problemas de registro, barberías con agendamiento caótico, comercios de retail con WhatsApp saturado de las mismas preguntas, o consultorios médicos. Si tu negocio califica, puedo ayudarte.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/523340865087"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-black bg-[#a3e635] hover:bg-[#b8f069] transition rounded-lg px-4 py-2"
                >
                  <span>Agendar diagnóstico gratis</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
