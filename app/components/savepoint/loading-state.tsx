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
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
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
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
