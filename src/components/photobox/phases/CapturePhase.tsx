"use client";

/**
 * CapturePhase — Phase 1 of the photobox flow.
 * Shows the live camera, template picker, photo progress, and shutter button.
 * Transitions to EditPhase automatically once all photos are taken.
 */

import Link from "next/link";
import { Camera, ArrowLeft, ChevronRight, ImageIcon, Trash2 } from "lucide-react";

import CameraView from "@/components/photobox/CameraView";
import CountdownOverlay from "@/components/photobox/CountdownOverlay";
import TemplatePicker from "@/components/photobox/TemplatePicker";
import ShutterButton from "@/components/photobox/ShutterButton";
import FilterPicker from "@/components/photobox/FilterPicker";

import type { GridTemplate } from "@/lib/templates";
import type { PhotoFilter, FilterId } from "@/lib/filters";
import type { GridId } from "@/lib/templates";

interface CapturePhaseProps {
  // Camera
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isReady: boolean;
  isMirrored: boolean;
  error: string | null;
  onStartCamera: () => void;
  onToggleMirror: () => void;

  // Countdown / shutter
  count: number | null;
  isCountingDown: boolean;
  isShutterFlash: boolean;
  isShooting: boolean;
  onShutter: () => void;

  // Template
  template: GridTemplate;
  onTemplateChange: (id: GridId) => void;

  // Filter
  filter: PhotoFilter;
  filterId: FilterId;
  onFilterChange: (id: FilterId) => void;

  // Photos
  photos: string[];
  onRemovePhoto: (index: number) => void;
}

export default function CapturePhase({
  videoRef,
  isReady,
  isMirrored,
  error,
  onStartCamera,
  onToggleMirror,
  count,
  isCountingDown,
  isShutterFlash,
  isShooting,
  onShutter,
  template,
  onTemplateChange,
  filter,
  filterId,
  onFilterChange,
  photos,
  onRemovePhoto,
}: CapturePhaseProps) {
  const isComplete = photos.length >= template.photoCount;

  return (
    <main className="min-h-screen">
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-pink-200/40 to-violet-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-100/40 to-pink-200/40 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link
          href="/"
          id="back-btn"
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-pink-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

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
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold">
            1 Ambil Foto
          </span>
          <ChevronRight className="w-4 h-4 text-pink-300" />
          <span className="px-3 py-1 rounded-full glass border border-pink-200 text-pink-400 text-xs font-semibold">
            2 Edit Strip
          </span>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* Left: Camera + template */}
          <div className="space-y-4">
            <div className="relative">
              <CameraView
                videoRef={videoRef}
                isReady={isReady}
                isMirrored={isMirrored}
                error={error}
                filterCss={filter.cssFilter}
                onStart={onStartCamera}
                onToggleMirror={onToggleMirror}
              />
              <CountdownOverlay count={count} isActive={isCountingDown} />
              {isShutterFlash && (
                <div className="absolute inset-0 rounded-2xl bg-white animate-shutter pointer-events-none z-10" />
              )}
            </div>

            <div className="glass rounded-2xl p-4 border border-pink-100">
              <TemplatePicker selected={template.id} onChange={onTemplateChange} />
            </div>
          </div>

          {/* Right: Progress + shutter + filter */}
          <div className="space-y-4">
            {/* Photo progress */}
            <div className="glass rounded-2xl p-5 border border-pink-100 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-outfit font-bold text-base">Foto Diambil</h2>
                <span className="text-sm font-bold text-pink-500">
                  {photos.length} / {template.photoCount}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-pink-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 to-violet-400 transition-all duration-500"
                  style={{ width: `${(photos.length / template.photoCount) * 100}%` }}
                />
              </div>

              {/* Thumbnail grid */}
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: template.photoCount }).map((_, i) => {
                  const photo = photos[i];
                  return (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden border-2 border-pink-200 bg-pink-50 group"
                    >
                      {photo ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo}
                            alt={`Foto ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => onRemovePhoto(i)}
                            className="absolute inset-0 bg-red-500/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            aria-label={`Hapus foto ${i + 1}`}
                          >
                            <Trash2 className="w-3 h-3 text-white" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-3 h-3 text-pink-300" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Shutter */}
              <ShutterButton
                onClick={onShutter}
                disabled={isShooting || !isReady || isComplete}
                currentCount={photos.length}
                totalCount={template.photoCount}
                isCountingDown={isCountingDown}
              />
            </div>

            {/* Filter picker (available during capture too) */}
            <div className="glass rounded-2xl p-4 border border-pink-100">
              <FilterPicker
                selected={filterId}
                onChange={onFilterChange}
                samplePhotoUrl={photos[0]}
              />
            </div>

            {/* Tips */}
            <div className="rounded-2xl p-4 border border-pink-100 bg-gradient-to-br from-pink-50 to-violet-50">
              <p className="text-xs font-bold text-[var(--text-muted)] mb-2">💡 Tips</p>
              <ul className="text-xs text-[var(--text-muted)] space-y-1">
                <li>• Hover thumbnail → klik untuk hapus & ambil ulang</li>
                <li>• Setelah semua foto, pilih tema dan filter di halaman edit</li>
                <li>• Pastikan pencahayaan cukup untuk hasil terbaik</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
