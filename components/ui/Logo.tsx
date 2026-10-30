import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 shadow-[0_6px_16px_-6px_rgba(79,70,229,0.9)]",
        className,
      )}
    >
      <span className="absolute -right-2 -top-2 size-5 rounded-full bg-white/20 blur-[6px]" />
      <svg
        viewBox="0 0 32 32"
        className="relative size-6"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 4 27.3 9.8 16 15.6 4.7 9.8 16 4Z"
          fill="white"
          fillOpacity="0.98"
        />
        <path
          d="M4.7 14.2 16 20l11.3-5.8V17L16 22.8 4.7 17v-2.8Z"
          fill="white"
          fillOpacity="0.72"
        />
        <path
          d="M4.7 20.4 16 26.2l11.3-5.8V23L16 28.8 4.7 23v-2.6Z"
          fill="white"
          fillOpacity="0.45"
        />
      </svg>
    </span>
  );
}

export interface LogoProps {
  href?: string;
  theme?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
}

export function Logo({
  href = "/",
  theme = "light",
  className,
  showWordmark = true,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg",
        className,
      )}
      aria-label="Stockflow home"
    >
      <LogoMark />
      {showWordmark && (
        <span
          className={cn(
            "text-[19px] font-semibold tracking-[-0.03em]",
            theme === "light" ? "text-ink" : "text-white",
          )}
        >
          Stockflow
        </span>
      )}
    </Link>
  );
}
