
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Logo } from "@/components/icons/logo";
import { Separator } from "@/components/ui/separator";
import { PanelLeft } from "lucide-react";
import Link from "next/link";

function MainLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openMobile, setOpenMobile } = useSidebar();

  const handleContentClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-2">
            <Link href="/dashboard" className="flex h-12 items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
               <div className="flex items-center gap-2">
                <Logo className="size-8" />
                <span className="text-xl font-semibold text-sidebar-foreground">
                  PharmaVaidya
                </span>
              </div>
            </Link>
            <Link href="/dashboard" className="hidden items-center justify-center p-2 group-data-[collapsible=icon]:flex">
               <Logo className="size-8" />
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2 bg-sidebar-border" />
           <div className="flex items-center justify-center p-2">
              <SidebarTrigger>
                <PanelLeft />
              </SidebarTrigger>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col" onClick={handleContentClick}>
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </>
  );
}


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
}
