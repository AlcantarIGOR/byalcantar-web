"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [step, setStep] = useState(0); // 0: No parpadees..., 1: 3, 2: 2, 3: 1, 4: complete

  useEffect(() => {
    // Disable body scrolling during load
    document.body.classList.add("loading-active");

    const t0 = setTimeout(() => setStep(1), 1200); // "No parpadees..." duration
    const t1 = setTimeout(() => setStep(2), 1800); // "3" duration
    const t2 = setTimeout(() => setStep(3), 2400); // "2" duration
    const t3 = setTimeout(() => setStep(4), 3000); // "1" duration
    const t4 = setTimeout(() => {
      document.body.classList.remove("loading-active");
    }, 3600); // duration of the slide-up animation

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.classList.remove("loading-active");
    };
  }, []);

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.h1
            key="blink"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-serif text-2xl md:text-3xl text-neutral-300 italic font-medium tracking-wide"
          >
            No parpadees...
          </motion.h1>
        );
      case 1:
        return (
          <motion.span
            key="3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="font-serif text-5xl md:text-6xl text-neutral-300 font-bold"
          >
            3
          </motion.span>
        );
      case 2:
        return (
          <motion.span
            key="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="font-serif text-5xl md:text-6xl text-neutral-300 font-bold"
          >
            2
          </motion.span>
        );
      case 3:
        return (
          <motion.span
            key="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="font-serif text-5xl md:text-6xl text-neutral-300 font-bold"
          >
            1
          </motion.span>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step < 4 && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-[#030303] z-[99999] flex items-center justify-center pointer-events-auto"
        >
          <AnimatePresence mode="wait">
            {getStepContent()}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
