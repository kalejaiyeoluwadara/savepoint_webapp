"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { SavePointSidebar } from "./savepoint/sidebar";
import { FilterBar } from "./savepoint/filter-bar";
import ClipCard from "./ClipCard";
import { NewClipModal } from "./savepoint/new-clip-modal";
import { DeleteClipModal } from "./DeleteClipModal";
import EditClipModal from "./EditClipModal";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { getTagColor } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/use-mobile";

import type { Clip, ClipType } from "@/app/model/clip";
import { ApiRoutes } from "../api/apiRoute";
import { EmptyState } from "./savepoint/empty-state";
import { LoadingState } from "./savepoint/loading-state";

export function SavePointDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isNewClipModalOpen, setIsNewClipModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<ClipType | null>(null);

  // Add state for delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clipToDelete, setClipToDelete] = useState<Clip | null>(null);

  // Add state for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clipToEdit, setClipToEdit] = useState<Clip | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchClips = async () => {
      if (status !== "authenticated") return;

      try {
        const res = await fetch(`${ApiRoutes.BASE_URL}/api/clips`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch clips");
        }

        const data = await res.json();
        setClips(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClips();
  }, [session, status]);

  const allTags = Array.from(new Set(clips.flatMap((clip) => clip.tags)));

  const filteredClips = clips.filter((clip) => {
    const matchesSearch =
      searchQuery === "" ||
      clip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clip.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => clip.tags.includes(tag));

    const matchesType = selectedType === null || clip.type === selectedType;

    return matchesSearch && matchesTags && matchesType;
  });

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleTypeSelect = (type: ClipType | null) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedType(null);
    setSearchQuery("");
  };

  const addClip = (newClip: Clip) => {
    setClips([newClip, ...clips]);
  };

  // Updated to open the delete modal instead of using confirm()
  const handleDeleteClick = (clip: Clip) => {
    setClipToDelete(clip);
    setDeleteModalOpen(true);
  };

  // This function will be called after successful deletion
  const handleDeleteSuccess = (id: string) => {
    setClips(clips.filter((clip) => clip._id !== id));
  };

  // Handle edit click
  const handleEditClick = (clip: Clip) => {
    setClipToEdit(clip);
    setEditModalOpen(true);
  };

  // Handle successful update
  const handleUpdateSuccess = (updatedClip: Clip) => {
    setClips(
      clips.map((clip) => (clip._id === updatedClip._id ? updatedClip : clip))
    );
  };

  if (status === "loading" || loading) {
    return <LoadingState isMobile={isMobile} />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="app-ambient ambient-drift flex min-h-screen w-full">
        <SavePointSidebar
          allTags={allTags}
          selectedTags={selectedTags}
          selectedType={selectedType}
          onTagSelect={handleTagSelect}
          onTypeSelect={handleTypeSelect}
          isMobile={isMobile}
        />

        <div className="min-w-0 flex-1">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            hasActiveFilters={selectedTags.length > 0 || selectedType !== null}
            clearFilters={clearFilters}
            isNewClipModalOpen={isNewClipModalOpen}
            setIsNewClipModalOpen={setIsNewClipModalOpen}
          />

          <main className="w-full p-4 sm:p-6">
            {error && (
              <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {selectedTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn("cursor-pointer", getTagColor(tag))}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            {filteredClips.length === 0 ? (
              <EmptyState onClearFilters={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredClips.map((clip) => (
                  <ClipCard
                    key={clip._id}
                    clip={clip}
                    onTagClick={handleTagSelect}
                    onDelete={() => handleDeleteClick(clip)}
                    onEdit={handleEditClick}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        <NewClipModal
          isOpen={isNewClipModalOpen}
          onOpenChange={setIsNewClipModalOpen}
          token={session?.user.token}
          onAddClip={addClip}
        />

        {/* Add the DeleteClipModal */}
        {clipToDelete && (
          <DeleteClipModal
            isOpen={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            clipId={clipToDelete._id}
            clipTitle={clipToDelete.title}
            token={session?.user.token}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}

        {/* Add the EditClipModal */}
        {clipToEdit && (
          <EditClipModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            clip={clipToEdit}
            onUpdate={handleUpdateSuccess}
            token={session?.user.token}
          />
        )}
      </div>
    </SidebarProvider>
  );
}
