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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-2">
            <div className="flex h-12 items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
               <div className="flex items-center gap-2">
                <Logo className="text-sidebar-primary size-7" />
                <span className="text-xl font-semibold text-sidebar-foreground">
                  PharmaVaidya
                </span>
              </div>
            </div>
            <div className="hidden items-center justify-center p-2 group-data-[collapsible=icon]:flex">
               <Logo className="text-sidebar-primary size-7" />
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
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
