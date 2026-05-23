"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <motion.div
      style={{ y, opacity }}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
    >
      <div
        className="absolute inset-0 bg-grid"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)",
        }}
      />
      <div className="absolute top-[15%] right-[-10%] w-[600px] h-[600px] bg-[#a3e635]/[0.08] rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#a3e635]/[0.05] rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(163,230,53,0.05),transparent_55%)]" />
    </motion.div>
  );
}

export function AmbientGlow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-[#a3e635]/[0.04] rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 bg-[#a3e635]/[0.04] rounded-full blur-3xl" />
    </div>
  );
}
