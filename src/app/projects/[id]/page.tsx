import type { Metadata } from "next";
import ProjectDetailContent from "./ProjectDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: "moodlesync" },
    { id: "onyx-digital-system" },
    { id: "onyx-launch-pro" },
    { id: "onyx-care" }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  const titles: Record<string, string> = {
    moodlesync: "MoodleSync — Caso de Estudio | Juan Alcántar",
    "onyx-digital-system": "ONYX Digital System | Juan Alcántar",
    "onyx-launch-pro": "ONYX Launch / Pro | Juan Alcántar",
    "onyx-care": "ONYX Care | Juan Alcántar"
  };

  const descriptions: Record<string, string> = {
    moodlesync: "Caso de estudio de MoodleSync: Herramienta de organización escolar para estudiantes del ITCG con calendario, organizador de tareas y optimización de documentos.",
    "onyx-digital-system": "Digitalización completa para negocios locales por ONYX Inc. Sitio web profesional con atención y recordatorios automáticos.",
    "onyx-launch-pro": "Presencia en internet con página web y alertas automáticas directas a tu celular por ONYX Inc.",
    "onyx-care": "Soporte técnico y mantenimiento mensual para el correcto funcionamiento diario de las herramientas de tu negocio por ONYX Inc."
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
