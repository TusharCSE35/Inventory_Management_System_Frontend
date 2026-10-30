import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { StockChart } from "@/components/dashboard/StockChart";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import {
  activityFeed,
  categories,
  dashboardStats,
  lowStockItems,
} from "@/lib/mock-data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

const toneStyles = {
  brand: "bg-brand-50 text-brand-600 ring-brand-100",
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  sky: "bg-sky-50 text-sky-600 ring-sky-100",
};

export default function DashboardPage() {
  const maxCategoryValue = Math.max(...categories.map((category) => category.value));

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <PageHeader
        title="Good morning, Maya"
        description="Here's what's happening across your warehouses today, October 30."
        actions={
          <>
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[11.5px] font-medium text-slate-600">
              <Icon name="calendar" size={15} className="text-slate-400" />
              Oct 1 – Oct 30, 2026
            </span>
            <Link
              href="/inventory/create"
              className={buttonStyles({ size: "md" })}
            >
              <Icon name="plus" size={15} />
              Add item
            </Link>
          </>
        }
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            stat={stat}
            positive={stat.id === "low" ? true : stat.trend === "up"}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StockChart />
        </div>

        <div className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[14px] font-semibold text-ink">
                Low stock alerts
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Items at or below reorder point
              </p>
            </div>
            <Badge tone="amber">{lowStockItems.length} items</Badge>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {lowStockItems.slice(0, 4).map((item) => {
              const pct = Math.min(
                Math.round((item.stock / Math.max(item.reorderLevel, 1)) * 100),
                100,
              );
              return (
                <Link
                  key={item.id}
                  href={`/inventory/${item.id}`}
                  className="group block rounded-xl border border-transparent px-1 py-1 transition-colors hover:border-line hover:bg-slate-50/70"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg ring-1 ring-inset",
                        item.stock === 0
                          ? "bg-rose-50 text-rose-600 ring-rose-100"
                          : "bg-amber-50 text-amber-600 ring-amber-100",
                      )}
                    >
                      <Icon name="package" size={14} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11.5px] font-semibold text-ink group-hover:text-brand-700">
                        {item.name}
                      </p>
                      <p className="text-[9.5px] text-slate-400">
                        {item.sku} · reorder at {item.reorderLevel}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[10px] font-semibold",
                        item.stock === 0 ? "text-rose-600" : "text-amber-600",
                      )}
                    >
                      {item.stock === 0 ? "Out" : `${item.stock} left`}
                    </span>
                  </div>
                  <div className="ml-10.5 mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        item.stock === 0 ? "bg-rose-400" : "bg-amber-400",
                      )}
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Auto-reorder is on
            </span>
            <Link
              href="/inventory"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
            >
              View inventory
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-ink">
                Recent activity
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Latest movements from your team
              </p>
            </div>
            <Link
              href="/stock"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
            >
              View all
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>

          <div className="mt-4 space-y-1">
            {activityFeed.map((entry, index) => (
              <div key={entry.id} className="relative flex gap-3 pb-4 last:pb-0">
                {index !== activityFeed.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-[calc(100%-28px)] w-px bg-line" />
                )}
                <span
                  className={cn(
                    "relative z-10 grid size-8 shrink-0 place-items-center rounded-full ring-1 ring-inset",
                    toneStyles[entry.tone],
                  )}
                >
                  <Icon name={entry.icon} size={14} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[11.5px] font-semibold text-ink">
                      {entry.title}
                    </p>
                    <span className="shrink-0 text-[9.5px] text-slate-400">
                      {entry.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10.5px] leading-4.5 text-slate-500">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-ink">
                Inventory by category
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {formatNumber(categories.reduce((sum, item) => sum + item.itemCount, 0))}{" "}
                SKUs across {categories.length} categories
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
            >
              Manage
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>

          <div className="mt-4 space-y-3.5">
            {categories.slice(0, 4).map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-[11.5px] font-medium text-ink">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {formatCurrency(category.value)}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(category.value / maxCategoryValue) * 100}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                  <span className="w-14 text-right text-[9.5px] text-slate-400">
                    {category.itemCount} items
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-surface/80 px-3 py-2.5">
            <span className="text-[10.5px] text-slate-500">
              Total inventory value
            </span>
            <span className="text-[12px] font-semibold text-ink">
              {formatCurrency(
                categories.reduce((sum, category) => sum + category.value, 0),
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
