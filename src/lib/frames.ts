export type FrameId = "none" | "pastel" | "retro" | "minimal" | "floral" | "y2k";

export interface PhotoFrame {
  id: FrameId;
  label: string;
  emoji: string;
  // Background color of the strip paper
  paperColor: string;
  // Border/accent color
  accentColor: string;
  // Label text color
  textColor: string;
  // Decorative sticker characters shown on the strip
  stickers: string[];
}

export const FRAMES: PhotoFrame[] = [
  {
    id: "none",
    label: "No Frame",
    emoji: "⬜",
    paperColor: "#ffffff",
    accentColor: "#e5e7eb",
    textColor: "#6b7280",
    stickers: [],
  },
  {
    id: "pastel",
    label: "Pastel Dream",
    emoji: "🌸",
    paperColor: "#fce7f3",
    accentColor: "#f9a8d4",
    textColor: "#be185d",
    stickers: ["🌸", "💗", "🌷", "✨", "🦋"],
  },
  {
    id: "retro",
    label: "Retro Film",
    emoji: "📷",
    paperColor: "#fefce8",
    accentColor: "#fcd34d",
    textColor: "#92400e",
    stickers: ["📷", "🎞️", "⭐", "🌟", "💛"],
  },
  {
    id: "minimal",
    label: "Minimal",
    emoji: "🤍",
    paperColor: "#f8fafc",
    accentColor: "#cbd5e1",
    textColor: "#334155",
    stickers: ["·", "○", "△", "◇"],
  },
  {
    id: "floral",
    label: "Floral Garden",
    emoji: "🌿",
    paperColor: "#f0fdf4",
    accentColor: "#86efac",
    textColor: "#14532d",
    stickers: ["🌿", "🌻", "🍀", "🌼", "🪷"],
  },
  {
    id: "y2k",
    label: "Y2K Glam",
    emoji: "💜",
    paperColor: "#faf5ff",
    accentColor: "#c084fc",
    textColor: "#581c87",
    stickers: ["💜", "⚡", "🦄", "🌙", "💫", "🔮"],
  },
];

export function getFrame(id: FrameId): PhotoFrame {
  return FRAMES.find((f) => f.id === id) ?? FRAMES[0];
}
