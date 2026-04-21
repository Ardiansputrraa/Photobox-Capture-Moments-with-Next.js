import { GridTemplate } from "./templates";
import { PhotoFrame } from "./frames";
import { PhotoFilter } from "./filters";

/**
 * Renders all captured photos onto a canvas strip with the selected
 * frame theme (background, border decorations, stickers) and filter.
 */
export async function generatePhotoStrip(
  photos: string[],
  template: GridTemplate,
  frame: PhotoFrame,
  filter: PhotoFilter,
): Promise<string> {
  const { width, height, slots, padding } = template.canvas;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  // ── 1. Draw paper background ───────────────────────────────────────────────
  drawPaperBackground(ctx, frame, width, height);

  // ── 2. Draw each photo into its slot ──────────────────────────────────────
  for (let i = 0; i < Math.min(photos.length, slots.length); i++) {
    const slot = slots[i];
    const img = await loadImage(photos[i]);

    ctx.save();
    roundedRect(ctx, slot.x, slot.y, slot.w, slot.h, 10);
    ctx.clip();

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

  // ── 3. Draw foreground decorations (on top of photos) ─────────────────────
  drawForegroundDecorations(ctx, frame, width, height, padding);

  return canvas.toDataURL("image/png", 0.95);
}

// ── Paper background painters ──────────────────────────────────────────────

function drawPaperBackground(
  ctx: CanvasRenderingContext2D,
  frame: PhotoFrame,
  width: number,
  height: number,
) {
  switch (frame.paperStyle) {
    case "solid":
      ctx.fillStyle = frame.paperColor;
      ctx.fillRect(0, 0, width, height);
      // Top & bottom accent stripe
      if (frame.id !== "none") {
        ctx.fillStyle = frame.accentColor;
        ctx.fillRect(0, 0, width, 8);
        ctx.fillRect(0, height - 8, width, 8);
      }
      break;

    case "gradient": {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, frame.paperColor);
      grad.addColorStop(1, frame.paperColorEnd ?? frame.paperColor);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      // Accent stripes
      ctx.fillStyle = frame.accentColor;
      ctx.fillRect(0, 0, width, 6);
      ctx.fillRect(0, height - 6, width, 6);
      break;
    }

    case "grid": {
      // Base colour
      ctx.fillStyle = frame.paperColor;
      ctx.fillRect(0, 0, width, height);
      // Grid lines
      const step = 20;
      ctx.strokeStyle = frame.gridColor ?? frame.accentColor;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.5;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // Accent border
      ctx.strokeStyle = frame.accentColor;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.8;
      ctx.strokeRect(8, 8, width - 16, height - 16);
      ctx.globalAlpha = 1;
      break;
    }

    case "filmstrip": {
      // Black background
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case "airmail": {
      // Off-white base
      ctx.fillStyle = frame.paperColor;
      ctx.fillRect(0, 0, width, height);
      // Diagonal airmail border — 16 px thick, alternating red & blue
      const borderW = 16;
      const stripeSize = 14;
      const colors = ["#c0392b", "#2c6fad"];
      // Top strip
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, borderW);
      ctx.clip();
      for (let x = -height; x < width + height; x += stripeSize) {
        ctx.fillStyle = colors[Math.floor(x / stripeSize) % 2 === 0 ? 0 : 1];
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x + stripeSize, 0);
        ctx.lineTo(x + stripeSize + borderW, borderW); ctx.lineTo(x + borderW, borderW);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      // Bottom strip
      ctx.save();
      ctx.beginPath(); ctx.rect(0, height - borderW, width, borderW); ctx.clip();
      for (let x = -height; x < width + height; x += stripeSize) {
        ctx.fillStyle = colors[Math.floor(x / stripeSize) % 2 === 0 ? 0 : 1];
        ctx.beginPath();
        ctx.moveTo(x, height - borderW); ctx.lineTo(x + stripeSize, height - borderW);
        ctx.lineTo(x + stripeSize + borderW, height); ctx.lineTo(x + borderW, height);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      // Left strip
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, borderW, height); ctx.clip();
      for (let y = -width; y < height + width; y += stripeSize) {
        ctx.fillStyle = colors[Math.floor(y / stripeSize) % 2 === 0 ? 0 : 1];
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(borderW, y + borderW);
        ctx.lineTo(borderW, y + borderW + stripeSize); ctx.lineTo(0, y + stripeSize);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      // Right strip
      ctx.save();
      ctx.beginPath(); ctx.rect(width - borderW, 0, borderW, height); ctx.clip();
      for (let y = -width; y < height + width; y += stripeSize) {
        ctx.fillStyle = colors[Math.floor(y / stripeSize) % 2 === 0 ? 0 : 1];
        ctx.beginPath();
        ctx.moveTo(width - borderW, y); ctx.lineTo(width, y + borderW);
        ctx.lineTo(width, y + borderW + stripeSize); ctx.lineTo(width - borderW, y + stripeSize);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      break;
    }
  }
}

// ── Foreground decorations (drawn after photos) ───────────────────────────

function drawForegroundDecorations(
  ctx: CanvasRenderingContext2D,
  frame: PhotoFrame,
  width: number,
  height: number,
  padding: number,
) {
  // Filmstrip sprocket holes
  if (frame.paperStyle === "filmstrip") {
    const holeR = 5;
    const holeSpacing = 28;
    const holeX = 9; // centre of left track
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 18, height); // left track
    ctx.fillRect(width - 18, 0, 18, height); // right track
    ctx.fillStyle = "#2a2a2a";
    for (let y = 20; y < height; y += holeSpacing) {
      ctx.beginPath(); ctx.arc(holeX, y, holeR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(width - holeX, y, holeR, 0, Math.PI * 2); ctx.fill();
    }
    // "Film" side text (rotated)
    ctx.save();
    ctx.translate(9, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = "8px monospace";
    ctx.fillStyle = "#555555";
    ctx.textAlign = "center";
    ctx.fillText("PHOTOBOX · FILMSTRIP · PHOTOBOX · FILMSTRIP", 0, 0);
    ctx.restore();
  }

  // Header text
  if (frame.headerText) {
    ctx.font = `bold ${Math.round(width * 0.048)}px Outfit, sans-serif`;
    ctx.fillStyle = frame.textColor;
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.85;
    ctx.fillText(frame.headerText, width / 2, padding * 0.65);
    ctx.globalAlpha = 1;
  }

  // Stickers in bottom padding
  if (frame.stickers.length > 0) {
    ctx.font = `${Math.round(width * 0.055)}px serif`;
    ctx.textAlign = "center";
    frame.stickers.forEach((sticker, i) => {
      const x = (width / (frame.stickers.length + 1)) * (i + 1);
      const y = height - padding / 2 + 6;
      ctx.fillText(sticker, x, y);
    });
  }

  // Watermark label
  if (frame.id !== "none") {
    ctx.font = `bold ${Math.round(width * 0.038)}px Outfit, sans-serif`;
    ctx.fillStyle = frame.textColor;
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.7;
    ctx.fillText("✨ PhotoBox ✨", width / 2, height - 6);
    ctx.globalAlpha = 1;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function coverFit(
  imgW: number, imgH: number, targetW: number, targetH: number,
): { sx: number; sy: number; sw: number; sh: number } {
  const ir = imgW / imgH;
  const tr = targetW / targetH;
  let sw: number, sh: number, sx: number, sy: number;
  if (ir > tr) {
    sh = imgH; sw = imgH * tr; sx = (imgW - sw) / 2; sy = 0;
  } else {
    sw = imgW; sh = imgW / tr; sx = 0; sy = (imgH - sh) / 2;
  }
  return { sx, sy, sw, sh };
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
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
