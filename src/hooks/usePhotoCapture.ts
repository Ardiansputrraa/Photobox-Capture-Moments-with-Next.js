"use client";

import { useState, useCallback } from "react";
import { GridTemplate } from "@/lib/templates";
import { PhotoFilter } from "@/lib/filters";
import { PhotoFrame } from "@/lib/frames";
import { generatePhotoStrip } from "@/lib/canvas";

interface UsePhotoCaptureProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  filter: PhotoFilter;
  frame: PhotoFrame;
  template: GridTemplate;
}

interface UsePhotoCaptureReturn {
  photos: string[];
  stripDataUrl: string | null;
  isCapturing: boolean;
  isGenerating: boolean;
  capturePhoto: () => string | null;
  generateStrip: () => Promise<void>;
  removePhoto: (index: number) => void;
  reset: () => void;
}

export function usePhotoCapture({
  videoRef,
  filter,
  frame,
  template,
}: UsePhotoCaptureProps): UsePhotoCaptureReturn {
  const [photos, setPhotos] = useState<string[]>([]);
  const [stripDataUrl, setStripDataUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhotos((prev) => [...prev, dataUrl]);
    setStripDataUrl(null); // invalidate previous strip
    return dataUrl;
  }, [videoRef]);

  const generateStrip = useCallback(async () => {
    if (photos.length === 0) return;
    setIsGenerating(true);
    try {
      const result = await generatePhotoStrip(photos, template, frame, filter);
      setStripDataUrl(result);
    } finally {
      setIsGenerating(false);
    }
  }, [photos, template, frame, filter]);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setStripDataUrl(null);
  }, []);

  const reset = useCallback(() => {
    setPhotos([]);
    setStripDataUrl(null);
    setIsCapturing(false);
  }, []);

  return {
    photos,
    stripDataUrl,
    isCapturing,
    isGenerating,
    capturePhoto,
    generateStrip,
    removePhoto,
    reset,
  };
}
