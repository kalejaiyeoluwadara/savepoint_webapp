import { useSession } from "next-auth/react";
import { useState } from "react";

export type ClipType = "article" | "code" | "quote" | "link" | "work";

export type Clip = {
  _id: string;
  title: string;
  type: ClipType;
  content: string;
  url?: string;
  tags: string[];
  createdAt: string;
};
