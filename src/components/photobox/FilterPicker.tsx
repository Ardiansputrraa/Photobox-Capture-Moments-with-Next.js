"use client";

import { FILTERS, FilterId } from "@/lib/filters";

interface FilterPickerProps {
  selected: FilterId;
  onChange: (id: FilterId) => void;
  samplePhotoUrl?: string;
}

export default function FilterPicker({ selected, onChange, samplePhotoUrl }: FilterPickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-outfit font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
        Filter
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map((f) => {
          const isSelected = selected === f.id;
          return (
            <button
              key={f.id}
              id={`filter-${f.id}`}
              onClick={() => onChange(f.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 transition-all duration-200`}
            >
              {/* Filter preview chip */}
              <div
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected
                    ? "border-pink-400 scale-110 shadow-md shadow-pink-200"
                    : "border-transparent hover:border-pink-200 hover:scale-105"
                }`}
              >
                {samplePhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={samplePhotoUrl}
                    alt={f.label}
                    className="w-full h-full object-cover"
                    style={{ filter: f.cssFilter === "none" ? undefined : f.cssFilter }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${f.color}33, ${f.color}88)`,
                      filter: f.cssFilter === "none" ? undefined : f.cssFilter,
                    }}
                  >
                    {f.emoji}
                  </div>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isSelected ? "text-pink-500" : "text-[var(--text-muted)]"
                }`}
              >
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
