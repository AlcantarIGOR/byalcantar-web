"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "ONYX", href: "/onyx" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080809]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo size={30} />
          <span className="font-mono text-sm tracking-wider text-white/90 group-hover:text-white transition">
            byalcantar
            <span className="text-[#a3e635]">.</span>dev
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-colors ${
                  active
                    ? "text-white bg-white/[0.06] border border-white/[0.08]"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Link href="/contact">
            <Button
              size="sm"
              className="bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full h-9 px-5 text-[13px] font-semibold shadow-[0_0_20px_rgba(163,230,53,0.35)]"
            >
              Hablemos
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080809]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.04] text-sm transition"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="block pt-2">
                <Button className="w-full bg-[#a3e635] text-black hover:bg-[#b8f069] rounded-full">
                  Hablemos
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
