"use client";

import { FRAMES, FrameId, PhotoFrame } from "@/lib/frames";

interface ThemePickerProps {
  selected: FrameId;
  onChange: (id: FrameId) => void;
}

/** Mini CSS preview swatch for a frame theme */
function ThemeSwatch({ frame }: { frame: PhotoFrame }) {
  const getBackground = () => {
    if (frame.paperStyle === "gradient" && frame.paperColorEnd) {
      return `linear-gradient(to bottom, ${frame.paperColor}, ${frame.paperColorEnd})`;
    }
    if (frame.paperStyle === "grid") {
      return frame.paperColor;
    }
    if (frame.paperStyle === "filmstrip") {
      return "#111111";
    }
    return frame.paperColor;
  };

  return (
    <div
      className="relative w-full h-24 rounded-xl overflow-hidden border-2 flex flex-col"
      style={{ background: getBackground(), borderColor: frame.accentColor }}
    >
      {/* Airmail border simulation */}
      {frame.paperStyle === "airmail" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                #c0392b 0px, #c0392b 4px,
                #2c6fad 4px, #2c6fad 8px,
                transparent 8px, transparent 14px
              )`,
              WebkitMaskImage:
                "linear-gradient(#000 8px, transparent 8px), linear-gradient(to bottom, #000 8px, transparent 8px), linear-gradient(to right, #000 8px, transparent 8px), linear-gradient(to left, #000 8px, transparent 8px)",
              maskComposite: "exclude",
            }}
          />
          <div
            className="absolute inset-2 pointer-events-none border"
            style={{ borderColor: frame.accentColor, opacity: 0.3 }}
          />
        </>
      )}

      {/* Grid lines simulation */}
      {frame.paperStyle === "grid" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(${frame.gridColor ?? frame.accentColor} 1px, transparent 1px),
              linear-gradient(90deg, ${frame.gridColor ?? frame.accentColor} 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />
      )}

      {/* Filmstrip sprocket holes */}
      {frame.paperStyle === "filmstrip" && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-black flex flex-col justify-around items-center py-1 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-700" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-black flex flex-col justify-around items-center py-1 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-700" />
            ))}
          </div>
        </>
      )}

      {/* Photo slot placeholders */}
      <div className="absolute inset-x-4 inset-y-2 flex flex-col gap-1">
        {frame.paperStyle === "filmstrip"
          ? [0, 1].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-sm opacity-30"
                style={{ backgroundColor: "#555555" }}
              />
            ))
          : [0, 1].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-sm opacity-20"
                style={{ backgroundColor: frame.accentColor }}
              />
            ))}
      </div>

      {/* Header text */}
      {frame.headerText && (
        <div
          className="absolute top-1 left-0 right-0 text-center text-[8px] font-bold px-2 truncate"
          style={{ color: frame.textColor }}
        >
          {frame.headerText}
        </div>
      )}

      {/* Bottom stickers preview */}
      {frame.stickers.length > 0 && (
        <div className="absolute bottom-0.5 left-0 right-0 flex justify-center gap-0.5 text-[9px]">
          {frame.stickers.slice(0, 3).map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

const THEMED = ["filmstrip", "postcard", "hello", "traveling"] as const;
const CLASSIC = ["none", "pastel", "retro", "minimal", "floral", "y2k"] as const;

export default function ThemePicker({ selected, onChange }: ThemePickerProps) {
  const renderGroup = (ids: readonly string[], title: string) => (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
        {title}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {ids.map((id) => {
          const frame = FRAMES.find((f) => f.id === id)!;
          const isSelected = selected === id;
          return (
            <button
              key={id}
              id={`theme-${id}`}
              onClick={() => onChange(id as FrameId)}
              className={`relative flex flex-col items-center gap-1.5 p-1.5 rounded-xl border-2 transition-all duration-200 hover:scale-105
                ${isSelected
                  ? "border-pink-400 shadow-lg shadow-pink-100 scale-105"
                  : "border-transparent hover:border-pink-200"
                }`}
            >
              <ThemeSwatch frame={frame} />
              <span className="text-[10px] font-semibold text-center leading-tight truncate w-full text-[var(--text-muted)]">
                {frame.emoji} {frame.label}
              </span>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 shadow flex items-center justify-center z-10">
                  <span className="text-white text-[8px]">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="font-outfit font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
        Frame & Theme
      </h3>
      {renderGroup(THEMED, "✨ Themed")}
      <hr className="border-pink-100" />
      {renderGroup(CLASSIC, "Classic")}
    </div>
  );
}
