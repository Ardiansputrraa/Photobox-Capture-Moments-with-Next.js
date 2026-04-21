"use client";

/**
 * /photobox page — State orchestrator.
 *
 * This file only manages application state and wires together the two phases.
 * All UI rendering lives in:
 *   → CapturePhase  (src/components/photobox/phases/CapturePhase.tsx)
 *   → EditPhase     (src/components/photobox/phases/EditPhase.tsx)
 */

import { useState, useCallback, useEffect } from "react";

import CapturePhase from "@/components/photobox/phases/CapturePhase";
import EditPhase from "@/components/photobox/phases/EditPhase";

import { useCamera } from "@/hooks/useCamera";
import { useCountdown } from "@/hooks/useCountdown";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";

import { type GridId, getTemplate } from "@/lib/templates";
import { type FilterId, getFilter } from "@/lib/filters";
import { type FrameId, getFrame } from "@/lib/frames";

type AppStep = "capture" | "edit";

export default function PhotoboxPage() {
  // ── App flow ──────────────────────────────────────────────────────────────
  const [step, setStep] = useState<AppStep>("capture");

  // ── User selections ───────────────────────────────────────────────────────
  const [templateId, setTemplateId] = useState<GridId>("strip-4");
  const [filterId, setFilterId] = useState<FilterId>("none");
  const [frameId, setFrameId] = useState<FrameId>("pastel");
  const [isShutterFlash, setIsShutterFlash] = useState(false);
  const [isShooting, setIsShooting] = useState(false);

  // ── Derived values ────────────────────────────────────────────────────────
  const template = getTemplate(templateId);
  const filter = getFilter(filterId);
  const frame = getFrame(frameId);

  // ── Hooks ─────────────────────────────────────────────────────────────────
  const {
    videoRef, error, isReady, isMirrored,
    startCamera, toggleMirror,
  } = useCamera();

  const { count, isActive: isCountingDown, start: startCountdown } = useCountdown();

  const {
    photos, stripDataUrl, isGenerating,
    capturePhoto, generateStrip, removePhoto, reset,
  } = usePhotoCapture({ videoRef, filter, frame, template });

  // ── Auto-advance to edit when capture is complete ─────────────────────────
  const isComplete = photos.length >= template.photoCount;
  useEffect(() => {
    if (isComplete && step === "capture") {
      const timer = setTimeout(() => setStep("edit"), 600);
      return () => clearTimeout(timer);
    }
  }, [isComplete, step]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleTemplateChange = useCallback(
    (id: GridId) => { setTemplateId(id); reset(); setStep("capture"); },
    [reset],
  );

  const handleShutter = useCallback(async () => {
    if (isShooting || !isReady || isComplete) return;
    setIsShooting(true);
    await startCountdown(3);
    setIsShutterFlash(true);
    setTimeout(() => setIsShutterFlash(false), 400);
    capturePhoto();
    setIsShooting(false);
  }, [isShooting, isReady, isComplete, startCountdown, capturePhoto]);

  const handleReset = useCallback(() => {
    reset();
    setStep("capture");
  }, [reset]);

  const handleDownload = useCallback(() => {
    if (!stripDataUrl) return;
    const a = document.createElement("a");
    a.href = stripDataUrl;
    a.download = `photobox-${Date.now()}.png`;
    a.click();
  }, [stripDataUrl]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (step === "capture") {
    return (
      <CapturePhase
        // Camera
        videoRef={videoRef}
        isReady={isReady}
        isMirrored={isMirrored}
        error={error}
        onStartCamera={startCamera}
        onToggleMirror={toggleMirror}
        // Countdown / shutter
        count={count}
        isCountingDown={isCountingDown}
        isShutterFlash={isShutterFlash}
        isShooting={isShooting}
        onShutter={handleShutter}
        // Template
        template={template}
        onTemplateChange={handleTemplateChange}
        // Filter
        filter={filter}
        filterId={filterId}
        onFilterChange={setFilterId}
        // Photos
        photos={photos}
        onRemovePhoto={removePhoto}
      />
    );
  }

  return (
    <EditPhase
      // Photos & strip
      photos={photos}
      stripDataUrl={stripDataUrl}
      isGenerating={isGenerating}
      onGenerate={generateStrip}
      onDownload={handleDownload}
      onReset={handleReset}
      // Template
      template={template}
      // Theme
      frame={frame}
      frameId={frameId}
      onFrameChange={setFrameId}
      // Filter
      filter={filter}
      filterId={filterId}
      onFilterChange={setFilterId}
    />
  );
}
