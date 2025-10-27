
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { PanelLeft } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-lg sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="lg:hidden">
          <PanelLeft />
        </SidebarTrigger>
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Logo className="size-10" />
          <span className="hidden text-lg sm:inline-block">PharmaVaidya</span>
        </Link>
      </div>
    </header>
  );
}
