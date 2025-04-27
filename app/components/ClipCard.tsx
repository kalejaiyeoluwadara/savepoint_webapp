// components/ClipCard.tsx
"use client";
import { Link } from "lucide-react";
import { useState } from "react";

type Clip = {
  _id: string;
  title: string;
  content: string;
  url?: string;
  tags: string[];
  createdAt: string;
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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{clip.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => copyToClipboard(clip.content)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{clip.content}</p>

      {clip.url && (
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 flex text-xs items-center font-medium hover:underline  mb-3"
        >
          <Link className="inline-block mr-1" size={16} />
          {clip.url}
        </a>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        {clip.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-500">
        Saved on {formatDate(clip.createdAt)}
      </p>
    </div>
  );
}
