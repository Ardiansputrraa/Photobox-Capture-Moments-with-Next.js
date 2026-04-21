"use client";

import { FRAMES, FrameId } from "@/lib/frames";

interface FramePickerProps {
  selected: FrameId;
  onChange: (id: FrameId) => void;
}

export default function FramePicker({ selected, onChange }: FramePickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-outfit font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
        Frame Style
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {FRAMES.map((f) => {
          const isSelected = selected === f.id;
          return (
            <button
              key={f.id}
              id={`frame-${f.id}`}
              onClick={() => onChange(f.id)}
              className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all duration-200
                ${isSelected
                  ? "border-pink-400 shadow-md shadow-pink-100"
                  : "border-transparent hover:border-pink-200"
                }`}
              style={{
                backgroundColor: isSelected ? f.paperColor : "#f9f9f9",
              }}
            >
              {/* Mini strip preview */}
              <div
                className="w-8 h-10 rounded-lg flex flex-col overflow-hidden border"
                style={{
                  backgroundColor: f.paperColor,
                  borderColor: f.accentColor,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex-1 m-0.5 rounded-sm"
                    style={{ backgroundColor: f.accentColor, opacity: 0.6 }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: f.textColor }}>
                {f.label}
              </span>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-[8px]">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
