"use client";

/**
 * PhotoStrip component — kept for potential reuse.
 * The main photobox page now uses StripLivePreview + inline generate/download UI.
 * This component is a thin wrapper kept for backward compatibility.
 */

import { Download, RotateCcw, Loader2, Image as ImageIcon } from "lucide-react";

interface PhotoStripSimpleProps {
  stripDataUrl: string | null;
  isGenerating: boolean;
  accentColor: string;
  onGenerate: () => void;
  onReset: () => void;
}

export default function PhotoStrip({
  stripDataUrl,
  isGenerating,
  accentColor,
  onGenerate,
  onReset,
}: PhotoStripSimpleProps) {
  const handleDownload = () => {
    if (!stripDataUrl) return;
    const a = document.createElement("a");
    a.href = stripDataUrl;
    a.download = `photobox-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="space-y-3">
      {!stripDataUrl ? (
        <button
          id="generate-strip-btn"
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {isGenerating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Membuat Strip...</>
          ) : (
            <><ImageIcon className="w-4 h-4" /> Buat Photo Strip!</>
          )}
        </button>
      ) : (
        <div className="space-y-3">
          <div
            className="mx-auto overflow-hidden rounded-2xl shadow-xl border-4 max-w-[240px]"
            style={{ borderColor: accentColor }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={stripDataUrl} alt="Photo Strip" className="w-full" />
          </div>
          <div className="flex gap-2">
            <button
              id="download-btn"
              onClick={handleDownload}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" /> Download PNG
            </button>
            <button
              id="retry-btn"
              onClick={onReset}
              className="px-4 py-3 rounded-xl glass border border-pink-200 text-pink-500 hover:bg-pink-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
