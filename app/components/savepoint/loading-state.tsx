"use client";

import { Loader2 } from "lucide-react";
import { SavePointSidebar } from "./sidebar";
import { FilterBar } from "./filter-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useMediaQuery } from "@/hooks/use-mobile";

interface LoadingStateProps {
  isMobile: boolean;
}

export function LoadingState({ isMobile }: LoadingStateProps) {
  return (
    <SidebarProvider>
      <div className="app-ambient flex min-h-screen w-full">
        <SavePointSidebar
          allTags={[]}
          selectedTags={[]}
          selectedType={null}
          onTagSelect={() => {}}
          onTypeSelect={() => {}}
          isMobile={isMobile}
        />

        <div className="flex-1">
          <FilterBar
            searchQuery=""
            setSearchQuery={() => {}}
            selectedType={null}
            setSelectedType={() => {}}
            hasActiveFilters={false}
            clearFilters={() => {}}
            isNewClipModalOpen={false}
            setIsNewClipModalOpen={() => {}}
          />

          <main className="p-6">
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
              <p className="mt-4 text-lg text-muted-foreground">
                Loading your clips...
              </p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
