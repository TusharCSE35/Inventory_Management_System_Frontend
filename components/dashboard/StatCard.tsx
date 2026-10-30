import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/types/dashboard";

const sparklines: Record<string, number[]> = {
  skus: [18, 22, 20, 27, 25, 31, 36, 34, 42],
  value: [22, 20, 26, 24, 30, 33, 31, 38, 44],
  low: [40, 36, 38, 31, 33, 27, 25, 22, 18],
  accuracy: [66, 68, 67, 70, 72, 71, 74, 76, 79],
};

export function StatCard({
  stat,
  positive,
}: {
  stat: DashboardStat;
  positive: boolean;
}) {
  const points = sparklines[stat.id] ?? sparklines.skus;
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coordinates = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  const stroke = positive ? "#10b981" : "#f43f5e";

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-shadow hover:shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
            <Icon name={stat.icon} size={15} />
          </span>
          <span className="text-[11.5px] font-medium text-slate-500">
            {stat.label}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold ring-1 ring-inset",
            positive
              ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
              : "bg-rose-50 text-rose-700 ring-rose-100",
          )}
        >
          <Icon
            name={stat.trend === "up" ? "trending-up" : "trending-down"}
            size={10}
          />
          {stat.change}%
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink">
            {stat.value}
          </p>
          <p className="mt-1.5 text-[10px] text-slate-400">{stat.caption}</p>
        </div>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-9 w-24 shrink-0 overflow-visible"
          aria-hidden="true"
        >
          <polyline
            points={coordinates}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
