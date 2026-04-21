"use client";

import { GRID_TEMPLATES, GridTemplate, GridId } from "@/lib/templates";

interface TemplatePickerProps {
  selected: GridId;
  onChange: (id: GridId) => void;
}

function TemplatePreview({ template }: { template: GridTemplate }) {
  const { cols, rows, cells } = template.layout;

  return (
    <div
      className="w-full aspect-square p-1.5"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "3px",
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className="rounded-sm bg-current opacity-70"
          style={{
            gridColumn: `${cell.col} / span ${cell.colSpan}`,
            gridRow: `${cell.row} / span ${cell.rowSpan}`,
          }}
        />
      ))}
    </div>
  );
}

export default function TemplatePicker({ selected, onChange }: TemplatePickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-outfit font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
        Grid Template
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {GRID_TEMPLATES.map((t) => {
          const isSelected = selected === t.id;
          return (
            <button
              key={t.id}
              id={`template-${t.id}`}
              onClick={() => onChange(t.id)}
              title={`${t.label} — ${t.description}`}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all duration-200 group
                ${isSelected
                  ? "border-pink-400 bg-pink-50 text-pink-500 shadow-md shadow-pink-100"
                  : "border-transparent bg-white/60 text-slate-400 hover:border-pink-200 hover:bg-pink-50/50 hover:text-pink-400"
                }`}
            >
              <div className="w-10 h-10">
                <TemplatePreview template={t} />
              </div>
              <span className="text-[10px] font-semibold truncate w-full text-center leading-tight">
                {t.label}
              </span>
              <span className="text-[10px] opacity-60">
                {t.emoji}
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
