"use client";

import { Search, Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ClipType } from "@/app/model/clip";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: ClipType | null;
  setSelectedType: (type: ClipType | null) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  isNewClipModalOpen: boolean;
  setIsNewClipModalOpen: (isOpen: boolean) => void;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  hasActiveFilters,
  clearFilters,
  isNewClipModalOpen,
  setIsNewClipModalOpen,
}: FilterBarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search your clips..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="mr-1 h-4 w-4" />
            Clear Filters
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedType("article")}>
              Articles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("code")}>
              Code Snippets
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("quote")}>
              Quotes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("link")}>
              Links
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => setIsNewClipModalOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          New Clip
        </Button>
      </div>
    </header>
  );
}
