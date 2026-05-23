export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg font-mono font-medium relative overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, rgba(163,230,53,0.18), rgba(163,230,53,0.04))",
        border: "1px solid rgba(163,230,53,0.35)",
        boxShadow: "0 0 16px rgba(163,230,53,0.25), inset 0 0 8px rgba(163,230,53,0.12)",
        color: "#c4f060",
        fontSize: size * 0.46,
        letterSpacing: "-0.02em",
      }}
    >
      <span style={{ position: "relative", zIndex: 2 }}>A/</span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(163,230,53,0.35), transparent 60%)",
        }}
      />
    </div>
  );
}
