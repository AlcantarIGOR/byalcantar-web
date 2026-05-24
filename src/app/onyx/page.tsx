import type { Metadata } from "next";
import OnyxContent from "./OnyxContent";

export const metadata: Metadata = {
  title: "ONYX Inc. — IA Aplicada para PyMEs | Fundada por Juan Alcántar",
  description: "ONYX Inc. entrega soluciones digitales con IA real a negocios locales en Jalisco: sitios web, bots de WhatsApp, automatizaciones y asistentes de negocio. Servicio gestionado desde Ciudad Guzmán.",
};

export default function OnyxPage() {
  return <OnyxContent />;
}
