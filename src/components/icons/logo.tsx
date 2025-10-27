import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="https://i.ibb.co/M5SBVD1Q/cf06cd53-de2a-4e29-9262-752f08e95914-removebg-preview-1.png"
        alt="PharmaVaidya Logo"
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
