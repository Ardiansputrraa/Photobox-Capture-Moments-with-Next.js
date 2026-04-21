/**
 * THEMED FRAMES
 * ─────────────────────────────────────────────────────────────────────────────
 * Inspired by premium photo-strip printing services (Postcard, Old Film, etc.).
 *
 * ✏️  To add a new themed frame:
 *   1. Add the new id to the FrameId union in ./types.ts
 *   2. Add a new object to this array below
 *   3. That's it — it will appear automatically in ThemePicker
 */

import type { PhotoFrame } from "./types";

export const THEMED_FRAMES: PhotoFrame[] = [
  // ── Old Film / Filmstrip ───────────────────────────────────────────────────
  {
    id: "filmstrip",
    label: "Old Film",
    emoji: "🎞️",
    description: "Classic film strip",
    paperColor: "#111111",
    paperStyle: "filmstrip",
    accentColor: "#444444",
    textColor: "#ffffff",
    stickers: [],
  },

  // ── Postcard / Airmail ─────────────────────────────────────────────────────
  {
    id: "postcard",
    label: "Postcard",
    emoji: "✉️",
    description: "Vintage airmail style",
    paperColor: "#fffef5",
    paperStyle: "airmail",
    accentColor: "#c0392b",
    textColor: "#7b5e2a",
    stickers: ["✈️", "📮", "🗺️"],
  },

  // ── Hello / Cute ───────────────────────────────────────────────────────────
  {
    id: "hello",
    label: "Hello!",
    emoji: "👋",
    description: "Cute & playful",
    paperColor: "#e8f5f0",
    paperStyle: "grid",
    gridColor: "#b2dac9",
    accentColor: "#7ecbb0",
    textColor: "#2d7a5f",
    stickers: ["💛", "⭐", "🌟"],
    headerText: "Hello!",
  },

  // ── Traveling ──────────────────────────────────────────────────────────────
  {
    id: "traveling",
    label: "Traveling",
    emoji: "🌍",
    description: "Wanderlust vibes",
    paperColor: "#ece6f7",
    paperColorEnd: "#d8d0f0",
    paperStyle: "gradient",
    accentColor: "#b39ddb",
    textColor: "#4a3580",
    stickers: ["✈️", "🌍", "❤️"],
    headerText: "Enjoy the Journey",
  },
];
