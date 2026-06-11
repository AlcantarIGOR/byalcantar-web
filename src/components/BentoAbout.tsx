"use client";

import { motion } from "framer-motion";

export default function BentoAbout() {
  const cards = [
    // Row 1
    {
      type: "image",
      src: "/yotuberos.jpg",
      alt: "Creadores de Contenido en boda"
    },
    {
      type: "text",
      title: '"Después de una gran batalla siempre queda un lugar donde crece la bondad y la felicidad"',
      subtitle: "— Vegetta777",
      body: "Una de mis frases favoritas. Refleja cómo después de cualquier esfuerzo o dificultad en la vida, siempre hay espacio para construir algo mejor."
    },
    {
      type: "text",
      title: '"Ojalá hacerme mayor" fue la cosa más tonta que he dicho nunca.',
      subtitle: "— Juan Alcántar",
      body: "Crecer viene con responsabilidades, pero mi meta es nunca perder la curiosidad y el entusiasmo que tenía cuando era niño."
    },
    // Row 2
    {
      type: "text",
      title: '"No llores porque terminó... sonríe porque sucedió"',
      subtitle: "— Unknown",
      body: "Hay momentos y etapas de tu vida que jamás duran para siempre. Y aun así, cambian quién eres. Y es que sí, a veces lo triste no es que algo termine, es que nunca hubiera ocurrido."
    },
    {
      type: "image",
      src: "/family.png",
      alt: "Juan Vintage Family Photo"
    },
    {
      type: "text",
      title: "¿Cómo se siente ser un hermano mayor?",
      subtitle: "— Papá",
      body: "Claro, ser el mayor me enseñó disciplina y liderazgo, pero lo más importante es que me enseñó a escuchar y a encontrar tiempo para las tonterías."
    },
    // Row 3
    {
      type: "text",
      title: '"Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito."',
      subtitle: "— Aristóteles",
      body: "La disciplina diaria y el esfuerzo constante definen la calidad de lo que construyo. No se trata de destellos de inspiración, sino del hábito de buscar la perfección en cada detalle."
    },
    {
      type: "text",
      title: '"Ser malo en algo es el primer paso para ser más o menos bueno en algo."',
      subtitle: "— Jake el perro",
      body: "Si al principio no lo consigues, inténtalo de nuevo, no sé, él tenía razón."
    },
    {
      type: "image",
      src: "/jake.png",
      alt: "Jake the Dog"
    }
  ];

  return (
    <div className="space-y-0.5 select-none overflow-hidden rounded-2xl border border-[#2c2c2c]">
      
      {/* 1. Running Marquee Banner */}
      <div className="bg-black py-3 border-b border-[#2c2c2c] overflow-hidden relative w-full">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-inner {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
        `}</style>
        <div className="marquee-inner flex gap-8 whitespace-nowrap">
          {Array(8).fill("Sobre mí").map((text, idx) => (
            <span 
              key={idx} 
              className="text-[#a3e635] font-serif italic font-bold text-[18px] tracking-wide"
            >
              {text}
            </span>
          ))}
          {/* Duplicate for seamless infinite loop */}
          {Array(8).fill("Sobre mí").map((text, idx) => (
            <span 
              key={`dup-${idx}`} 
              className="text-[#a3e635] font-serif italic font-bold text-[18px] tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Grid Container (3 columns layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#2c2c2c]">
        {cards.map((card, idx) => {
          if (card.type === "image") {
            return (
              <div 
                key={idx} 
                className="w-full relative bg-[#191919] overflow-hidden group min-h-[300px] md:min-h-[320px] flex h-full"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] filter brightness-90 contrast-[1.05]"
                />
              </div>
            );
          }

          return (
            <div 
              key={idx} 
              className="w-full bg-[#a3e635] p-6 md:p-8 flex flex-col justify-between text-black min-h-[300px] md:min-h-[320px] h-full"
            >
              <div className="space-y-3">
                <h3 className="font-serif font-bold italic text-[17px] md:text-[19px] leading-snug tracking-tight">
                  {card.title}
                </h3>
                <span className="font-sans text-[11px] font-bold text-black/60 uppercase tracking-wider block">
                  {card.subtitle}
                </span>
              </div>
              <p className="font-sans text-[12.5px] md:text-[13px] font-medium leading-relaxed text-black/80 mt-auto pt-4">
                {card.body}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}