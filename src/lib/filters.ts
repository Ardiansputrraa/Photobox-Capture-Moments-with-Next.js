export type FilterId = "none" | "grayscale" | "vintage" | "warm" | "cool" | "vivid" | "soft";

export interface PhotoFilter {
  id: FilterId;
  label: string;
  emoji: string;
  cssFilter: string;
  color: string;
}

export const FILTERS: PhotoFilter[] = [
  {
    id: "none",
    label: "Original",
    emoji: "✨",
    cssFilter: "none",
    color: "#f9fafb",
  },
  {
    id: "grayscale",
    label: "B&W",
    emoji: "🎞️",
    cssFilter: "grayscale(100%)",
    color: "#6b7280",
  },
  {
    id: "vintage",
    label: "Vintage",
    emoji: "🟤",
    cssFilter: "sepia(60%) contrast(1.1) brightness(0.95)",
    color: "#b45309",
  },
  {
    id: "warm",
    label: "Warm",
    emoji: "🌅",
    cssFilter: "saturate(1.3) hue-rotate(-15deg) brightness(1.05)",
    color: "#f97316",
  },
  {
    id: "cool",
    label: "Cool",
    emoji: "🩵",
    cssFilter: "saturate(0.9) hue-rotate(20deg) brightness(1.05)",
    color: "#0ea5e9",
  },
  {
    id: "vivid",
    label: "Vivid",
    emoji: "🌈",
    cssFilter: "saturate(1.8) contrast(1.1)",
    color: "#8b5cf6",
  },
  {
    id: "soft",
    label: "Soft",
    emoji: "🌸",
    cssFilter: "brightness(1.1) contrast(0.9) saturate(0.8)",
    color: "#f472b6",
  },
];

export function getFilter(id: FilterId): PhotoFilter {
  return FILTERS.find((f) => f.id === id) ?? FILTERS[0];
}
