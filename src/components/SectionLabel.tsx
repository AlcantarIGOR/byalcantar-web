export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px bg-[#a3e635]" />
      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#a3e635]">
        {children}
      </span>
    </div>
  );
}
