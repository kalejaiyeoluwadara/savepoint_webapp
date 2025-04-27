// components/NewClipForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { ApiRoutes } from "../api/apiRoute";

type NewClipFormProps = {
  onAddClip: (clip: any) => void;
  token: string | undefined;
};

export default function NewClipForm({ onAddClip, token }: NewClipFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const clipData = {
        title,
        content,
        url: url || undefined,
        tags: tagArray,
      };

      const res = await fetch(`${ApiRoutes.BASE_URL}/api/clips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clipData),
      });

      if (!res.ok) {
        throw new Error("Failed to create clip");
      }

      const data = await res.json();
      onAddClip(data.data);

      // Reset form
      setTitle("");
      setContent("");
      setUrl("");
      setTags("");
      setShowForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded flex items-center justify-center"
      >
        <span className="mr-2">+</span> Add New Clip
      </button>
    );
  }

  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Add New Clip</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded h-24"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block mb-1 text-sm font-medium">
            URL (optional)
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block mb-1 text-sm font-medium">
            Tags (comma separated, optional)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="work, article, code, ..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Save Clip"}
        </button>
      </form>
    </div>
  );
}
