export type ClipType = "article" | "code" | "quote" | "link";

export interface Clip {
  id: number;
  title: string;
  content: string;
  type: ClipType;
  tags: string[];
  date: string;
  url: string | null;
}
