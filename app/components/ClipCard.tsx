"use client";
import { Link } from "lucide-react";
import { useState } from "react";
import { ClipType } from "../model/clip";

type Clip = {
  _id: string;
  title: string;
  content: string;
  url?: string;
  tags: string[];
  createdAt: string;
  type?: ClipType;
};

type ClipCardProps = {
  clip: Clip;
  onDelete: () => void;
  onTagClick?: (tag: string) => void;
};

export default function ClipCard({
  clip,
  onDelete,
  onTagClick,
}: ClipCardProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to truncate content for preview
  const truncateContent = (content: string, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // Determine if this is code or article based on clip type or content
  const isCode =
    clip.type === "code" ||
    clip.content.includes("{") ||
    clip.content.includes(";");

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm w-full">
      <div className="flex items-center gap-2 mb-2">
        {/* Icon based on clip type */}
        <div className="flex items-center justify-center">
          {isCode ? (
            <div className="bg-gray-100 p-1 rounded">
              <span className="text-gray-700 font-mono">&lt;&gt;</span>
            </div>
          ) : (
            <div className="bg-gray-100 p-1 rounded">
              <span className="text-gray-700">📄</span>
            </div>
          )}
        </div>

        {/* Date display */}
        <span className="text-sm text-gray-500">
          {formatDate(clip.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{clip.title}</h3>

      {/* Content preview */}
      {isCode ? (
        <div className="bg-gray-100 p-4 rounded-md mb-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap">
            {truncateContent(clip.content)}
          </pre>
        </div>
      ) : (
        <p className="text-gray-700 mb-4">{truncateContent(clip.content)}</p>
      )}

      {/* URL link */}
      {clip.url && (
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 flex items-center font-medium hover:text-blue-600 mb-4"
        >
          <Link className="inline-block mr-1" size={16} />
          {clip.url}
        </a>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-1">
        {clip.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => onTagClick && onTagClick(tag)}
            className={`text-xs px-3 py-1 rounded-full cursor-pointer ${
              tag === "react"
                ? "bg-blue-100 text-blue-700"
                : tag === "frontend"
                ? "bg-purple-100 text-purple-700"
                : tag === "javascript"
                ? "bg-yellow-100 text-yellow-700"
                : tag === "css"
                ? "bg-pink-100 text-pink-700"
                : tag === "design"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
