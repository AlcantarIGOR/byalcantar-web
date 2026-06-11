"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GithubContributions() {
  const [weeks, setWeeks] = useState<number[][]>([]);

  useEffect(() => {
    // Generate a deterministic activity pattern representing 1,636 contributions
    const tempWeeks = [];
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        // Deterministic pseudo-random levels
        const index = w * 7 + d;
        let level = 0;

        // Custom waves of activity
        const sinVal = Math.sin(index * 0.05) * Math.cos(index * 0.02);
        
        if (sinVal > 0.6) {
          level = index % 3 === 0 ? 4 : 3;
        } else if (sinVal > 0.2) {
          level = index % 2 === 0 ? 2 : 1;
        } else if (sinVal > -0.2) {
          level = index % 4 === 0 ? 1 : 0;
        } else {
          level = 0;
        }

        // Boost activity representing April (weeks 40-44) and May/June (weeks 48-52)
        if ((w >= 40 && w <= 44) || w >= 47) {
          const rand = (index * 17) % 10;
          if (rand > 1) {
            level = Math.max(level, (index % 3) + 2); // Levels 2, 3, 4
          }
        }

        days.push(level);
      }
      tempWeeks.push(days);
    }
    setWeeks(tempWeeks);
  }, []);

  const months = [
    { label: "Jun", span: 4 },
    { label: "Jul", span: 4 },
    { label: "Agosto", span: 5 },
    { label: "Sep", span: 4 },
    { label: "Oct", span: 4 },
    { label: "Nov", span: 4 },
    { label: "Dic", span: 5 },
    { label: "Jan", span: 4 },
    { label: "Febrero", span: 4 },
    { label: "Mar", span: 4 },
    { label: "Abr", span: 4 },
    { label: "Mayo", span: 4 }
  ];

  const levelColors = [
    "bg-[#222222]/40 border border-white/5", // Level 0 (no contributions)
    "bg-[#1c3d10]", // Level 1
    "bg-[#006d21]", // Level 2
    "bg-[#26a641]", // Level 3
    "bg-[#a3e635]"  // Level 4 (our green accent!)
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#9b9b9b]/60 font-semibold">
        Contribuciones de GitHub
      </h2>

      <div className="border border-[#2c2c2c] rounded-xl p-5 bg-[#1e1e1e]/40 space-y-4 select-none">
        
        {/* Scrollable calendar view */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#2c2c2c]">
          <div className="min-w-[620px] space-y-2.5">
            
            {/* Months Header */}
            <div className="flex text-[11px] font-mono text-[#9b9b9b] pl-1">
              {months.map((m, idx) => (
                <div 
                  key={idx} 
                  style={{ width: `${(m.span / 52) * 100}%` }}
                  className="text-left font-medium"
                >
                  {m.label}
                </div>
              ))}
            </div>

            {/* Grid Container (7 rows x 52 columns) */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3.5px]">
              {weeks.map((week, wIdx) => 
                week.map((level, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    className={`w-[9px] h-[9px] rounded-[1.5px] transition-colors duration-300 hover:ring-1 hover:ring-[#a3e635] ${levelColors[level]}`}
                    title={`${level} contribuciones`}
                  />
                ))
              )}
            </div>

          </div>
        </div>

        {/* Legend / Stats Footer */}
        <div className="flex items-center justify-between text-[11px] font-sans pt-1 border-t border-[#2c2c2c]/30 text-[#9b9b9b]">
          <div>
            <a 
              href="https://github.com/AlcantarIGOR" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#f7facf] hover:text-white underline underline-offset-4 decoration-[#9b9b9b] hover:decoration-white transition"
            >
              1,636 contribuciones
            </a>
            {" "}en GitHub.
          </div>
          
          <div className="flex items-center gap-1.5 font-sans">
            <span>Menos</span>
            <div className="flex gap-[3.5px]">
              {levelColors.map((color, idx) => (
                <div key={idx} className={`w-[9px] h-[9px] rounded-[1.5px] ${color}`} />
              ))}
            </div>
            <span>Más</span>
          </div>
        </div>

      </div>
    </div>
  );
}
