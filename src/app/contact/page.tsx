import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contacto — Juan Alcántar | Hablemos de tu proyecto",
  description: "¿Tienes un proyecto, una idea, o un problema que resolver? Contacta a Juan Alcántar. Disponible para colaboraciones, cotizaciones y preguntas técnicas.",
};

export default function ContactPage() {
  return <ContactContent />;
}
