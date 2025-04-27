"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import { tagColors } from "@/lib/constants";
import { typeIcons } from "@/lib/constants";
import type { Clip } from "@/app/model/clip";

interface ClipCardProps {
  clip: Clip;
  onTagClick: (tag: string) => void;
}

export function ClipCard({ clip, onTagClick }: ClipCardProps) {
  return (
    <Card key={clip.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="px-2 py-0">
            {typeIcons[clip.type]}
            <span className="ml-1 text-xs">{clip.type}</span>
          </Badge>
          <span className="text-xs text-muted-foreground">{clip.date}</span>
        </div>
        <CardTitle className="line-clamp-1 text-lg">{clip.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div
          className={cn(
            "max-h-32 overflow-hidden text-sm text-muted-foreground",
            clip.type === "code"
              ? "whitespace-pre rounded bg-muted p-2 font-mono"
              : ""
          )}
        >
          {clip.content}
        </div>
        {clip.url && (
          <a
            href={clip.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center text-xs text-primary hover:underline"
          >
            <LinkIcon className="mr-1 h-3 w-3" />
            {clip.url}
          </a>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1 pt-2">
        {clip.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className={cn(
              "cursor-pointer text-xs",
              tagColors[tag] || "bg-gray-100"
            )}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
