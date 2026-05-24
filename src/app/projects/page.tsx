import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Proyectos — Juan Alcántar | MoodleSync, ONYX Inc. y más",
  description: "Proyectos reales en producción: MoodleSync (SaaS educativo), ONYX Inc. (IA aplicada para PyMEs), y herramientas de automatización. Todo es código propio, deployado, con usuarios.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
