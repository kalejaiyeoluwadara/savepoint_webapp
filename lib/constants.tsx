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
