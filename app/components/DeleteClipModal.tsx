"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ApiRoutes } from "@/app/api/apiRoute";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteClipModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  clipId: string;
  clipTitle: string;
  token: string | undefined;
  onDeleteSuccess: (id: string) => void;
}

export function DeleteClipModal({
  isOpen,
  onOpenChange,
  clipId,
  clipTitle,
  token,
  onDeleteSuccess,
}: DeleteClipModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!clipId || !token) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`${ApiRoutes.BASE_URL}/api/clips/${clipId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete clip");
      }

      toast.success("Clip deleted successfully");
      onDeleteSuccess(clipId);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Error deleting clip");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-medium">"{clipTitle}"</span>
            and remove it from our servers. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e: any) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
