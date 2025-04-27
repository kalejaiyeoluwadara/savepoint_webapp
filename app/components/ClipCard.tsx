"use client";
import { BadgeCheck, Link, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { ClipType } from "../model/clip";
import moment from "moment";

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
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm w-full relative group">
      {/* Action buttons that appear on hover */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => copyToClipboard(clip.content)}
          className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          title="Copy content"
        >
          {copied ? (
            <BadgeCheck size={16} className="text-green-600" />
          ) : (
            <Copy size={16} />
          )}
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
          title="Delete clip"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex justify-between items-center w-full mb-2">
        {/* Icon based on clip type */}
        <div className="flex">
          {isCode ? (
            <div className="bg-gray-100 p-1 rounded">
              <span className="text-gray-700 font-mono">&lt;&gt;</span>
            </div>
          ) : (
            <div className="p-1 rounded">
              <BadgeCheck size={16} />
            </div>
          )}
        </div>

        {/* Date display */}
        <p className="text-xs text-end text-gray-500">
          {moment(clip.createdAt).fromNow()}
        </p>
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
        <p className="text-gray-700 mb-4 min-h-[100px]">
          {truncateContent(clip.content)}
        </p>
      )}

      {/* URL link */}
      {clip.url && (
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 flex text-xs items-center font-medium hover:text-blue-600 mb-4"
        >
          <Link className="inline-block mr-1" size={14} />
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
                : tag === "work"
                ? "bg-purple-100 text-purple-700"
                : tag === "important"
                ? "bg-yellow-100 text-yellow-700"
                : tag === "home"
                ? "bg-pink-100 text-pink-700"
                : tag === "remember"
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
