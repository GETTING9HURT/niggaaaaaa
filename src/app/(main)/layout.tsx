
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Logo } from "@/components/icons/logo";
import { Separator } from "@/components/ui/separator";
import { PanelLeft } from "lucide-react";
import Link from "next/link";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-2">
              <Link href="/dashboard" className="flex h-16 items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
                 <div className="flex items-center gap-2">
                  <Logo className="size-12" />
                  <span className="text-xl font-semibold text-sidebar-foreground">
                    PharmaVaidya
                  </span>
                </div>
              </Link>
              <div className="hidden h-16 w-full items-center justify-center group-data-[collapsible=icon]:flex">
                <Link href="/dashboard">
                  <Logo className="size-10" />
                </Link>
              </div>
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
        <SidebarInset className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
