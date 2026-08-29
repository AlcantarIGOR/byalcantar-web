import type { Metadata } from "next";
import ProjectDetailContent from "./ProjectDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: "moodlesync" },
    { id: "onyx-launch" },
    { id: "onyx-pro" },
    { id: "onyx-automation" },
    { id: "onyx-care" },
    { id: "asistente-whatsapp" },
    { id: "onyx-digital-system" },
    { id: "onyx-launch-pro" }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  const titles: Record<string, string> = {
    moodlesync: "MoodleSync — Caso de Estudio | Juan Alcántar",
    "onyx-launch": "ONYX Launch | Tier 1 | Juan Alcántar",
    "onyx-pro": "ONYX Pro | Tier 2 | Juan Alcántar",
    "onyx-automation": "ONYX Automation ⭐ | Tier 3 | Juan Alcántar",
    "onyx-digital-system": "ONYX Automation ⭐ | Tier 3 | Juan Alcántar",
    "onyx-launch-pro": "ONYX Launch & Pro | Juan Alcántar",
    "onyx-care": "ONYX Care | Juan Alcántar",
    "asistente-whatsapp": "Asistente WhatsApp (JARVIS) | Juan Alcántar"
  };

  const descriptions: Record<string, string> = {
    moodlesync: "Caso de estudio de MoodleSync: Agente vertical de organización escolar para estudiantes del ITCG con calendario, organizador de tareas y optimización de documentos.",
    "onyx-launch": "Tier 1 de ONYX Inc: Sitio web profesional (landing) optimizado para dispositivos móviles.",
    "onyx-pro": "Tier 2 de ONYX Inc: Sitio web profesional con flujos de automatización simple en n8n.",
    "onyx-automation": "Tier 3 (Producto Estrella): Sistema operativo digital completo con sitio web, asistente de atención y automatizaciones avanzadas.",
    "onyx-digital-system": "Tier 3 (Producto Estrella): Sistema operativo digital completo con sitio web, asistente de atención y automatizaciones avanzadas.",
    "onyx-launch-pro": "Presencia en internet con página web y alertas automáticas por ONYX Inc.",
    "onyx-care": "Soporte técnico y mantenimiento mensual recurrente para la estabilidad operativa de tu negocio.",
    "asistente-whatsapp": "Asistente personal e híbrido en WhatsApp con Docker, OpenWA Gateway, Node.js y Claude API con enrutamiento tri-state."
  };

  return {
    title: titles[id] || "Proyecto | Juan Alcántar",
    description: descriptions[id] || "Detalles del proyecto en el portafolio de Juan Alcántar."
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  return <ProjectDetailContent id={id} />;
}
