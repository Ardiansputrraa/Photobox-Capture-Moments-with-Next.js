"use client";

import { useState, useCallback, useRef } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return null;

    // Use hidden canvas to capture the current frame
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Mirror the capture to match the preview
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhotos((prev) => [...prev, dataUrl]);
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
