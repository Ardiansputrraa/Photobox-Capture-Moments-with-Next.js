"use client";

import { useEffect } from "react";
import { RefreshCw, FlipHorizontal } from "lucide-react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isReady: boolean;
  isMirrored: boolean;
  error: string | null;
  filterCss: string;
  onStart: () => void;
  onToggleMirror: () => void;
}

export default function CameraView({
  videoRef,
  isReady,
  isMirrored,
  error,
  filterCss,
  onStart,
  onToggleMirror,
}: CameraViewProps) {
  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-purple-950 shadow-2xl shadow-pink-200/30">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transition-all duration-500"
        style={{
          transform: isMirrored ? "scaleX(-1)" : "scaleX(1)",
          filter: filterCss === "none" ? undefined : filterCss,
        }}
      />

      {/* Overlay: not ready / error */}
      {!isReady && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-purple-900/80 to-pink-900/80">
          <div className="w-12 h-12 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
          <p className="text-white/80 text-sm font-medium">Menyiapkan kamera...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900/90 to-purple-900/90 p-6">
          <div className="text-5xl">📷</div>
          <p className="text-white font-semibold text-center">Tidak dapat mengakses kamera</p>
          <p className="text-white/60 text-sm text-center">{error}</p>
          <button
            onClick={onStart}
            id="camera-retry-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500 text-white text-sm font-medium hover:bg-pink-400 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      )}

      {/* Controls overlay (top-right) */}
      {isReady && (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onToggleMirror}
            id="camera-mirror-btn"
            title="Flip kamera"
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Ready indicator */}
      {isReady && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-xs font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
}
