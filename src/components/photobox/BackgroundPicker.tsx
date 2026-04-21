"use client";

import { BACKGROUNDS, BackgroundId, PaperBackground } from "@/lib/backgrounds";

interface BackgroundPickerProps {
  selected: BackgroundId;
  onChange: (id: BackgroundId) => void;
}

/** Renders the swatch preview for a background option */
function BackgroundSwatch({ bg, size = 32 }: { bg: PaperBackground; size?: number }) {
  const base: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: 8,
    flexShrink: 0,
  };

  if (bg.type === "solid") {
    return <div style={{ ...base, backgroundColor: bg.color }} />;
  }

  if (bg.type === "gradient") {
    return (
      <div
        style={{
          ...base,
          background: `linear-gradient(to bottom, ${bg.gradientStart}, ${bg.gradientEnd})`,
        }}
      />
    );
  }

  // Pattern
  if (bg.patternShape === "dots") {
    return (
      <div style={{ ...base, backgroundColor: bg.patternBase, position: "relative", overflow: "hidden" }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: bg.patternMark,
              left: (i % 3) * 11 + 4,
              top: Math.floor(i / 3) * 11 + 4,
            }}
          />
        ))}
      </div>
    );
  }

  if (bg.patternShape === "stripes") {
    return (
      <div
        style={{
          ...base,
          background: `repeating-linear-gradient(45deg, ${bg.patternMark} 0px, ${bg.patternMark} 3px, ${bg.patternBase} 3px, ${bg.patternBase} 12px)`,
        }}
      />
    );
  }

  if (bg.patternShape === "grid") {
    return (
      <div
        style={{
          ...base,
          backgroundColor: bg.patternBase,
          backgroundImage: `linear-gradient(${bg.patternMark} 1px, transparent 1px), linear-gradient(90deg, ${bg.patternMark} 1px, transparent 1px)`,
          backgroundSize: "10px 10px",
        }}
      />
    );
  }

  // Hearts — rendered via emoji text
  return (
    <div
      style={{
        ...base,
        backgroundColor: bg.patternBase,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        flexWrap: "wrap",
        gap: 1,
        overflow: "hidden",
      }}
    >
      {"💗💗💗💗".split("").map((c, i) => (
        <span key={i} style={{ lineHeight: 1, fontSize: 10 }}>{c}</span>
      ))}
    </div>
  );
}

const GROUPS = [
  { label: "Solid", ids: ["white", "cream", "blush", "lavender", "mint", "sky", "peach"] },
  { label: "Gradient", ids: ["gradient-sunset", "gradient-ocean", "gradient-aurora", "gradient-cotton"] },
  { label: "Pattern", ids: ["pattern-dots", "pattern-stripes", "pattern-grid", "pattern-hearts"] },
] as const;

export default function BackgroundPicker({ selected, onChange }: BackgroundPickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-outfit font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
        Paper Background
      </h3>

      <div className="space-y-3">
        {GROUPS.map((group) => (
          <div key={group.label} className="space-y-1.5">
            <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest pl-0.5">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.ids.map((id) => {
                const bg = BACKGROUNDS.find((b) => b.id === id)!;
                const isSelected = selected === id;
                return (
                  <button
                    key={bg.id}
                    id={`bg-${bg.id}`}
                    onClick={() => onChange(bg.id as BackgroundId)}
                    title={bg.label}
                    className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 transition-all duration-200 group
                      ${isSelected
                        ? "border-pink-400 shadow-md shadow-pink-100 scale-105"
                        : "border-transparent hover:border-pink-200 hover:scale-105"
                      }`}
                  >
                    <BackgroundSwatch bg={bg} size={36} />
                    <span
                      className="text-[9px] font-semibold text-center leading-tight max-w-[40px] truncate text-[var(--text-muted)]"
                    >
                      {bg.label}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center shadow">
                        <span className="text-white text-[8px]">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
