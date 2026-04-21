/**
 * CLASSIC FRAMES
 * ─────────────────────────────────────────────────────────────────────────────
 * Timeless aesthetic presets for everyday photo-booth use.
 *
 * ✏️  To add a new classic frame:
 *   1. Add the new id to the FrameId union in ./types.ts
 *   2. Add a new object to this array below
 */

import type { PhotoFrame } from "./types";

export const CLASSIC_FRAMES: PhotoFrame[] = [
  // ── No Frame ───────────────────────────────────────────────────────────────
  {
    id: "none",
    label: "No Frame",
    emoji: "⬜",
    description: "Clean & simple",
    paperColor: "#ffffff",
    paperStyle: "solid",
    accentColor: "#e5e7eb",
    textColor: "#6b7280",
    stickers: [],
  },

  // ── Pastel Dream ───────────────────────────────────────────────────────────
  {
    id: "pastel",
    label: "Pastel Dream",
    emoji: "🌸",
    description: "Soft & dreamy",
    paperColor: "#fce7f3",
    paperStyle: "solid",
    accentColor: "#f9a8d4",
    textColor: "#be185d",
    stickers: ["🌸", "💗", "🌷", "✨"],
  },

  // ── Retro Film ─────────────────────────────────────────────────────────────
  {
    id: "retro",
    label: "Retro Film",
    emoji: "📷",
    description: "Vintage aesthetic",
    paperColor: "#fefce8",
    paperStyle: "solid",
    accentColor: "#fcd34d",
    textColor: "#92400e",
    stickers: ["📷", "🎞️", "⭐", "💛"],
  },

  // ── Minimal ────────────────────────────────────────────────────────────────
  {
    id: "minimal",
    label: "Minimal",
    emoji: "🤍",
    description: "Less is more",
    paperColor: "#f8fafc",
    paperStyle: "solid",
    accentColor: "#cbd5e1",
    textColor: "#334155",
    stickers: ["·", "○", "△"],
  },

  // ── Floral Garden ──────────────────────────────────────────────────────────
  {
    id: "floral",
    label: "Floral",
    emoji: "🌿",
    description: "Garden fresh",
    paperColor: "#f0fdf4",
    paperStyle: "solid",
    accentColor: "#86efac",
    textColor: "#14532d",
    stickers: ["🌿", "🌻", "🍀", "🌼"],
  },

  // ── Y2K Glam ───────────────────────────────────────────────────────────────
  {
    id: "y2k",
    label: "Y2K Glam",
    emoji: "💜",
    description: "2000s pop energy",
    paperColor: "#faf5ff",
    paperStyle: "solid",
    accentColor: "#c084fc",
    textColor: "#581c87",
    stickers: ["💜", "⚡", "🦄", "🌙"],
  },
];
