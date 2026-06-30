import { ClipType } from "@/app/model/clip";
import { BookOpen, Code, Quote, LinkIcon } from "lucide-react";
import type { JSX } from "react";

// Tag colors with proper TypeScript typing
export const tagColors: Record<string, string> = {
  react: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  frontend: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  javascript: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  css: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  design: "bg-green-100 text-green-800 hover:bg-green-200",
  inspiration: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  development: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  hosting: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  async: "bg-red-100 text-red-800 hover:bg-red-200",
  programming: "bg-slate-100 text-slate-800 hover:bg-slate-200",
};

// Type icons with proper TypeScript typing
export const typeIcons: Record<ClipType, JSX.Element> = {
  article: <BookOpen className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
  quote: <Quote className="h-4 w-4" />,
  link: <LinkIcon className="h-4 w-4" />,
  work: <Code className="h-4 w-4" />,
};

// Per-type accent system used across the card: a solid chip for the type
// icon, a matching label, and the colored glow the card picks up on hover.
export const typeAccents: Record<
  ClipType,
  { chip: string; glow: string; label: string }
> = {
  article: {
    chip: "bg-blue-500",
    glow: "group-hover:shadow-blue-500/20 group-hover:border-blue-200",
    label: "Article",
  },
  code: {
    chip: "bg-emerald-500",
    glow: "group-hover:shadow-emerald-500/20 group-hover:border-emerald-200",
    label: "Code",
  },
  quote: {
    chip: "bg-amber-500",
    glow: "group-hover:shadow-amber-500/20 group-hover:border-amber-200",
    label: "Quote",
  },
  link: {
    chip: "bg-violet-500",
    glow: "group-hover:shadow-violet-500/20 group-hover:border-violet-200",
    label: "Link",
  },
  work: {
    chip: "bg-indigo-500",
    glow: "group-hover:shadow-indigo-500/20 group-hover:border-indigo-200",
    label: "Work",
  },
};

// Deterministic fallback palette for tags not present in `tagColors`,
// so arbitrary user tags still get a stable, consistent color.
const fallbackTagColors = [
  "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  "bg-purple-100 text-purple-800 hover:bg-purple-200",
  "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  "bg-pink-100 text-pink-800 hover:bg-pink-200",
  "bg-green-100 text-green-800 hover:bg-green-200",
  "bg-orange-100 text-orange-800 hover:bg-orange-200",
  "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  "bg-red-100 text-red-800 hover:bg-red-200",
  "bg-slate-100 text-slate-800 hover:bg-slate-200",
];

export function getTagColor(tag: string): string {
  const known = tagColors[tag];
  if (known) return known;
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return fallbackTagColors[hash % fallbackTagColors.length];
}
