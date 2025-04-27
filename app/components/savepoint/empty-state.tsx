"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="rounded-full bg-muted p-6">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-xl font-semibold">No clips found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filter criteria
      </p>
      <Button className="mt-4" onClick={onClearFilters}>
        Clear all filters
      </Button>
    </div>
  );
}
