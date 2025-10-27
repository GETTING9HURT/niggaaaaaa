
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { PanelLeft } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="lg:hidden">
          <PanelLeft />
        </SidebarTrigger>
        <Link href="/dashboard" className="hidden items-center gap-2 lg:flex">
          <Logo className="size-8" />
          <span className="text-lg font-bold">PharmaVaidya</span>
        </Link>
      </div>
    </header>
  );
}
