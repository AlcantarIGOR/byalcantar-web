import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Juan Alcántar — AI Engineering Student & Founder de ONYX Inc.",
  description:
    "Construyendo desde Jalisco — IA, automatización y herramientas para el siguiente nivel. Portafolio personal de Juan Alcántar (@byalcantar), fundador de ONYX Inc.",
  keywords: [
    "Juan Alcántar",
    "byalcantar",
    "ONYX Inc.",
    "IA",
    "AI Engineering",
    "MoodleSync",
    "Automatización",
    "Ciudad Guzmán",
    "Jalisco",
    "n8n",
    "Next.js",
  ],
  openGraph: {
    title: "Juan Alcántar — AI Engineering Student & Founder",
    description:
      "Construyendo desde Jalisco — IA, automatización y herramientas para el siguiente nivel.",
    url: "https://byalcantar.dev",
    siteName: "byalcantar.dev",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Alcántar — AI Engineering Student & Founder",
    description: "Construyendo desde Jalisco — IA, automatización y herramientas.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
