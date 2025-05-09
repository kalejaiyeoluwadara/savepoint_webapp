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
import { ApiRoutes } from "@/app/api/apiRoute";

type EditClipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clip: Clip;
  onUpdate: (updatedClip: Clip) => void;
  token: string | undefined;
};

export default function EditClipModal({
  isOpen,
  onClose,
  clip,
  onUpdate,
  token,
}: EditClipModalProps) {
  const [editedClip, setEditedClip] = useState<Clip>(clip);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${ApiRoutes.BASE_URL}/api/clips/${clip._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedClip),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || "Failed to update clip";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await res.json();
      onUpdate(data.data);
      onClose();
      toast.success("Clip updated successfully!");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <form className="flex flex-col w-full gap-3" onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Edit Clip</DialogTitle>
            <DialogDescription>
              Make changes to your clip here.
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
