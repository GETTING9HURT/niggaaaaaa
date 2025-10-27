import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn("h-8 w-8", className)}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        d="M128 24a88 88 0 0 0-88 88c0 43.4 22.3 83.5 64.6 112.7.7.5 1.4.7 2.2.7a3.8 3.8 0 0 0 2.2-.7C151.7 195.5 174 155.4 174 112a88 88 0 0 0-88-88Z"
        opacity="0.2"
        fill="currentColor"
      />
      <path
        d="M176 112c0 45.3-23 85.8-67.9 115.3a8.1 8.1 0 0 1-10.2 0C53 197.8 30 157.3 30 112a98 98 0 0 1 196 0c0 45.3-23 85.8-67.9 115.3a8.1 8.1 0 0 1-10.2 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M128 120v104.3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
