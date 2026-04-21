// Grid layout templates — defines how photos are arranged
export type GridId = "strip-4" | "strip-3" | "grid-2x2" | "duo" | "trio-l";

export interface GridTemplate {
  id: GridId;
  label: string;
  description: string;
  photoCount: number;
  emoji: string;
  // Layout: [col, row, colSpan, rowSpan] in a CSS grid
  layout: {
    cols: number;
    rows: number;
    cells: { col: number; row: number; colSpan: number; rowSpan: number }[];
  };
  // Canvas output dimensions
  canvas: {
    width: number;
    height: number;
    padding: number;
    gap: number;
    slots: { x: number; y: number; w: number; h: number }[];
  };
}

export const GRID_TEMPLATES: GridTemplate[] = [
  {
    id: "strip-4",
    label: "Classic Strip",
    description: "4 foto vertikal — gaya photobox klasik",
    photoCount: 4,
    emoji: "📽️",
    layout: {
      cols: 1,
      rows: 4,
      cells: [
        { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
        { col: 1, row: 2, colSpan: 1, rowSpan: 1 },
        { col: 1, row: 3, colSpan: 1, rowSpan: 1 },
        { col: 1, row: 4, colSpan: 1, rowSpan: 1 },
      ],
    },
    canvas: {
      width: 360,
      height: 1080,
      padding: 20,
      gap: 12,
      slots: [
        { x: 20, y: 20, w: 320, h: 240 },
        { x: 20, y: 272, w: 320, h: 240 },
        { x: 20, y: 524, w: 320, h: 240 },
        { x: 20, y: 776, w: 320, h: 240 },
      ],
    },
  },
  {
    id: "strip-3",
    label: "Triple Strip",
    description: "3 foto vertikal dengan ukuran lebih besar",
    photoCount: 3,
    emoji: "🎞️",
    layout: {
      cols: 1,
      rows: 3,
      cells: [
        { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
        { col: 1, row: 2, colSpan: 1, rowSpan: 1 },
        { col: 1, row: 3, colSpan: 1, rowSpan: 1 },
      ],
    },
    canvas: {
      width: 360,
      height: 900,
      padding: 20,
      gap: 12,
      slots: [
        { x: 20, y: 20, w: 320, h: 270 },
        { x: 20, y: 302, w: 320, h: 270 },
        { x: 20, y: 584, w: 320, h: 270 },
      ],
    },
  },
  {
    id: "grid-2x2",
    label: "Grid 2×2",
    description: "4 foto dalam grid kotak — like VSCO collage",
    photoCount: 4,
    emoji: "⊞",
    layout: {
      cols: 2,
      rows: 2,
      cells: [
        { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
        { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
        { col: 1, row: 2, colSpan: 1, rowSpan: 1 },
        { col: 2, row: 2, colSpan: 1, rowSpan: 1 },
      ],
    },
    canvas: {
      width: 720,
      height: 720,
      padding: 20,
      gap: 12,
      slots: [
        { x: 20, y: 20, w: 334, h: 334 },
        { x: 366, y: 20, w: 334, h: 334 },
        { x: 20, y: 366, w: 334, h: 334 },
        { x: 366, y: 366, w: 334, h: 334 },
      ],
    },
  },
  {
    id: "duo",
    label: "Duo",
    description: "2 foto berdampingan — simple & clean",
    photoCount: 2,
    emoji: "🫶",
    layout: {
      cols: 2,
      rows: 1,
      cells: [
        { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
        { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
      ],
    },
    canvas: {
      width: 720,
      height: 400,
      padding: 20,
      gap: 12,
      slots: [
        { x: 20, y: 20, w: 334, h: 360 },
        { x: 366, y: 20, w: 334, h: 360 },
      ],
    },
  },
  {
    id: "trio-l",
    label: "Trio L-Shape",
    description: "1 besar + 2 kecil — layout majalah",
    photoCount: 3,
    emoji: "🗞️",
    layout: {
      cols: 2,
      rows: 2,
      cells: [
        { col: 1, row: 1, colSpan: 1, rowSpan: 2 },
        { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
        { col: 2, row: 2, colSpan: 1, rowSpan: 1 },
      ],
    },
    canvas: {
      width: 720,
      height: 720,
      padding: 20,
      gap: 12,
      slots: [
        { x: 20, y: 20, w: 334, h: 680 },
        { x: 366, y: 20, w: 334, h: 334 },
        { x: 366, y: 366, w: 334, h: 334 },
      ],
    },
  },
];

export function getTemplate(id: GridId): GridTemplate {
  return GRID_TEMPLATES.find((t) => t.id === id) ?? GRID_TEMPLATES[0];
}
