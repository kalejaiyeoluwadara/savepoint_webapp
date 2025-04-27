"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  BookOpen,
  Clock,
  Calendar,
  Code,
  Quote,
  LinkIcon,
  Tag,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { ClipType } from "@/app/model/clip";

interface SavePointSidebarProps {
  allTags: string[];
  selectedTags: string[];
  selectedType: ClipType | null;
  onTagSelect: (tag: string) => void;
  onTypeSelect: (type: ClipType | null) => void;
  isMobile: boolean;
}

export function SavePointSidebar({
  allTags,
  selectedTags,
  selectedType,
  onTagSelect,
  onTypeSelect,
  isMobile,
}: SavePointSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Sidebar variant={isMobile ? "sidebar" : "floating"} collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="font-semibold">SavePoint</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Auth Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {session ? (
                <>
                  <SidebarMenuItem>
                    <Link href="/dashboard" className="w-full">
                      <SidebarMenuButton isActive={pathname === "/dashboard"}>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => signOut()}>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <>
                  <SidebarMenuItem>
                    <Link href="/auth/login" className="w-full">
                      <SidebarMenuButton isActive={pathname === "/auth/login"}>
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/auth/register" className="w-full">
                      <SidebarMenuButton
                        isActive={pathname === "/auth/register"}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Register</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Views */}
        <SidebarGroup>
          <SidebarGroupLabel>Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <BookOpen className="h-4 w-4" />
                  <span>All Clips</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Clock className="h-4 w-4" />
                  <span>Recent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Calendar className="h-4 w-4" />
                  <span>By Date</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Types */}
        <SidebarGroup>
          <SidebarGroupLabel>Content Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedType === "article"}
                  onClick={() => onTypeSelect("article")}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Articles</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedType === "code"}
                  onClick={() => onTypeSelect("code")}
                >
                  <Code className="h-4 w-4" />
                  <span>Code Snippets</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedType === "quote"}
                  onClick={() => onTypeSelect("quote")}
                >
                  <Quote className="h-4 w-4" />
                  <span>Quotes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedType === "link"}
                  onClick={() => onTypeSelect("link")}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>Links</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tags */}
        <SidebarGroup>
          <SidebarGroupLabel>Tags</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allTags.map((tag) => (
                <SidebarMenuItem key={tag}>
                  <SidebarMenuButton
                    isActive={selectedTags.includes(tag)}
                    onClick={() => onTagSelect(tag)}
                  >
                    <Tag className="h-4 w-4" />
                    <span>{tag}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
