"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function InteractiveAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device supports hover / is mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Motion values for tracking cursor offset relative to center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to interpolate coordinates and avoid jitter
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Map coordinate values to 3D rotation angles (up to 15 degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  // Translate / lift effect for the image to create depth (parallax)
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-0.5 to 0.5) from the center of the avatar
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Smoothly spring back to center position
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-56 h-56 md:w-64 md:h-64 cursor-pointer select-none rounded-full flex items-center justify-center"
        style={{ perspective: 1000 }}
      >
        {/* Glow Background Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: hovered ? 1.15 : 1.0,
            opacity: hovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Outer Circular border frame with rotating 3D effect */}
        <motion.div
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={
            isMobile
              ? {
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={
            isMobile
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {}
          }
          className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/10 bg-gradient-to-b from-[#141414] to-[#0a0a0c] flex items-center justify-center overflow-hidden shadow-2xl"
        >
          {/* Inner retro green grid overlay */}
          <div
            className="absolute inset-0 opacity-15 rounded-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(163,230,53,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.1) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Glowing dot in center background */}
          <div className="absolute w-24 h-24 rounded-full bg-[#a3e635]/10 filter blur-xl" />

          {/* Interactive Memoji Avatar Image with Parallax Depth */}
          <motion.div
            style={{
              x: isMobile ? 0 : translateX,
              y: isMobile ? 0 : translateY,
              transformStyle: "preserve-3d",
            }}
            animate={
              !isMobile
                ? {
                    y: hovered ? -4 : [0, -3, 0],
                  }
                : {}
            }
            transition={
              !isMobile && !hovered
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
            className="relative w-36 h-36 md:w-44 md:h-44 z-10"
          >
            <Image
              src="/avatar_juan.png"
              alt="Juan Alcántar Apple Memoji"
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(163,230,53,0.25)]"
              priority
            />
          </motion.div>

          {/* Glossy overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}