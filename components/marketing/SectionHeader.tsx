import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset",
            theme === "light"
              ? "bg-brand-50 text-brand-700 ring-brand-100"
              : "bg-white/10 text-brand-200 ring-white/15",
          )}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl lg:text-[42px]",
          theme === "light" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty text-[15px] leading-7 sm:text-base",
            theme === "light" ? "text-slate-600" : "text-slate-300",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
