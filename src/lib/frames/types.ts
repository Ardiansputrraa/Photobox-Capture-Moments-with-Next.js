/**
 * PhotoFrame types and shape.
 * Imported by themed.ts, classic.ts, and the public barrel (../frames.ts).
 */

export type FrameId =
  | "none"
  | "filmstrip"
  | "postcard"
  | "hello"
  | "traveling"
  // ── Music-themed ─────────────────────────────────────────────────────────
  | "band-perunggu"   // Bernadya — warm bronze vintage
  | "about-you"       // The 1975 — dreamy soft pink
  | "satu-bulan"      // Bernadya — cool blue silver
  | "bulan-madu"      // romantic honeymoon blush
  | "daydream"        // lo-fi yellow haze
  | "indie-film"      // grainy teal film
  // ── Classic ──────────────────────────────────────────────────────────────
  | "pastel"
  | "retro"
  | "minimal"
  | "floral"
  | "y2k";

/**
 * How the canvas paper background is rendered.
 * - solid     → plain fill colour
 * - gradient  → top-to-bottom linear gradient
 * - grid      → coloured graph-paper grid lines
 * - filmstrip → black bg + sprocket holes drawn over photos
 * - airmail   → diagonal red/blue stripe border
 */
export type PaperStyle =
  | "solid"
  | "gradient"
  | "grid"
  | "filmstrip"
  | "airmail";

export interface PhotoFrame {
  /** Unique identifier — used as the frame's key everywhere */
  id: FrameId;
  label: string;
  emoji: string;
  description: string;

  // ── Background ──────────────────────────────────────────────────────────
  /** Main paper/background colour (also the gradient start colour) */
  paperColor: string;
  /** Gradient end colour — only read when paperStyle === "gradient" */
  paperColorEnd?: string;
  paperStyle: PaperStyle;
  /** Accent/mark colour for grid lines — only read when paperStyle === "grid" */
  gridColor?: string;

  // ── Border & text ───────────────────────────────────────────────────────
  accentColor: string;
  textColor: string;

  // ── Decorations ─────────────────────────────────────────────────────────
  /** Emoji stickers drawn in the bottom padding area of the strip */
  stickers: string[];
  /** Short text drawn at the top of the strip (optional) */
  headerText?: string;
}
