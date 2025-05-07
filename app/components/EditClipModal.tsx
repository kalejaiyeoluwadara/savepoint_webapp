"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Clip } from "../model/clip";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditClipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clip: Clip;
  onUpdate: (updatedClip: Clip) => void;
};

export default function EditClipModal({
  isOpen,
  onClose,
  clip,
  onUpdate,
}: EditClipModalProps) {
  const [editedClip, setEditedClip] = useState<Clip>(clip);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedClip(clip);
  }, [clip]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedClip((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      onUpdate(editedClip);
      onClose();
      toast.success("Clip updated successfully!");
    } catch (error) {
      toast.error("Failed to update clip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <form
          className="flex flex-col w-full gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Clip</DialogTitle>
            <DialogDescription>
              Make changes to your clip here.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 py-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={editedClip.title}
                onChange={handleChange}
                placeholder="Enter a title for your clip"
                required
              />
            </div>

            {/* Content */}
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={editedClip.content}
                onChange={handleChange}
                placeholder="Enter the content you want to save"
                className="min-h-[100px]"
                required
              />
            </div>

            {/* URL */}
            <div className="grid gap-2">
              <Label htmlFor="url">URL (optional)</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={editedClip.url || ""}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
