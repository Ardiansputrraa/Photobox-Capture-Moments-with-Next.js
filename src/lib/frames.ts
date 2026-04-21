/**
 * frames.ts — Public API barrel
 * ─────────────────────────────────────────────────────────────────────────────
 * All imports from "@/lib/frames" resolve here.
 *
 * Frame data is organized in ./frames/ subdirectory:
 *   ./frames/types.ts   → PhotoFrame interface & FrameId / PaperStyle types
 *   ./frames/themed.ts  → Themed presets (Old Film, Postcard, Hello, Traveling)
 *   ./frames/classic.ts → Classic presets (Pastel, Retro, Minimal, Floral, Y2K)
 *
 * ✏️  To add a frame: edit the appropriate file in ./frames/ — no changes
 *     needed here.
 */

export type { FrameId, PaperStyle, PhotoFrame } from "./frames/types";
export { THEMED_FRAMES } from "./frames/themed";
export { CLASSIC_FRAMES } from "./frames/classic";

import type { PhotoFrame } from "./frames/types";
import { THEMED_FRAMES } from "./frames/themed";
import { CLASSIC_FRAMES } from "./frames/classic";

/** All registered frames — themed first, then classic */
export const FRAMES: PhotoFrame[] = [...THEMED_FRAMES, ...CLASSIC_FRAMES];

/** Look up a frame by id. Falls back to the first frame if not found. */
export function getFrame(id: string): PhotoFrame {
  return FRAMES.find((f) => f.id === id) ?? FRAMES[0];
}
