"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { tagColors } from "@/lib/constants";
import type { Clip, ClipType } from "@/app/model/clip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { sampleClips } from "@/data/sample-clips";
import { SavePointSidebar } from "./savepoint/sidebar";
import { FilterBar } from "./savepoint/filter-bar";
import ClipCard from "./ClipCard";
import { NewClipModal } from "./savepoint/new-clip-modal";
// import { EmptyState } from "./savepoint/empty-state";

export function SavePointDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<ClipType | null>(null);
  const [isNewClipModalOpen, setIsNewClipModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Get all unique tags
  const allTags = Array.from(new Set(sampleClips.flatMap((clip) => clip.tags)));

  // Filter clips based on search, tags, and type
  const filteredClips = sampleClips.filter((clip) => {
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

  const handleAddNewClip = (newClip: Omit<Clip, "id" | "date">) => {
    // Here you would typically save the new clip to your database
    console.log("New clip:", newClip);
    setIsNewClipModalOpen(false);
  };

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClips.map((clip) => (
                <ClipCard
                  key={clip.id}
                  clip={{
                    ...clip,
                    _id: String(clip.id),
                    createdAt: new Date().toISOString(),
                    url: clip.url ?? undefined,
                  }}
                  onTagClick={handleTagSelect}
                  onDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              ))}
            </div>

            {filteredClips.length === 0 && <p>Empty</p>}
          </main>
        </div>

        <NewClipModal
          isOpen={isNewClipModalOpen}
          onOpenChange={setIsNewClipModalOpen}
          onSave={handleAddNewClip}
        />
      </div>
    </SidebarProvider>
  );
}
