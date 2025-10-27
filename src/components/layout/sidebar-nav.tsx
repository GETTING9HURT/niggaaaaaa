
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
  Bot,
  GalleryThumbnails,
  Group,
  Contact,
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
  { href: "/language-learning", label: "Language Hub", icon: Languages },
  { href: "/community-remedies", label: "Community", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/about", label: "About", icon: Info },
  { href: "/team", label: "Team", icon: Group },
  { href: "/contact", label: "Contact", icon: Contact },
];

const aiBotLinks = [
    { href: "/knowledge-base", label: "Medicinal Chatbot", icon: BookOpen },
    { href: "/knowledge-base/gallery", label: "Plant Gallery", icon: GalleryThumbnails },
    { href: "/language-bot", label: "Language Chatbot", icon: Languages },
]

export function SidebarNav() {
  const pathname = usePathname();
  const isAiBotRoute = aiBotLinks.some(link => pathname.startsWith(link.href));
  const [isAiBotOpen, setIsAiBotOpen] = React.useState(isAiBotRoute);

  React.useEffect(() => {
    const isAiBotRoute = aiBotLinks.some(link => pathname.startsWith(link.href));
    setIsAiBotOpen(isAiBotRoute);
  }, [pathname]);


  return (
    <SidebarMenu>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <SidebarMenuItem key={link.label}>
            <Link href={link.href} prefetch={false}>
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
                    tooltip={{ children: "Knowledge Base" }}
                    className="w-full"
                    >
                    <Bot
                        className={cn(
                            "transition-colors",
                            isAiBotOpen ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                        )}
                    />
                    <span>Knowledge Base</span>
                </SidebarMenuButton>
            </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent>
            <SidebarMenu className="pl-6 group-data-[collapsible=icon]:pl-0">
                {aiBotLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <SidebarMenuItem key={link.label}>
                            <Link href={link.href} prefetch={false}>
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
