/**
 * Background paper options for the photo strip.
 * Each background defines how the canvas paper is painted —
 * solid colour, gradient, or repeating pattern.
 */

export type BackgroundType = "solid" | "gradient" | "pattern";

export type BackgroundId =
  | "white"
  | "cream"
  | "blush"
  | "lavender"
  | "mint"
  | "sky"
  | "peach"
  | "gradient-sunset"
  | "gradient-ocean"
  | "gradient-aurora"
  | "gradient-cotton"
  | "pattern-dots"
  | "pattern-stripes"
  | "pattern-grid"
  | "pattern-hearts";

export interface PaperBackground {
  id: BackgroundId;
  label: string;
  emoji: string;
  type: BackgroundType;
  /** CSS colour / gradient string — used for the UI preview swatch */
  previewCss: string;

  // ── Solid ──────────────────────────────────────────────
  /** Single hex/rgb colour used when type === "solid" */
  color?: string;

  // ── Gradient ───────────────────────────────────────────
  /** Start colour (top) */
  gradientStart?: string;
  /** End colour (bottom) */
  gradientEnd?: string;

  // ── Pattern ────────────────────────────────────────────
  /** Base background colour for the pattern */
  patternBase?: string;
  /** Foreground colour of the pattern marks */
  patternMark?: string;
  /** Pattern shape: "dots" | "stripes" | "grid" | "hearts" */
  patternShape?: "dots" | "stripes" | "grid" | "hearts";
}

export const BACKGROUNDS: PaperBackground[] = [
  // ── Solid ──────────────────────────────────────────────────────────────────
  {
    id: "white",
    label: "Pure White",
    emoji: "🤍",
    type: "solid",
    color: "#ffffff",
    previewCss: "#ffffff",
  },
  {
    id: "cream",
    label: "Cream",
    emoji: "🧡",
    type: "solid",
    color: "#fffbeb",
    previewCss: "#fffbeb",
  },
  {
    id: "blush",
    label: "Blush",
    emoji: "🌸",
    type: "solid",
    color: "#fce7f3",
    previewCss: "#fce7f3",
  },
  {
    id: "lavender",
    label: "Lavender",
    emoji: "💜",
    type: "solid",
    color: "#ede9fe",
    previewCss: "#ede9fe",
  },
  {
    id: "mint",
    label: "Mint",
    emoji: "🌿",
    type: "solid",
    color: "#ecfdf5",
    previewCss: "#ecfdf5",
  },
  {
    id: "sky",
    label: "Sky",
    emoji: "🩵",
    type: "solid",
    color: "#e0f2fe",
    previewCss: "#e0f2fe",
  },
  {
    id: "peach",
    label: "Peach",
    emoji: "🍑",
    type: "solid",
    color: "#fff1e6",
    previewCss: "#fff1e6",
  },

  // ── Gradient ───────────────────────────────────────────────────────────────
  {
    id: "gradient-sunset",
    label: "Sunset",
    emoji: "🌅",
    type: "gradient",
    gradientStart: "#fde68a",
    gradientEnd: "#fca5a5",
    previewCss: "linear-gradient(to bottom, #fde68a, #fca5a5)",
  },
  {
    id: "gradient-ocean",
    label: "Ocean",
    emoji: "🌊",
    type: "gradient",
    gradientStart: "#bfdbfe",
    gradientEnd: "#a5f3fc",
    previewCss: "linear-gradient(to bottom, #bfdbfe, #a5f3fc)",
  },
  {
    id: "gradient-aurora",
    label: "Aurora",
    emoji: "🌌",
    type: "gradient",
    gradientStart: "#c4b5fd",
    gradientEnd: "#6ee7b7",
    previewCss: "linear-gradient(to bottom, #c4b5fd, #6ee7b7)",
  },
  {
    id: "gradient-cotton",
    label: "Cotton Candy",
    emoji: "🍭",
    type: "gradient",
    gradientStart: "#fbcfe8",
    gradientEnd: "#ddd6fe",
    previewCss: "linear-gradient(to bottom, #fbcfe8, #ddd6fe)",
  },

  // ── Pattern ────────────────────────────────────────────────────────────────
  {
    id: "pattern-dots",
    label: "Polka Dots",
    emoji: "🔵",
    type: "pattern",
    patternBase: "#fdf4ff",
    patternMark: "#e879f9",
    patternShape: "dots",
    previewCss: "radial-gradient(circle, #e879f9 2px, #fdf4ff 2px)",
  },
  {
    id: "pattern-stripes",
    label: "Stripes",
    emoji: "🦓",
    type: "pattern",
    patternBase: "#fff7ed",
    patternMark: "#fdba74",
    patternShape: "stripes",
    previewCss:
      "repeating-linear-gradient(45deg, #fdba74 0px, #fdba74 4px, #fff7ed 4px, #fff7ed 16px)",
  },
  {
    id: "pattern-grid",
    label: "Grid",
    emoji: "🔲",
    type: "pattern",
    patternBase: "#f0fdf4",
    patternMark: "#86efac",
    patternShape: "grid",
    previewCss:
      "linear-gradient(#86efac 1px, transparent 1px), linear-gradient(90deg, #86efac 1px, transparent 1px)",
  },
  {
    id: "pattern-hearts",
    label: "Hearts",
    emoji: "💗",
    type: "pattern",
    patternBase: "#fff1f2",
    patternMark: "#fda4af",
    patternShape: "hearts",
    previewCss: "#fff1f2",
  },
];

export function getBackground(id: BackgroundId): PaperBackground {
  return BACKGROUNDS.find((b) => b.id === id) ?? BACKGROUNDS[0];
}
