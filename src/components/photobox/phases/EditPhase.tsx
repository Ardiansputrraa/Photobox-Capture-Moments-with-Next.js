"use client";

/**
 * EditPhase — Phase 2 of the photobox flow.
 * Shows the live strip preview, theme & filter pickers, and download actions.
 */

import { Camera, ArrowLeft, ChevronRight, Download, RotateCcw, Loader2, ImageIcon } from "lucide-react";

import ThemePicker from "@/components/photobox/ThemePicker";
import FilterPicker from "@/components/photobox/FilterPicker";
import StripLivePreview from "@/components/photobox/StripLivePreview";

import type { GridTemplate } from "@/lib/templates";
import type { PhotoFilter, FilterId } from "@/lib/filters";
import type { PhotoFrame, FrameId } from "@/lib/frames";

interface EditPhaseProps {
  // Photos & strip
  photos: string[];
  stripDataUrl: string | null;
  isGenerating: boolean;
  onGenerate: () => void;
  onDownload: () => void;
  onReset: () => void;

  // Template (display only)
  template: GridTemplate;

  // Theme
  frame: PhotoFrame;
  frameId: FrameId;
  onFrameChange: (id: FrameId) => void;

  // Filter
  filter: PhotoFilter;
  filterId: FilterId;
  onFilterChange: (id: FilterId) => void;
}

export default function EditPhase({
  photos,
  stripDataUrl,
  isGenerating,
  onGenerate,
  onDownload,
  onReset,
  template,
  frame,
  frameId,
  onFrameChange,
  filter,
  filterId,
  onFilterChange,
}: EditPhaseProps) {
  return (
    <main className="min-h-screen">
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-violet-200/40 to-pink-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-100/40 to-violet-200/40 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-pink-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Ambil Ulang
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            PhotoBox
          </span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full glass border border-pink-200 text-pink-400 text-xs font-semibold">
            1 Ambil Foto ✓
          </span>
          <ChevronRight className="w-4 h-4 text-pink-300" />
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold">
            2 Edit Strip
          </span>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">

          {/* Left: Live preview + actions */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-pink-100">
              <h2 className="font-outfit font-bold text-base mb-4">Preview Strip</h2>
              <div className="overflow-y-auto max-h-[560px] flex justify-center py-2">
                <StripLivePreview
                  photos={photos}
                  template={template}
                  frame={frame}
                  filter={filter}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              {!stripDataUrl ? (
                <button
                  id="generate-strip-btn"
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-60 transition-opacity shadow-xl shadow-pink-200"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Membuat Strip...</>
                  ) : (
                    <><ImageIcon className="w-5 h-5" /> Generate Photo Strip!</>
                  )}
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    id="download-btn"
                    onClick={onDownload}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-xl shadow-pink-200"
                  >
                    <Download className="w-5 h-5" /> Download PNG
                  </button>
                  <button
                    id="retry-btn"
                    onClick={onReset}
                    className="w-full py-3 rounded-2xl glass border border-pink-200 text-pink-500 font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Buat Lagi
                  </button>
                </div>
              )}
            </div>

            {/* Generated strip preview (final PNG) */}
            {stripDataUrl && (
              <div className="glass rounded-2xl p-4 border border-pink-100">
                <p className="font-outfit font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Hasil Strip
                </p>
                <div
                  className="mx-auto overflow-hidden rounded-xl shadow-xl border-4 max-w-[200px]"
                  style={{ borderColor: frame.accentColor }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={stripDataUrl} alt="Photo Strip" className="w-full" />
                </div>
              </div>
            )}
          </div>

          {/* Right: Theme + filter pickers */}
          <div className="glass rounded-2xl p-5 border border-pink-100 space-y-5 self-start">
            <ThemePicker selected={frameId} onChange={onFrameChange} />
            <hr className="border-pink-100" />
            <FilterPicker
              selected={filterId}
              onChange={onFilterChange}
              samplePhotoUrl={photos[0]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
