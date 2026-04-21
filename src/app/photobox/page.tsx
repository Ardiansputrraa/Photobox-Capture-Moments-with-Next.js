"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Camera, ArrowLeft } from "lucide-react";

import { useCamera } from "@/hooks/useCamera";
import { useCountdown } from "@/hooks/useCountdown";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";

import CameraView from "@/components/photobox/CameraView";
import CountdownOverlay from "@/components/photobox/CountdownOverlay";
import TemplatePicker from "@/components/photobox/TemplatePicker";
import FramePicker from "@/components/photobox/FramePicker";
import FilterPicker from "@/components/photobox/FilterPicker";
import ShutterButton from "@/components/photobox/ShutterButton";
import PhotoStrip from "@/components/photobox/PhotoStrip";

import { GRID_TEMPLATES, GridId, getTemplate } from "@/lib/templates";
import { FILTERS, FilterId, getFilter } from "@/lib/filters";
import { FRAMES, FrameId, getFrame } from "@/lib/frames";

export default function PhotoboxPage() {
  const [templateId, setTemplateId] = useState<GridId>("strip-4");
  const [filterId, setFilterId] = useState<FilterId>("none");
  const [frameId, setFrameId] = useState<FrameId>("pastel");
  const [isShutterFlash, setIsShutterFlash] = useState(false);
  const [isShooting, setIsShooting] = useState(false);

  const template = getTemplate(templateId);
  const filter = getFilter(filterId);
  const frame = getFrame(frameId);

  const { videoRef, stream, error, isReady, isMirrored, startCamera, stopCamera, toggleMirror } = useCamera();
  const { count, isActive: isCountingDown, start: startCountdown } = useCountdown();
  const { photos, stripDataUrl, isGenerating, capturePhoto, generateStrip, removePhoto, reset } =
    usePhotoCapture({ videoRef, filter, frame, template });

  const handleTemplateChange = useCallback(
    (id: GridId) => {
      setTemplateId(id);
      reset();
    },
    [reset],
  );

  const triggerShutterFlash = () => {
    setIsShutterFlash(true);
    setTimeout(() => setIsShutterFlash(false), 400);
  };

  const handleShutter = useCallback(async () => {
    if (isShooting || !isReady || photos.length >= template.photoCount) return;
    setIsShooting(true);

    await startCountdown(3);
    triggerShutterFlash();
    capturePhoto();

    setIsShooting(false);
  }, [isShooting, isReady, photos.length, template.photoCount, startCountdown, capturePhoto]);

  const isComplete = photos.length >= template.photoCount;

  return (
    <main className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-pink-200/40 to-violet-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-100/40 to-pink-200/40 blur-3xl" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link
          href="/"
          id="back-btn"
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-pink-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            PhotoBox
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left: Camera + Controls */}
          <div className="space-y-4">
            {/* Camera */}
            <div className="relative">
              <CameraView
                videoRef={videoRef}
                isReady={isReady}
                isMirrored={isMirrored}
                error={error}
                filterCss={filter.cssFilter}
                onStart={startCamera}
                onToggleMirror={toggleMirror}
              />
              <CountdownOverlay count={count} isActive={isCountingDown} />

              {/* Shutter flash */}
              {isShutterFlash && (
                <div className="absolute inset-0 rounded-2xl bg-white animate-shutter pointer-events-none z-10" />
              )}
            </div>

            {/* Pickers */}
            <div className="glass rounded-2xl p-4 space-y-5 border border-pink-100">
              <TemplatePicker selected={templateId} onChange={handleTemplateChange} />
              <hr className="border-pink-100" />
              <FramePicker selected={frameId} onChange={setFrameId} />
              <hr className="border-pink-100" />
              <FilterPicker
                selected={filterId}
                onChange={setFilterId}
                samplePhotoUrl={photos[0]}
              />
            </div>
          </div>

          {/* Right: Shutter + Strip */}
          <div className="space-y-5">
            {/* Shutter section */}
            {!isComplete && (
              <div className="glass rounded-2xl p-6 border border-pink-100 flex flex-col items-center gap-4">
                <div className="text-center">
                  <h2 className="font-outfit font-bold text-lg">
                    {isComplete ? "🎉 Semua foto sudah!" : "Ambil Foto"}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Template: <span className="text-pink-500 font-semibold">{template.label}</span>
                    {" · "}
                    {template.photoCount} foto
                  </p>
                </div>
                <ShutterButton
                  onClick={handleShutter}
                  disabled={isShooting || !isReady || isComplete}
                  currentCount={photos.length}
                  totalCount={template.photoCount}
                  isCountingDown={isCountingDown}
                />
              </div>
            )}

            {/* Photo Strip section */}
            <div className="glass rounded-2xl p-4 border border-pink-100">
              <PhotoStrip
                photos={photos}
                stripDataUrl={stripDataUrl}
                template={template}
                frame={frame}
                filter={filter}
                isGenerating={isGenerating}
                onGenerate={generateStrip}
                onReset={reset}
                onRemovePhoto={removePhoto}
              />
            </div>

            {/* Tips card */}
            <div className="rounded-2xl p-4 border border-pink-100 bg-gradient-to-br from-pink-50 to-violet-50">
              <p className="text-xs text-[var(--text-muted)] font-medium mb-2">💡 Tips</p>
              <ul className="text-xs text-[var(--text-muted)] space-y-1">
                <li>• Pastikan pencahayaan cukup untuk hasil terbaik</li>
                <li>• Ganti template untuk mengubah jumlah & susunan foto</li>
                <li>• Klik foto thumbnail untuk menghapus & ambil ulang</li>
                <li>• Filter dapat diubah sebelum generate strip</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
