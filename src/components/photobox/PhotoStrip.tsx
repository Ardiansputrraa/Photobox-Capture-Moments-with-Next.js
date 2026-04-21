"use client";

import { Download, RotateCcw, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { GridTemplate } from "@/lib/templates";
import { PhotoFrame } from "@/lib/frames";
import { PhotoFilter } from "@/lib/filters";
import { PaperBackground } from "@/lib/backgrounds";

interface PhotoStripProps {
  photos: string[];
  stripDataUrl: string | null;
  template: GridTemplate;
  frame: PhotoFrame;
  filter: PhotoFilter;
  background: PaperBackground;
  isGenerating: boolean;
  onGenerate: () => void;
  onReset: () => void;
  onRemovePhoto: (index: number) => void;
}

export default function PhotoStrip({
  photos,
  stripDataUrl,
  template,
  frame,
  filter,
  background,
  isGenerating,
  onGenerate,
  onReset,
  onRemovePhoto,
}: PhotoStripProps) {
  const isComplete = photos.length >= template.photoCount;

  const handleDownload = () => {
    if (!stripDataUrl) return;
    const a = document.createElement("a");
    a.href = stripDataUrl;
    a.download = `photobox-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Thumbnail grid of captured photos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-outfit font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
            Foto Diambil ({photos.length}/{template.photoCount})
          </h3>
          {photos.length > 0 && (
            <button
              onClick={onReset}
              id="reset-btn"
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Ulang Semua
            </button>
          )}
        </div>

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${Math.min(template.layout.cols * template.photoCount, 4)}, 1fr)`,
          }}
        >
          {/* Captured photos */}
          {photos.map((photo, i) => (
            <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border-2 border-pink-200 bg-pink-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ filter: filter.cssFilter === "none" ? undefined : filter.cssFilter }}
              />
              <button
                onClick={() => onRemovePhoto(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{i + 1}</span>
              </div>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: template.photoCount - photos.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-video rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/50 flex items-center justify-center"
            >
              <ImageIcon className="w-5 h-5 text-pink-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Generate / Download */}
      {isComplete && (
        <div className="space-y-3">
          {!stripDataUrl ? (
            <button
              id="generate-strip-btn"
              onClick={onGenerate}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Membuat Strip...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  Buat Photo Strip!
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              {/* Strip preview */}
              <div
                className="relative mx-auto overflow-hidden rounded-2xl shadow-xl shadow-pink-200/50 border-4"
                style={{
                  borderColor: frame.accentColor,
                  maxWidth: "240px",
                  background:
                    background.type === "solid"
                      ? background.color
                      : background.type === "gradient"
                      ? `linear-gradient(to bottom, ${background.gradientStart}, ${background.gradientEnd})`
                      : background.patternBase,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stripDataUrl} alt="Photo Strip" className="w-full" />
              </div>

              <div className="flex gap-2">
                <button
                  id="download-btn"
                  onClick={handleDownload}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-pink-200"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
                <button
                  id="retry-btn"
                  onClick={onReset}
                  className="px-4 py-3 rounded-xl glass border border-pink-200 text-pink-500 font-semibold hover:bg-pink-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
