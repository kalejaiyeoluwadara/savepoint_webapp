"use client";
import { BadgeCheck, Link, Copy, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Clip } from "../model/clip";
import moment from "moment";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getTagColor, typeIcons, typeAccents } from "@/lib/constants";

type ClipCardProps = {
  clip: Clip;
  onDelete: () => void;
  onEdit: (clip: Clip) => void;
  onTagClick?: (tag: string) => void;
};

export default function ClipCard({
  clip,
  onDelete,
  onEdit,
  onTagClick,
}: ClipCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.info("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const isCode = clip.type === "code";
  const accent = typeAccents[clip.type] ?? typeAccents.work;

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col rounded-lg border border-l-4 border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5",
        accent.border
      )}
    >
      {/* Action buttons — always visible on mobile, on hover for pointer devices */}
      <div className="absolute right-3 top-3 flex space-x-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
        <button
          onClick={() => copyToClipboard(clip.content)}
          className="rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Copy content"
        >
          {copied ? (
            <BadgeCheck size={16} className="text-emerald-600" />
          ) : (
            <Copy size={16} />
          )}
        </button>
        <button
          onClick={() => onEdit(clip)}
          className="rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Edit clip"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={onDelete}
          className="rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-red-100 hover:text-red-600"
          title="Delete clip"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Header: type chip + date */}
      <div className="mb-3 flex w-full items-center justify-between pr-24">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md",
            accent.icon
          )}
        >
          {typeIcons[clip.type] ?? typeIcons.work}
        </div>
        <p className="text-xs text-muted-foreground">
          {moment(clip.createdAt).fromNow()}
        </p>
      </div>

      {/* Title */}
      <h3 className="mb-2 break-words text-lg font-bold leading-snug text-card-foreground">
        {clip.title}
      </h3>

      {/* Content preview */}
      {isCode ? (
        <div className="mb-3 overflow-x-auto rounded-md bg-muted p-3 font-mono text-sm">
          <pre className="line-clamp-4 whitespace-pre-wrap break-words">
            {clip.content}
          </pre>
        </div>
      ) : (
        <p className="mb-3 line-clamp-4 break-words text-sm text-muted-foreground">
          {clip.content}
        </p>
      )}

      {/* URL link */}
      {clip.url && (
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex items-center break-all text-xs font-medium text-muted-foreground transition-colors hover:text-blue-600"
        >
          <Link className="mr-1 inline-block flex-shrink-0" size={14} />
          <span className="truncate">{clip.url}</span>
        </a>
      )}

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {clip.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => onTagClick && onTagClick(tag)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-xs transition-colors",
              getTagColor(tag)
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
