import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/Button";
import { inventoryItems } from "@/lib/mock-data";
import { cn, formatCompact, formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Inventory",
};

const totalUnits = inventoryItems.reduce((sum, item) => sum + item.stock, 0);
const totalValue = inventoryItems.reduce(
  (sum, item) => sum + item.stock * item.unitPrice,
  0,
);
const lowStockCount = inventoryItems.filter(
  (item) => item.status !== "in-stock",
).length;

const summary: {
  label: string;
  value: string;
  caption: string;
  icon: IconName;
  tone: string;
}[] = [
  {
    label: "Total SKUs",
    value: String(inventoryItems.length),
    caption: "Across 6 categories",
    icon: "boxes",
    tone: "bg-brand-50 text-brand-600 ring-brand-100",
  },
  {
    label: "Units on hand",
    value: formatCompact(totalUnits),
    caption: "Across 3 warehouses",
    icon: "warehouse",
    tone: "bg-sky-50 text-sky-600 ring-sky-100",
  },
  {
    label: "Inventory value",
    value: formatCurrency(totalValue),
    caption: "At current unit price",
    icon: "dollar",
    tone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  },
  {
    label: "Needs attention",
    value: String(lowStockCount),
    caption: "Low or out of stock",
    icon: "alert",
    tone: "bg-amber-50 text-amber-600 ring-amber-100",
  },
];

export default function InventoryPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <PageHeader
        title="Inventory"
        description="Search, filter and manage every SKU in your catalogue."
        actions={
          <>
            <Link
              href="/stock"
              className={buttonStyles({ variant: "outline", size: "md" })}
            >
              <Icon name="activity" size={15} />
              Stock history
            </Link>
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
        {summary.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
                stat.tone,
              )}
            >
              <Icon name={stat.icon} size={17} />
            </span>
            <div>
              <p className="text-[10.5px] font-medium text-slate-500">
                {stat.label}
              </p>
              <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                {stat.value}
              </p>
              <p className="text-[9.5px] text-slate-400">{stat.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <InventoryTable initialItems={inventoryItems} />
      </div>
    </div>
  );
}
