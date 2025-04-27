"use client";

import type React from "react";

import { useState } from "react";
import { X, BookOpen, Code, Quote, LinkIcon } from "lucide-react";
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
import type { Clip, ClipType } from "@/app/model/clip";

interface NewClipModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (clip: Omit<Clip, "id" | "date">) => void;
}

export function NewClipModal({
  isOpen,
  onOpenChange,
  onSave,
}: NewClipModalProps) {
  const [newClip, setNewClip] = useState<Omit<Clip, "id" | "date">>({
    title: "",
    content: "",
    type: "article",
    tags: [],
    url: null,
  });

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim().toLowerCase();
      if (!newClip.tags.includes(newTag)) {
        setNewClip({ ...newClip, tags: [...newClip.tags, newTag] });
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewClip({
      ...newClip,
      tags: newClip.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newClip);
    // Reset form
    setNewClip({
      title: "",
      content: "",
      type: "article",
      tags: [],
      url: null,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Clip</DialogTitle>
            <DialogDescription>
              Create a new clip to save in your personal library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newClip.title}
                onChange={(e) =>
                  setNewClip({ ...newClip, title: e.target.value })
                }
                placeholder="Enter a title for your clip"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newClip.content}
                onChange={(e) =>
                  setNewClip({ ...newClip, content: e.target.value })
                }
                placeholder="Enter the content you want to save"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <RadioGroup
                value={newClip.type}
                onValueChange={(value) =>
                  setNewClip({ ...newClip, type: value as ClipType })
                }
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="article" id="article" />
                  <Label
                    htmlFor="article"
                    className="cursor-pointer flex items-center"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Article
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="code" id="code" />
                  <Label
                    htmlFor="code"
                    className="cursor-pointer flex items-center"
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="quote" id="quote" />
                  <Label
                    htmlFor="quote"
                    className="cursor-pointer flex items-center"
                  >
                    <Quote className="h-4 w-4 mr-1" />
                    Quote
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="link" id="link" />
                  <Label
                    htmlFor="link"
                    className="cursor-pointer flex items-center"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Link
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {newClip.type === "link" && (
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={newClip.url || ""}
                  onChange={(e) =>
                    setNewClip({ ...newClip, url: e.target.value })
                  }
                  placeholder="https://example.com"
                  required={newClip.type === "link"}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newClip.tags.map((tag) => (
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
                onKeyDown={handleTagInput}
              />
              <p className="text-xs text-muted-foreground">
                Press Enter to add a tag
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Clip</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
