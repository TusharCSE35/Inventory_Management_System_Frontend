import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "brand"
  | "emerald"
  | "amber"
  | "rose"
  | "slate"
  | "sky"
  | "violet";

const tones: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  emerald: "bg-emerald-50/90 text-emerald-700 ring-emerald-200/70",
  amber: "bg-amber-50/90 text-amber-800 ring-amber-200/70",
  rose: "bg-rose-50/90 text-rose-700 ring-rose-200/70",
  slate: "bg-slate-100 text-slate-600 ring-slate-200/70",
  sky: "bg-sky-50/90 text-sky-700 ring-sky-200/70",
  violet: "bg-violet-50/90 text-violet-700 ring-violet-200/70",
};

export function Badge({
  children,
  tone = "slate",
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-current opacity-80" />
      )}
      {children}
    </span>
  );
}
