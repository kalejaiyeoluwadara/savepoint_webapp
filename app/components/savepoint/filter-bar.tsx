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
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-white/40 bg-white/55 p-3 backdrop-blur-xl sm:gap-3 sm:p-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger />
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search your clips..."
            className="w-full rounded-full border-white/60 bg-white/70 pl-9 shadow-sm backdrop-blur focus-visible:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="rounded-full border-white/60 bg-white/70 backdrop-blur"
          >
            <X className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Clear Filters</span>
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/60 bg-white/70 backdrop-blur"
            >
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
        <Button
          onClick={() => setIsNewClipModalOpen(true)}
          className="rounded-full bg-violet-600 text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/30"
        >
          <Plus className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">New Clip</span>
        </Button>
      </div>
    </header>
  );
}
