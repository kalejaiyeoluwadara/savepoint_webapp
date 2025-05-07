"use client";

import { useState } from "react";
import { X, BookOpen, Code, BadgeAlert, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { tagColors } from "@/lib/constants";
import { ApiRoutes } from "@/app/api/apiRoute";
import { toast } from "sonner";

interface NewClipModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddClip: (clip: any) => void;
  token: string | undefined;
}

export function NewClipModal({
  isOpen,
  onOpenChange,
  onAddClip,
  token,
}: NewClipModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [clipType, setClipType] = useState<
    "work" | "code" | "important" | "link"
  >("work");
  const [tags, setTags] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Always add the clipType as a tag
      const tagsToSend = [...tags];
      if (!tagsToSend.includes(clipType)) {
        tagsToSend.push(clipType);
      }

      const clipData = {
        title,
        content,
        tags: tagsToSend,
        url: clipType === "link" ? url : undefined,
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
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || "Failed to create clip";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await res.json();
      onAddClip(data.data);

      // Reset form
      toast.success("Clip created successfully!");
      setTitle("");
      setContent("");
      setClipType("work");
      setTags([]);
      setUrl("");
      setTagInput("");
      onOpenChange(false); // Close modal after success
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Clip</DialogTitle>
            <DialogDescription>
              Create a new clip to save in your library.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 py-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                className="w-full"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your clip"
                required
              />
            </div>

            {/* Content */}
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the content you want to save"
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Type */}
            <div className="grid gap-2">
              <Label>Type</Label>
              <RadioGroup
                value={clipType}
                onValueChange={(value) => setClipType(value as any)}
                className="flex flex-wrap gap-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="work" id="work" />
                  <Label
                    htmlFor="work"
                    className="cursor-pointer flex items-center text-sm"
                  >
                    <BookOpen className="h-4 w-4 mr-1" /> Work
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="important" id="important" />
                  <Label
                    htmlFor="important"
                    className="cursor-pointer flex items-center text-sm"
                  >
                    <BadgeAlert className="h-4 w-4 mr-1" /> Important
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="code" id="code" />
                  <Label
                    htmlFor="code"
                    className="cursor-pointer flex items-center text-sm"
                  >
                    <Code className="h-4 w-4 mr-1" /> Code
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="link" id="link" />
                  <Label
                    htmlFor="link"
                    className="cursor-pointer flex items-center text-sm"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" /> Link
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* URL (only if type is link) */}
            {clipType === "link" && (
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>
            )}

            {/* Tags */}
            <div className="grid ">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "cursor-pointer",
                      tagColors[tag] || "bg-gray-100"
                    )}
                  >
                    {tag}
                    <X
                      className="ml-1 h-3 w-3"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                id="tags"
                placeholder="Type a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
              />
              <p className="text-xs mt-2 text-muted-foreground">
                Press Enter to add a tag
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Saving..." : "Save Clip"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
