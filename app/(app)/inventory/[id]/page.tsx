import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/Button";
import { inventoryItems, stockMovements } from "@/lib/mock-data";

export function generateStaticParams() {
  return inventoryItems.map((entry) => ({ id: entry.id }));
}

import { stockStatusMeta } from "@/config/table.config";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Item details",
};

export default async function InventoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = inventoryItems.find((entry) => entry.id === id);
  if (!item) notFound();

  const meta = stockStatusMeta[item.status];
  const movements = stockMovements.filter(
    (movement) => movement.itemId === item.id,
  );
  const margin =
    item.unitPrice > 0
      ? Math.round(((item.unitPrice - item.cost) / item.unitPrice) * 100)
      : 0;
  const stockPct = Math.min(
    Math.round((item.stock / Math.max(item.reorderLevel * 3, 1)) * 100),
    100,
  );

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <Link
        href="/inventory"
        className="mb-4 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500 transition-colors hover:text-ink"
      >
        <Icon name="arrow-left" size={14} />
        Back to inventory
      </Link>

      <PageHeader
        title={
          <span className="flex flex-wrap items-center gap-2.5">
            {item.name}
            <Badge tone={meta.tone} dot>
              {meta.label}
            </Badge>
          </span>
        }
        description={`${item.sku} · ${item.category} · Updated ${formatDate(item.updatedAt)}`}
        actions={
          <>
            <Link
              href="/stock"
              className={buttonStyles({ variant: "outline", size: "md" })}
            >
              <Icon name="activity" size={15} />
              Adjust stock
            </Link>
            <Link
              href={`/inventory/edit/${item.id}`}
              className={buttonStyles({ size: "md" })}
            >
              <Icon name="edit" size={15} />
              Edit item
            </Link>
          </>
        }
      />

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="relative grid h-28 w-full shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 via-white to-slate-50 ring-1 ring-inset ring-line sm:w-36">
                <div className="bg-dots absolute inset-0 opacity-40" />
                <Icon
                  name="package"
                  size={40}
                  strokeWidth={1.2}
                  className="relative text-brand-500"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13.5px] font-semibold text-ink">
                  Stock overview
                </h3>
                <p className="mt-1 text-[11.5px] leading-5 text-slate-500">
                  {item.description}
                </p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">
                      On hand
                    </p>
                    <p className="text-[26px] font-semibold leading-tight tracking-[-0.03em] text-ink">
                      {formatNumber(item.stock)}{" "}
                      <span className="text-[12px] font-medium text-slate-400">
                        units
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">
                      Reorder at
                    </p>
                    <p className="text-[15px] font-semibold text-ink">
                      {item.reorderLevel} units
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      item.status === "out-of-stock"
                        ? "bg-rose-400"
                        : item.status === "low-stock"
                          ? "bg-amber-400"
                          : "bg-emerald-500",
                    )}
                    style={{ width: `${Math.max(stockPct, 4)}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-50/80 px-3 py-2">
                    <p className="text-[9.5px] text-slate-400">Location</p>
                    <p className="mt-0.5 text-[11.5px] font-semibold text-ink">
                      {item.location}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50/80 px-3 py-2">
                    <p className="text-[9.5px] text-slate-400">Supplier</p>
                    <p className="mt-0.5 truncate text-[11.5px] font-semibold text-ink">
                      {item.supplier}
                    </p>
                  </div>
                  <div className="col-span-2 rounded-lg bg-slate-50/80 px-3 py-2 sm:col-span-1">
                    <p className="text-[9.5px] text-slate-400">Stock value</p>
                    <p className="mt-0.5 text-[11.5px] font-semibold text-ink">
                      {formatCurrency(item.stock * item.unitPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div>
                <h3 className="text-[13px] font-semibold text-ink">
                  Recent movements
                </h3>
                <p className="mt-0.5 text-[10.5px] text-slate-500">
                  Every change to this item&apos;s stock level
                </p>
              </div>
              <Link
                href="/stock"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
              >
                All movements
                <Icon name="arrow-right" size={12} />
              </Link>
            </div>
            {movements.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <span className="mx-auto grid size-10 place-items-center rounded-xl bg-slate-50 text-slate-400">
                  <Icon name="activity" size={18} />
                </span>
                <p className="mt-2 text-[12px] font-semibold text-ink">
                  No movements yet
                </p>
                <p className="mt-0.5 text-[10.5px] text-slate-500">
                  Stock changes will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {movements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg ring-1 ring-inset",
                        movement.type === "in"
                          ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
                          : movement.type === "out"
                            ? "bg-rose-50 text-rose-600 ring-rose-100"
                            : "bg-sky-50 text-sky-600 ring-sky-100",
                      )}
                    >
                      <Icon
                        name={
                          movement.type === "in"
                            ? "arrow-down"
                            : movement.type === "out"
                              ? "arrow-up"
                              : "refresh"
                        }
                        size={14}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11.5px] font-medium text-ink">
                        {movement.reason}
                      </p>
                      <p className="text-[9.5px] text-slate-400">
                        {movement.performedBy} ·{" "}
                        {formatDate(movement.createdAt, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[11.5px] font-semibold",
                        movement.quantity > 0 ? "text-emerald-600" : "text-rose-600",
                      )}
                    >
                      {movement.quantity > 0 ? "+" : ""}
                      {movement.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Pricing
            </h3>
            <div className="mt-3 space-y-2.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Unit price</span>
                <span className="font-semibold text-ink">
                  {formatCurrency(item.unitPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Unit cost</span>
                <span className="font-semibold text-ink">
                  {formatCurrency(item.cost)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Margin</span>
                <Badge tone={margin >= 40 ? "emerald" : "amber"}>
                  {margin}%
                </Badge>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2.5">
                <span className="text-slate-500">Total stock value</span>
                <span className="font-semibold text-ink">
                  {formatCurrency(item.stock * item.unitPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Item details
            </h3>
            <div className="mt-3 space-y-2.5 text-[11.5px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">SKU</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                  <Icon name="barcode" size={13} className="text-slate-400" />
                  {item.sku}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Category</span>
                <span className="font-medium text-ink">{item.category}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Location</span>
                <span className="font-medium text-ink">{item.location}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Supplier</span>
                <span className="truncate font-medium text-ink">
                  {item.supplier}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Last updated</span>
                <span className="font-medium text-ink">
                  {formatDate(item.updatedAt, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
            <div className="flex items-start gap-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <Icon name="alert" size={14} />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold text-amber-900">
                  {item.stock === 0
                    ? "This item is out of stock"
                    : "Running low on stock"}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-4.5 text-amber-800/80">
                  {item.stock === 0
                    ? "Reorder now to avoid missed sales."
                    : `Only ${item.stock} units left against a reorder point of ${item.reorderLevel}.`}
                </p>
                <Link
                  href="/stock"
                  className="mt-2 inline-flex items-center gap-1 text-[10.5px] font-semibold text-amber-800 hover:underline"
                >
                  Create purchase order
                  <Icon name="arrow-right" size={12} />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
