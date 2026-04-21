"use client";

interface CountdownOverlayProps {
  count: number | null;
  isActive: boolean;
}

export default function CountdownOverlay({ count, isActive }: CountdownOverlayProps) {
  if (!isActive || count === null) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
      <div key={count} className="animate-countdown">
        <div className="relative">
          {/* Ring pulse */}
          <div
            className="absolute inset-0 rounded-full border-4 border-pink-400 animate-ping"
            style={{ animationDuration: "0.8s" }}
          />
          {/* Count circle */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-pink-500/50">
            <span className="font-outfit font-black text-6xl text-white drop-shadow-lg">
              {count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
