"use client";

import { Camera } from "lucide-react";

interface ShutterButtonProps {
  onClick: () => void;
  disabled: boolean;
  currentCount: number;
  totalCount: number;
  isCountingDown: boolean;
  label?: string;
}

export default function ShutterButton({
  onClick,
  disabled,
  currentCount,
  totalCount,
  isCountingDown,
  label,
}: ShutterButtonProps) {
  const progress = totalCount > 0 ? (currentCount / totalCount) * 100 : 0;
  const circumference = 2 * Math.PI * 28; // r=28

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {/* SVG progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle
            cx="36" cy="36" r="28"
            fill="none"
            stroke="#f3e8ff"
            strokeWidth="4"
          />
          {currentCount > 0 && (
            <circle
              cx="36" cy="36" r="28"
              fill="none"
              stroke="#f472b6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * progress) / 100}
              className="transition-all duration-300"
            />
          )}
        </svg>

        {/* Shutter button */}
        <button
          id="shutter-btn"
          onClick={onClick}
          disabled={disabled}
          className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-200 group
            ${disabled
              ? "bg-slate-200 cursor-not-allowed opacity-60"
              : "bg-gradient-to-br from-pink-500 to-violet-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-300/60 active:scale-95 shadow-lg shadow-pink-200"
            }`}
        >
          {isCountingDown ? (
            <div className="w-6 h-6 rounded-full border-3 border-white border-t-transparent animate-spin" />
          ) : (
            <Camera className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1.5">
          {Array.from({ length: totalCount }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentCount
                  ? "bg-pink-500 scale-110"
                  : "bg-pink-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)] font-medium">
          {label ?? (currentCount < totalCount
            ? `Foto ${currentCount + 1} dari ${totalCount}`
            : "Semua foto diambil!")}
        </p>
      </div>
    </div>
  );
}
