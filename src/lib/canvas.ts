import { GridTemplate } from "./templates";
import { PhotoFrame } from "./frames";
import { PhotoFilter } from "./filters";
import { PaperBackground } from "./backgrounds";

/**
 * Draws all captured photo dataURLs onto a canvas strip
 * applying the selected background, frame accents, gaps, and stickers.
 */
export async function generatePhotoStrip(
  photos: string[],
  template: GridTemplate,
  frame: PhotoFrame,
  filter: PhotoFilter,
  background: PaperBackground,
): Promise<string> {
  const { width, height, slots, padding } = template.canvas;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  // ── Draw paper background ───────────────────────────────────────────────
  drawBackground(ctx, background, width, height);

  // ── Draw border accents (top & bottom stripes) ──────────────────────────
  if (frame.id !== "none") {
    ctx.fillStyle = frame.accentColor;
    ctx.fillRect(0, 0, width, 8);
    ctx.fillRect(0, height - 8, width, 8);
  }

  // ── Load and draw each photo into its slot ──────────────────────────────
  for (let i = 0; i < Math.min(photos.length, slots.length); i++) {
    const slot = slots[i];
    const img = await loadImage(photos[i]);

    ctx.save();

    // Rounded rect clipping for each photo slot
    roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 10);
    ctx.clip();

    // Apply CSS filter via offscreen canvas
    const offscreen = document.createElement("canvas");
    offscreen.width = slot.w;
    offscreen.height = slot.h;
    const offCtx = offscreen.getContext("2d");
    if (offCtx) {
      offCtx.filter = filter.cssFilter === "none" ? "" : filter.cssFilter;
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

  // ── Draw sticker decorations in the bottom padding area ─────────────────
  if (frame.stickers.length > 0) {
    ctx.font = "18px serif";
    ctx.textAlign = "center";
    frame.stickers.forEach((sticker, i) => {
      const x = (width / (frame.stickers.length + 1)) * (i + 1);
      const y = height - padding / 2 + 4;
      ctx.fillText(sticker, x, y);
    });
  }

  // ── Label at the bottom ─────────────────────────────────────────────────
  if (frame.id !== "none") {
    ctx.font = "bold 14px Outfit, sans-serif";
    ctx.fillStyle = frame.textColor;
    ctx.textAlign = "center";
    ctx.fillText("✨ PhotoBox ✨", width / 2, height - 6);
  }

  return canvas.toDataURL("image/png", 0.95);
}

// ── Background painters ───────────────────────────────────────────────────────

function drawBackground(
  ctx: CanvasRenderingContext2D,
  bg: PaperBackground,
  width: number,
  height: number,
) {
  switch (bg.type) {
    case "solid":
      ctx.fillStyle = bg.color!;
      ctx.fillRect(0, 0, width, height);
      break;

    case "gradient": {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, bg.gradientStart!);
      grad.addColorStop(1, bg.gradientEnd!);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case "pattern":
      drawPattern(ctx, bg, width, height);
      break;
  }
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  bg: PaperBackground,
  width: number,
  height: number,
) {
  // Base colour first
  ctx.fillStyle = bg.patternBase!;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = bg.patternMark!;

  switch (bg.patternShape) {
    case "dots": {
      const spacing = 24;
      const radius = 3;
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case "stripes": {
      const step = 20;
      ctx.lineWidth = 4;
      ctx.strokeStyle = bg.patternMark!;
      ctx.globalAlpha = 0.35;
      for (let i = -height; i < width + height; i += step) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    }

    case "grid": {
      const step = 24;
      ctx.lineWidth = 1;
      ctx.strokeStyle = bg.patternMark!;
      ctx.globalAlpha = 0.5;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    }

    case "hearts": {
      // Draw ♥ symbols as text across the canvas
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.globalAlpha = 0.25;
      const step = 32;
      for (let row = 0, y = step; y < height; y += step, row++) {
        const offset = row % 2 === 0 ? 0 : step / 2;
        for (let x = offset; x < width; x += step) {
          ctx.fillText("♥", x, y);
        }
      }
      ctx.globalAlpha = 1;
      break;
    }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

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
