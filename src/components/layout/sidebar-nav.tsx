
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  LayoutDashboard,
  Languages,
  Leaf,
  Trophy,
  Users,
  Info,
  MessageCircle,
  Bot
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/identify", label: "Identify Plant", icon: Leaf },
  { href: "/community-remedies", label: "Community", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/about", label: "About", icon: Info },
];

const aiBotLinks = [
    { href: "/knowledge-base", label: "Medicinal Knowledge", icon: BookOpen },
    { href: "/language-bot", label: "Tribal Languages", icon: Languages },
]

export function SidebarNav() {
  const pathname = usePathname();
  const [isAiBotOpen, setIsAiBotOpen] = React.useState(pathname.startsWith('/knowledge-base') || pathname.startsWith('/language-bot'));


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
      
      <Collapsible open={isAiBotOpen} onOpenChange={setIsAiBotOpen}>
        <SidebarMenuItem>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton
                    tooltip={{ children: "AI Bot" }}
                    className="w-full"
                    >
                    <Bot
                        className={cn(
                            "transition-colors",
                            isAiBotOpen ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                        )}
                    />
                    <span>AI Bot</span>
                </SidebarMenuButton>
            </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent>
            <SidebarMenu className="pl-6 group-data-[collapsible=icon]:pl-0">
                {aiBotLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <SidebarMenuItem key={link.label}>
                            <Link href={link.href}>
                                <SidebarMenuButton
                                    isActive={isActive}
                                    tooltip={{ children: link.label }}
                                    variant="ghost"
                                    className="h-8"
                                >
                                     <link.icon
                                        className={cn(
                                            "transition-colors h-3 w-3",
                                            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                                        )}
                                        />
                                    <span className="text-xs">{link.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>


    </SidebarMenu>
  );
}
