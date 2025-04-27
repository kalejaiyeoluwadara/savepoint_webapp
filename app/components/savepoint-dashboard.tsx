"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { SavePointSidebar } from "./savepoint/sidebar";
import { FilterBar } from "./savepoint/filter-bar";
import ClipCard from "./ClipCard";
import { NewClipModal } from "./savepoint/new-clip-modal";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { tagColors } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/use-mobile";

import type { Clip, ClipType } from "@/app/model/clip";
import { ApiRoutes } from "../api/apiRoute";

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

  const deleteClip = async (id: string) => {
    if (!confirm("Are you sure you want to delete this clip?")) return;

    try {
      const res = await fetch(`${ApiRoutes.BASE_URL}/api/clips/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete clip");
      }

      setClips(clips.filter((clip) => clip._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (status === "loading" || loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <SavePointSidebar
          allTags={allTags}
          selectedTags={selectedTags}
          selectedType={selectedType}
          onTagSelect={handleTagSelect}
          onTypeSelect={handleTypeSelect}
          isMobile={isMobile}
        />

        <div className="flex-1">
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

          <main className="container mx-auto p-4">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {selectedTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "cursor-pointer",
                      tagColors[tag] || "bg-gray-100"
                    )}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            {filteredClips.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded">
                <p className="text-lg text-gray-600">No clips found</p>
                <p className="text-gray-500">
                  Try adjusting your filters or search
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredClips.map((clip) => (
                  <ClipCard
                    key={clip._id}
                    clip={clip}
                    onTagClick={handleTagSelect}
                    onDelete={() => deleteClip(clip._id)}
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
      </div>
    </SidebarProvider>
  );
}
