import type { Metadata } from "next";
import MetaStampContent from "./MetaStampContent";

export const metadata: Metadata = {
  title: "Meta Stamp Studio — Inyector de Metadatos Ray-Ban Meta | Juan Alcántar",
  description:
    "Herramienta gratuita y 100% en el navegador para inyectar metadatos oficiales de Ray-Ban Meta en fotos y videos, activando Spin View y etiquetas oficiales en Instagram.",
  openGraph: {
    title: "Meta Stamp Studio — Juan Alcántar",
    description:
      "Inyecta metadatos de Ray-Ban Meta en fotos y videos para activar Spin View en Instagram. Procesamiento 100% privado en tu navegador.",
  },
};

export default function MetaStampPage() {
  return <MetaStampContent />;
}
