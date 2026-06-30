"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center text-center">
      <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg shadow-violet-950/5 backdrop-blur-xl">
        <Search className="h-10 w-10 text-violet-500" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">
        No clips here yet
      </h3>
      <p className="mt-1 max-w-sm text-muted-foreground">
        Nothing matches your search and filters. Loosen them to see more of your
        library.
      </p>
      <Button
        className="mt-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-600/20 hover:from-violet-600 hover:to-fuchsia-600"
        onClick={onClearFilters}
      >
        Clear all filters
      </Button>
    </div>
  );
}
