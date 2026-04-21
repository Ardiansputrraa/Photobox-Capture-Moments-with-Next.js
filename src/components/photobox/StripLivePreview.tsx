"use client";

import { PhotoFrame } from "@/lib/frames";
import { PhotoFilter } from "@/lib/filters";
import { GridTemplate } from "@/lib/templates";

interface StripLivePreviewProps {
  photos: string[];
  template: GridTemplate;
  frame: PhotoFrame;
  filter: PhotoFilter;
}

/** Real-time HTML/CSS approximation of the final photo strip. */
export default function StripLivePreview({
  photos,
  template,
  frame,
  filter,
}: StripLivePreviewProps) {
  const { cols, rows, cells } = template.layout;

  const getPaperStyle = (): React.CSSProperties => {
    if (frame.paperStyle === "gradient" && frame.paperColorEnd) {
      return { background: `linear-gradient(to bottom, ${frame.paperColor}, ${frame.paperColorEnd})` };
    }
    if (frame.paperStyle === "filmstrip") {
      return { background: "#111111" };
    }
    return { backgroundColor: frame.paperColor };
  };

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      {/* Strip container */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          ...getPaperStyle(),
          paddingTop: frame.paperStyle === "airmail" ? "18px" : "12px",
          paddingLeft: frame.paperStyle === "airmail" ? "18px" : "12px",
          paddingRight: frame.paperStyle === "airmail" ? "18px" : "12px",
          paddingBottom: "28px",
          border: `3px solid ${frame.accentColor}`,
        }}
      >
        {/* Airmail border */}
        {frame.paperStyle === "airmail" && (
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                #c0392b 0px, #c0392b 5px,
                #2c6fad 5px, #2c6fad 10px,
                transparent 10px, transparent 18px
              )`,
              WebkitMaskImage: `
                linear-gradient(#000 16px, transparent 16px),
                linear-gradient(to bottom, #000 16px, transparent 16px),
                linear-gradient(to right, #000 16px, transparent 16px),
                linear-gradient(to left, #000 16px, transparent 16px)
              `,
              maskComposite: "exclude",
            }}
          />
        )}

        {/* Grid pattern */}
        {frame.paperStyle === "grid" && (
          <div
            className="absolute inset-0 pointer-events-none rounded-xl opacity-40"
            style={{
              backgroundImage: `linear-gradient(${frame.gridColor ?? frame.accentColor} 1px, transparent 1px),
                linear-gradient(90deg, ${frame.gridColor ?? frame.accentColor} 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />
        )}

        {/* Filmstrip side tracks */}
        {frame.paperStyle === "filmstrip" && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-5 bg-black flex flex-col justify-around items-center py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-5 bg-black flex flex-col justify-around items-center py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              ))}
            </div>
          </>
        )}

        {/* Header text */}
        {frame.headerText && (
          <p
            className="relative z-10 text-center text-xs font-bold mb-2 opacity-80"
            style={{ color: frame.textColor, fontFamily: "Outfit, sans-serif" }}
          >
            {frame.headerText}
          </p>
        )}

        {/* Photo grid */}
        <div
          className="relative z-10 grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, auto)`,
            paddingLeft: frame.paperStyle === "filmstrip" ? "20px" : "0",
            paddingRight: frame.paperStyle === "filmstrip" ? "20px" : "0",
          }}
        >
          {cells.map((cell, i) => {
            const photo = photos[i];
            return (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
                style={{
                  gridColumn: `${cell.col} / span ${cell.colSpan}`,
                  gridRow: `${cell.row} / span ${cell.rowSpan}`,
                  aspectRatio: cell.colSpan === cell.rowSpan ? "1" : cell.colSpan > cell.rowSpan ? "4/3" : "3/4",
                  border: `2px solid ${frame.accentColor}`,
                  minHeight: "60px",
                }}
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      filter: filter.cssFilter === "none" ? undefined : filter.cssFilter,
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundColor: frame.paperStyle === "filmstrip" ? "#222" : `${frame.accentColor}30`,
                      minHeight: "60px",
                    }}
                  >
                    <span className="text-lg opacity-30">📷</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stickers */}
        {frame.stickers.length > 0 && (
          <div className="relative z-10 flex justify-center gap-1 mt-2 text-base">
            {frame.stickers.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        )}

        {/* Watermark */}
        {frame.id !== "none" && (
          <p
            className="relative z-10 text-center text-[9px] font-semibold mt-1 opacity-60"
            style={{ color: frame.textColor }}
          >
            ✨ PhotoBox ✨
          </p>
        )}
      </div>
    </div>
  );
}
