"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Home,
  Languages,
  Leaf,
  Trophy,
  Users,
  Info,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/identify", label: "Identify Plant", icon: Leaf },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/language-learning", label: "Language Hub", icon: Languages },
  { href: "/community-remedies", label: "Community", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/about", label: "About", icon: Info },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <SidebarMenuItem key={link.label}>
            <Link href={link.href}>
              <SidebarMenuButton
                isActive={isActive}
                tooltip={{ children: link.label }}
              >
                <link.icon
                  className={cn(
                    "transition-colors",
                    isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                  )}
                />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
