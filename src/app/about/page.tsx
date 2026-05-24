import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Sobre Mí — Juan Alcántar | AI Engineering & Founder",
  description: "Conoce a Juan Alcántar: estudiante de Ingeniería en IA en el ITCG Ciudad Guzmán, fundador de ONYX Inc. y creador de MoodleSync. Desde Jalisco, construyendo con propósito.",
};

export default function AboutPage() {
  return <AboutContent />;
}
