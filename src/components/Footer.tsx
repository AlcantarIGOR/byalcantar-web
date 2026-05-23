import Link from "next/link";
import { Github, Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/40 pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a3e635]/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={32} />
              <span className="font-mono text-sm tracking-wider text-white">
                byalcantar<span className="text-[#a3e635]">.</span>dev
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Construyendo desde Jalisco — IA, automatización y herramientas para el siguiente nivel.
            </p>
            <p className="text-white/30 text-xs mt-6 font-mono tracking-wider">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" />
              BUILDING IN PUBLIC · 2026
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase mb-4">
              Navegación
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { l: "Home", h: "/" },
                { l: "About", h: "/about" },
                { l: "Projects", h: "/projects" },
                { l: "ONYX Inc.", h: "/onyx" },
                { l: "Contact", h: "/contact" },
              ].map((x) => (
                <li key={x.h}>
                  <Link href={x.h} className="text-white/60 hover:text-white transition-colors">
                    {x.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase mb-4">
              Proyectos
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://moodlesync.onyxinc.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-[#a3e635] transition-colors"
                >
                  MoodleSync →
                </a>
              </li>
              <li>
                <a
                  href="https://onyxinc.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-[#a3e635] transition-colors"
                >
                  ONYX Inc. →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase mb-4">
              Redes
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="https://github.com/AlcantarIGOR"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.instagram.com/byalcantar.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Instagram size={15} /> Instagram
              </a>
              <a
                href="mailto:founder@onyxinc.dev"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail size={15} /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.05]">
          <p className="text-white/35 text-xs font-mono">
            © 2026 Juan Alcántar — Hecho con cafe ☕ en Ciudad Guzmán
          </p>
          <p className="text-white/30 text-xs font-mono tracking-wider">
            v2.0 · POWERED BY ONYX INC.
          </p>
        </div>
      </div>
    </footer>
  );
}
