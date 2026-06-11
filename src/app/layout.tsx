import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, DM_Mono, Playfair_Display } from "next/font/google";
import PageLoader from "@/components/PageLoader";
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

export const viewport: Viewport = {
  themeColor: "#080809",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://byalcantar.me"),
  title: {
    default: "Juan Alcántar — AI Engineering Student & Founder de ONYX Inc.",
    template: "%s | byalcantar.me",
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Juan Alcántar — AI Engineering Student & Founder",
    description:
      "Construyendo desde Jalisco — IA, automatización y herramientas para el siguiente nivel.",
    url: "https://byalcantar.me",
    siteName: "byalcantar.me",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Juan Alcántar — AI Engineering Student & Founder de ONYX Inc.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Alcántar — AI Engineering Student & Founder",
    description: "Construyendo desde Jalisco — IA, automatización y herramientas.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable}`}>
        <PageLoader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
