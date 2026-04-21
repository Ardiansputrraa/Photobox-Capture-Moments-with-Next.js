import { GridTemplate } from "./templates";
import { PhotoFrame } from "./frames";
import { PhotoFilter } from "./filters";

/**
 * Draws all captured photo dataURLs onto a canvas strip
 * applying the selected frame background, gaps, and stickers.
 */
export async function generatePhotoStrip(
  photos: string[],
  template: GridTemplate,
  frame: PhotoFrame,
  filter: PhotoFilter,
): Promise<string> {
  const { width, height, slots, padding, gap } = template.canvas;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  // Draw paper background
  ctx.fillStyle = frame.paperColor;
  ctx.fillRect(0, 0, width, height);

  // Draw border accents (top & bottom stripes)
  if (frame.id !== "none") {
    ctx.fillStyle = frame.accentColor;
    ctx.fillRect(0, 0, width, 8);
    ctx.fillRect(0, height - 8, width, 8);
  }

  // Load and draw each photo into its slot
  for (let i = 0; i < Math.min(photos.length, slots.length); i++) {
    const slot = slots[i];
    const img = await loadImage(photos[i]);

    ctx.save();

    // Rounded rect clipping for each photo slot
    roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 10);
    ctx.clip();

    // Apply CSS filter via canvas ImageData approximation
    // We draw to offscreen canvas with filter first
    const offscreen = document.createElement("canvas");
    offscreen.width = slot.w;
    offscreen.height = slot.h;
    const offCtx = offscreen.getContext("2d");
    if (offCtx) {
      offCtx.filter = filter.cssFilter === "none" ? "" : filter.cssFilter;
      // Cover-fit the image into the slot
      const { sx, sy, sw, sh } = coverFit(img.width, img.height, slot.w, slot.h);
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, slot.w, slot.h);
      ctx.drawImage(offscreen, slot.x, slot.y);
    }

    ctx.restore();

    // Slot border
    ctx.strokeStyle = frame.accentColor;
    ctx.lineWidth = 3;
    roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 10);
    ctx.stroke();
  }

  // Draw sticker decorations in gaps between photos
  if (frame.stickers.length > 0) {
    ctx.font = "18px serif";
    ctx.textAlign = "center";
    frame.stickers.forEach((sticker, i) => {
      const x = (width / (frame.stickers.length + 1)) * (i + 1);
      const y = height - padding / 2 + 4;
      ctx.fillText(sticker, x, y);
    });
  }

  // Label at the bottom
  if (frame.id !== "none") {
    ctx.font = "bold 14px Outfit, sans-serif";
    ctx.fillStyle = frame.textColor;
    ctx.textAlign = "center";
    ctx.fillText("✨ PhotoBox ✨", width / 2, height - 6);
  }

  return canvas.toDataURL("image/png", 0.95);
}

// Helper: load an image from a dataURL
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Helper: compute cover-fit crop parameters
function coverFit(
  imgW: number,
  imgH: number,
  targetW: number,
  targetH: number,
): { sx: number; sy: number; sw: number; sh: number } {
  const imgRatio = imgW / imgH;
  const targetRatio = targetW / targetH;

  let sw: number, sh: number, sx: number, sy: number;
  if (imgRatio > targetRatio) {
    sh = imgH;
    sw = imgH * targetRatio;
    sx = (imgW - sw) / 2;
    sy = 0;
  } else {
    sw = imgW;
    sh = imgW / targetRatio;
    sx = 0;
    sy = (imgH - sh) / 2;
  }
  return { sx, sy, sw, sh };
}

// Helper: draw a rounded rectangle path
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
