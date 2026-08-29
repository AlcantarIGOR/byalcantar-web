"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home as HomeIcon, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Github, 
  ExternalLink 
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

// Fallback project image renderer (consistent with Home page)
function ProjectDetailImage({ 
  src, 
  alt, 
  id 
}: { 
  src: string; 
  alt: string; 
  id: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-full aspect-[16/10] relative rounded-xl border border-[#2c2c2c] overflow-hidden bg-[#1e1e1e]/40 shadow-lg select-none my-6">
      {!imgFailed ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#222222]/30 to-transparent flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-[#9b9b9b]/35 uppercase tracking-widest">
            Mockup
          </div>
          <h4 className="text-white font-semibold text-[17px] tracking-tight mb-1">{alt}</h4>
          <p className="text-[#9b9b9b] text-xs font-mono max-w-xs leading-normal">
            Imágenes de alta fidelidad. Desarrollado por Juan Alcántar.
          </p>
        </div>
      )}
    </div>
  );
}

interface ProjectDetailContentProps {
  id: string;
}

export default function ProjectDetailContent({ id }: ProjectDetailContentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://byalcantar.me/projects/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Content configuration
  const projectData: Record<string, {
    title: string;
    subtitle: string;
    timeline: string;
    location: string;
    role: string;
    github?: string;
    intro: string;
    sections: Array<{
      title: string;
      desc: string;
      image: string;
    }>;
    ctaText: string;
    ctaHref: string;
    ctaLabel: string;
  }> = {
    moodlesync: {
      title: "MoodleSync",
      subtitle: "AGENTE VERTICAL EDUCATIVO · PLATAFORMA ITCG",
      timeline: "Abril 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Creador del Agente",
      github: "https://github.com/AlcantarIGOR/moodlesync-saas",
      intro: "MoodleSync es un agente vertical educativo creado para operar la vida académica de los estudiantes del Instituto Tecnológico de Ciudad Guzmán (ITCG). Conecta la plataforma Moodle con un calendario escolar, organizador de entregas y optimizador instantáneo de documentos.",
      sections: [
        {
          title: "Organizador Visual de Tareas",
          desc: "La pantalla principal reúne toda la información escolar en un panel visual e intuitivo. Los estudiantes pueden organizar sus tareas por columnas de estado (pendiente, en proceso y completado), revisar sus horarios semanales y llevar el control de sus fechas de entrega sin complicaciones.",
          image: "/moodlesync_dashboard.jpg"
        },
        {
          title: "Compresor de Documentos Integrado",
          desc: "Los estudiantes se enfrentan a un problema común: la plataforma escolar tiene un límite muy bajo para el peso de los archivos a entregar (2MB), pero al escanear tareas con el celular, los archivos suelen pesar mucho más. MoodleSync incluye una función que reduce automáticamente el peso de los documentos en menos de 4 segundos sin salir de tu navegador. Un archivo pesado se optimiza de forma instantánea para permitir su entrega sin fallas ni consumo excesivo de internet.",
          image: "/moodlesync_pdf_compressor.jpg"
        },
        {
          title: "Actualización Automática",
          desc: "Cualquier cambio en las tareas o calificaciones del portal escolar se refleja en la pantalla del alumno de manera inmediata. Esto evita tener que recargar la página constantemente o batallar con la lentitud del sistema oficial durante las horas de entrega.",
          image: "/moodlesync_professional.jpg"
        }
      ],
      ctaText: "El proyecto es de código abierto. Si deseas leer el código o contribuir, puedes visitar el repositorio oficial.",
      ctaHref: "https://github.com/AlcantarIGOR/moodlesync-saas",
      ctaLabel: "Ver en GitHub"
    },
    "onyx-automation": {
      title: "ONYX Automation ⭐",
      subtitle: "TIER 3 · PRODUCTO ESTRELLA · AGENTE VERTICAL Y AUTOMATIZACIÓN PYME",
      timeline: "Enero 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Líder de Proyecto & AI Engineer @ ONYX Inc.",
      intro: "ONYX Automation es el producto estrella de ONYX Inc. Funciona como un sistema operativo digital para el negocio cliente: integra un sitio web completo, agentes de atención al cliente automatizada por WhatsApp, gestión de citas y tableros de métricas en una sola entrega gestionada.",
      sections: [
        {
          title: "Sistema Operativo Digital & Sitio Web",
          desc: "Construimos un portal a medida optimizado para conversión que conecta directo con el flujo operativo de tu PyME, eliminando fricción con los usuarios.",
          image: "/onyx_digital_system.png"
        },
        {
          title: "Agente Comercial por WhatsApp & n8n",
          desc: "Flujos inteligentes impulsados por n8n e Inteligencia Artificial que atienden dudas, califican prospectos y agendan citas de forma autónoma las 24 horas.",
          image: "/onyx_digital_system.png"
        },
        {
          title: "Integraciones & Dashboard de Métricas",
          desc: "Sincronización directa con Google Calendar, MercadoPago y WhatsApp Business API para dar visibilidad total del rendimiento de tu negocio.",
          image: "/onyx_digital_system.png"
        }
      ],
      ctaText: "¿Quieres automatizar la atención y ventas de tu negocio? Agenda un diagnóstico digital gratuito.",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Agendar Diagnóstico por WhatsApp"
    },
    "onyx-digital-system": {
      title: "ONYX Automation ⭐",
      subtitle: "TIER 3 · PRODUCTO ESTRELLA · AGENTE VERTICAL Y AUTOMATIZACIÓN PYME",
      timeline: "Enero 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Líder de Proyecto & AI Engineer @ ONYX Inc.",
      intro: "ONYX Automation es el producto estrella de ONYX Inc. Funciona como un sistema operativo digital para el negocio cliente: integra un sitio web completo, agentes de atención al cliente automatizada por WhatsApp, gestión de citas y tableros de métricas en una sola entrega gestionada.",
      sections: [
        {
          title: "Sistema Operativo Digital & Sitio Web",
          desc: "Construimos un portal a medida optimizado para conversión que conecta directo con el flujo operativo de tu PyME, eliminando fricción con los usuarios.",
          image: "/onyx_digital_system.png"
        },
        {
          title: "Agente Comercial por WhatsApp & n8n",
          desc: "Flujos inteligentes impulsados por n8n e Inteligencia Artificial que atienden dudas, califican prospectos y agendan citas de forma autónoma las 24 horas.",
          image: "/onyx_digital_system.png"
        }
      ],
      ctaText: "¿Quieres automatizar la atención y ventas de tu negocio? Agenda un diagnóstico digital gratuito.",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Agendar Diagnóstico por WhatsApp"
    },
    "onyx-launch": {
      title: "ONYX Launch",
      subtitle: "TIER 1 · LANDING PAGE PROFESIONAL MOBILE-FIRST",
      timeline: "Enero 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Diseñador & Desarrollador Web @ ONYX Inc.",
      intro: "ONYX Launch es la solución de entrada para negocios locales y profesionales independientes que necesitan establecer su presencia digital de manera rápida, moderna y profesional en internet.",
      sections: [
        {
          title: "Diseño Móvil de Alto Impacto",
          desc: "Sitios de una sola página (landing) construidos en Framer o Webflow, enfocados en velocidad de carga, tipografía limpia y experiencia móvil impecable.",
          image: "/onyx_launch_pro.png"
        },
        {
          title: "Sección de Contacto Directo",
          desc: "Facilita que tus clientes te llamen o te escriban por WhatsApp con un solo clic desde su teléfono.",
          image: "/onyx_launch_pro.png"
        }
      ],
      ctaText: "Establece la presencia digital de tu negocio hoy mismo.",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Solicitar ONYX Launch"
    },
    "onyx-pro": {
      title: "ONYX Pro",
      subtitle: "TIER 2 · PRESENCIA DIGITAL + AUTOMATIZACIÓN SIMPLE",
      timeline: "Enero 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Desarrollador de Automatizaciones @ ONYX Inc.",
      intro: "ONYX Pro está diseñado para negocios que ya tienen flujo de clientes pero pierden tiempo valioso en respuestas repetitivas de comunicación. Combina una landing avanzada con un flujo inicial de automatización en n8n.",
      sections: [
        {
          title: "Landing Page Avanzada",
          desc: "Sitio web optimizado con secciones detalladas de servicios, testimonios y llamados a la acción estratégicos.",
          image: "/onyx_launch_pro.png"
        },
        {
          title: "Flujo de Automatización con n8n",
          desc: "Integración de formulario o mensaje que dispara alertas instantáneas a tu celular o respuestas automáticas inmediatas por WhatsApp.",
          image: "/onyx_launch_pro.png"
        }
      ],
      ctaText: "Empieza a automatizar tus respuestas a clientes con ONYX Pro.",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Solicitar ONYX Pro"
    },
    "onyx-launch-pro": {
      title: "ONYX Launch / Pro",
      subtitle: "PRESENCIA WEB Y AUTOMATIZACIÓN INICIAL",
      timeline: "Enero 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Diseñador y Desarrollador @ ONYX Inc.",
      intro: "ONYX Launch y ONYX Pro son soluciones ágiles pensadas para negocios locales y profesionales independientes que necesitan iniciar su presencia en internet.",
      sections: [
        {
          title: "Páginas Web para Dispositivos Móviles",
          desc: "Creamos páginas de presentación optimizadas especialmente para celulares.",
          image: "/onyx_launch_pro.png"
        }
      ],
      ctaText: "Inicia la transformación digital de tu marca personal.",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Solicitar Presupuesto"
    },
    "asistente-whatsapp": {
      title: "Asistente WhatsApp (JARVIS)",
      subtitle: "AGENTE PERSONAL HÍBRIDO · DOCKER + CLAUDE 3.5 HAIKU + OPENWA",
      timeline: "Marzo 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Creador & AI Systems Engineer",
      github: "https://github.com/AlcantarIGOR/Agente-WhatsApp",
      intro: "Asistente inteligente en WhatsApp que opera en modalidad híbrida (Personal / Negocio). Cuenta con enrutamiento tri-state, bypass de latencia para el dueño, pausa nocturna y soporte de atención comercial automatizada con IA.",
      sections: [
        {
          title: "Enrutamiento Inteligente Tri-State",
          desc: "Distingue automáticamente entre 3 perfiles de contacto: 1) Dueño (Bypass total, respuesta instantánea de 500ms como JARVIS), 2) Contactos excluidos (Silencio manual absoluto), y 3) Clientes (Respuestas comerciales con delay humano anti-baneo de 5-15s).",
          image: "/onyx_digital_system.png"
        },
        {
          title: "Stack 100% Local & Seguro (Docker + Express)",
          desc: "Gateway OpenWA corriendo en contenedor Docker en puerto 2785, bridge en Node.js Express con verificación de firmas criptográficas HMAC y almacenamiento local persistente.",
          image: "/onyx_digital_system.png"
        },
        {
          title: "Pausa Nocturna y Simulación Mock",
          desc: "De 10 PM a 8 AM encola mensajes de clientes para enviarlos al iniciar el día. Incluye un modo de simulación (Mock Mode) para probar conversaciones sin gastar tokens de la API de Claude.",
          image: "/onyx_digital_system.png"
        }
      ],
      ctaText: "¿Quieres implementar un agente inteligente de atención para tu WhatsApp con tu propia infraestructura?",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Consultar Implementación"
    },
    "onyx-care": {
      title: "ONYX Care",
      subtitle: "MANTENIMIENTO Y SOPORTE RECURRENTE",
      timeline: "Enero 2026 – Presente",
      location: "Ciudad Guzmán, Jalisco, México",
      role: "Soporte Técnico Gestionado @ ONYX Inc.",
      intro: "ONYX Care es mi programa de soporte continuo y mantenimiento post-entrega. Me aseguro de que tus herramientas y sistemas de comunicación sigan funcionando correctamente todos los días de forma transparente para ti.",
      sections: [
        {
          title: "Revisión Diaria de Funcionamiento",
          desc: "Las plataformas de mensajería y calendarios cambian sus reglas constantemente. Yo me encargo de vigilar y actualizar tus conexiones diariamente para que sigan activas y sin interrupciones.",
          image: "/onyx_care.png"
        },
        {
          title: "Copias de Seguridad y Soporte Inmediato",
          desc: "Realizamos respaldos periódicos de la información de tu negocio. Además, cuentas con un canal de comunicación prioritario y directo con nosotros ante cualquier duda o ajuste rápido que necesite tu plataforma.",
          image: "/onyx_care.png"
        }
      ],
      ctaText: "Mantén tus sistemas corriendo sin errores. Conoce más sobre nuestros planes de soporte gestionado.",
      ctaHref: "https://wa.me/523340865087",
      ctaLabel: "Soporte ONYX Care"
    }
  };

  const project = projectData[id] || {
    title: "Proyecto",
    subtitle: "DETALLES DEL PROYECTO",
    timeline: "2026",
    location: "Jalisco, México",
    role: "Creador del Proyecto",
    intro: "Detalles en preparación. Pronto habrá más información sobre esta implementación.",
    sections: [],
    ctaText: "Para cualquier duda o cotización, ponte en contacto directo.",
    ctaHref: "mailto:founder@onyxinc.dev",
    ctaLabel: "Contactar por Correo"
  };

  return (
    <main className="min-h-screen bg-[#191919] text-[#f7facf] font-sans flex flex-col md:flex-row">
      
      {/* LEFT COLUMN: SIDEBAR */}
      <Sidebar activeLog={id} />

      {/* RIGHT COLUMN: MAIN CONTENT (Scrollable) */}
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
            <Link href="/#proyectos" className="hover:text-white transition">
              <span>Proyectos</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#9b9b9b] truncate max-w-[120px] sm:max-w-none">{project.title}</span>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-[12px] font-mono text-[#9b9b9b] hover:text-white transition border border-[#2c2c2c] rounded px-3 py-1 bg-[#222222]/40 shrink-0"
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

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 max-w-4xl space-y-12">
          
          {/* Project Title and Header */}
          <section className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-[#a3e635] uppercase tracking-widest font-semibold">
                {project.subtitle}
              </span>
              <h1 className="text-[28px] md:text-[36px] font-bold text-white tracking-tight leading-tight font-sans">
                {project.title}
              </h1>
            </div>
            
            <p className="text-[15px] md:text-[16px] text-white/85 leading-relaxed font-sans max-w-3xl pt-2">
              {project.intro}
            </p>
          </section>

          {/* Project Specifications Grid (3 Columns) */}
          <section className="border-y border-[#2c2c2c]/40 py-8 my-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[13px] font-mono">
              <div className="space-y-1.5">
                <span className="text-[#9b9b9b]/50 block uppercase tracking-wider text-[10px] font-bold">Timeline / Location</span>
                <span className="text-white font-medium block">{project.timeline}</span>
                <span className="text-[#9b9b9b] text-[12px] block">{project.location}</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[#9b9b9b]/50 block uppercase tracking-wider text-[10px] font-bold">Role / Context</span>
                <span className="text-white font-medium block">{project.role}</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[#9b9b9b]/50 block uppercase tracking-wider text-[10px] font-bold">Project Link</span>
                {project.github ? (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#a3e635] hover:text-[#b8f069] transition font-medium"
                  >
                    <Github size={13} />
                    <span>Ver en GitHub</span>
                    <ArrowUpRight size={12} className="opacity-75" />
                  </a>
                ) : (
                  <a 
                    href={project.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#a3e635] hover:text-[#b8f069] transition font-medium"
                  >
                    <ExternalLink size={13} />
                    <span>Consultar Demo</span>
                    <ArrowUpRight size={12} className="opacity-75" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Project Details and Captures Section */}
          <section className="space-y-16">
            {project.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4 pt-4 first:pt-0">
                <h3 className="text-[18px] md:text-[20px] font-bold text-white tracking-tight font-sans">
                  {sec.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#9b9b9b] leading-relaxed font-sans max-w-3xl">
                  {sec.desc}
                </p>
                <ProjectDetailImage src={sec.image} alt={sec.title} id={id} />
              </div>
            ))}
          </section>

          {/* CTA Footer */}
          <section className="pt-10 border-t border-[#2c2c2c]/40 space-y-4">
            <p className="text-[14px] text-[#9b9b9b] leading-relaxed font-sans max-w-3xl">
              {project.ctaText}
            </p>

            <div className="pt-2">
              <a 
                href={project.ctaHref}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-black bg-[#a3e635] hover:bg-[#b8f069] transition rounded-lg px-5 py-2.5 shadow-md font-sans select-none"
              >
                <span>{project.ctaLabel}</span>
                <ArrowUpRight size={14} className="shrink-0" />
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
