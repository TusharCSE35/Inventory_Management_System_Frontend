"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { movementsPageSize } from "@/config/table.config";
import { inventoryItems, stockMovements } from "@/lib/mock-data";
import {
  cn,
  downloadCsv,
  formatDate,
  formatNumber,
} from "@/lib/utils";
import type { StockMovement, StockMovementType } from "@/types/stock";

const typeMeta: Record<
  StockMovementType,
  { label: string; tone: BadgeTone; icon: IconName }
> = {
  in: { label: "Received", tone: "emerald", icon: "arrow-down" },
  out: { label: "Shipped", tone: "rose", icon: "arrow-up" },
  adjustment: { label: "Adjustment", tone: "sky", icon: "refresh" },
};

function MovementTable({
  movements,
  onExport,
}: {
  movements: StockMovement[];
  onExport: (filtered: StockMovement[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const debounced = useDebounce(query, 200);

  const filtered = useMemo(() => {
    const normalized = debounced.trim().toLowerCase();
    return movements.filter((movement) => {
      const matchesQuery =
        !normalized ||
        movement.item.toLowerCase().includes(normalized) ||
        movement.sku.toLowerCase().includes(normalized) ||
        movement.reason.toLowerCase().includes(normalized) ||
        movement.performedBy.toLowerCase().includes(normalized);
      const matchesType = type === "all" || movement.type === type;
      return matchesQuery && matchesType;
    });
  }, [movements, debounced, type]);

  const pagination = usePagination({
    total: filtered.length,
    pageSize: movementsPageSize,
  });
  const visible = filtered.slice(pagination.start, pagination.end);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
        <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 text-slate-400 transition-all focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              pagination.reset();
            }}
            placeholder="Search movements…"
            aria-label="Search stock movements"
            className="w-full min-w-0 bg-transparent text-[12.5px] text-ink placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            aria-label="Filter by movement type"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
              pagination.reset();
            }}
            containerClassName="w-36"
            selectClassName="h-10 text-[12px]"
          >
            <option value="all">All types</option>
            <option value="in">Received</option>
            <option value="out">Shipped</option>
            <option value="adjustment">Adjustments</option>
          </Select>
          <button
            type="button"
            onClick={() => onExport(filtered)}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-[11.5px] font-semibold text-ink transition-colors hover:border-brand-200 hover:bg-brand-50/50"
          >
            <Icon name="download" size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-slate-50/70">
              {["Item", "Type", "Qty", "Reason", "By", "Date"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-14 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-50 text-slate-400">
                    <Icon name="activity" size={22} />
                  </span>
                  <p className="mt-3 text-[13px] font-semibold text-ink">
                    No movements found
                  </p>
                  <p className="mt-1 text-[11.5px] text-slate-500">
                    Adjust the filters or record a new movement.
                  </p>
                </td>
              </tr>
            ) : (
              visible.map((movement) => {
                const meta = typeMeta[movement.type];
                return (
                  <tr
                    key={movement.id}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                          <Icon name="package" size={14} />
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-52 truncate text-[11.5px] font-semibold text-ink">
                            {movement.item}
                          </p>
                          <p className="text-[9.5px] text-slate-400">
                            {movement.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={meta.tone}>
                        <Icon name={meta.icon} size={10} />
                        {meta.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "text-[11.5px] font-semibold",
                          movement.quantity > 0
                            ? "text-emerald-600"
                            : movement.quantity < 0
                              ? "text-rose-600"
                              : "text-slate-500",
                        )}
                      >
                        {movement.quantity > 0 ? "+" : ""}
                        {formatNumber(movement.quantity)}
                      </span>
                    </td>
                    <td className="max-w-56 px-4 py-3">
                      <p className="truncate text-[10.5px] text-slate-600">
                        {movement.reason}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[10.5px] text-slate-500">
                      {movement.performedBy}
                    </td>
                    <td className="px-4 py-3 text-[10px] text-slate-500">
                      {formatDate(movement.createdAt, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 border-t border-line px-4 py-3 sm:flex-row sm:items-center">
        <p className="text-[10.5px] text-slate-500">
          Showing{" "}
          <span className="font-semibold text-ink">
            {filtered.length === 0 ? 0 : pagination.start + 1}–{pagination.end}
          </span>{" "}
          of <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          movements
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={pagination.previous}
            disabled={pagination.page === 1}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-line bg-white px-2.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            <Icon name="chevron-left" size={13} />
            Previous
          </button>
          <span className="px-2 text-[10.5px] font-medium text-slate-500">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={pagination.next}
            disabled={pagination.page === pagination.totalPages}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-line bg-white px-2.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Next
            <Icon name="chevron-right" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AdjustmentForm({
  onRecord,
}: {
  onRecord: (movement: StockMovement) => void;
}) {
  const [itemId, setItemId] = useState(inventoryItems[0]?.id ?? "");
  const [type, setType] = useState<"in" | "out" | "adjustment">("in");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<{ quantity?: string; reason?: string }>(
    {},
  );
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const item =
    inventoryItems.find((entry) => entry.id === itemId) ?? inventoryItems[0];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: typeof errors = {};
    const amount = Number(quantity);
    if (quantity === "" || Number.isNaN(amount) || amount < 0) {
      next.quantity = "Enter a valid quantity.";
    } else if (type !== "adjustment" && amount === 0) {
      next.quantity = "Quantity must be greater than 0.";
    }
    if (!reason.trim()) next.reason = "Add a short reason for the change.";
    setErrors(next);
    if (Object.keys(next).length > 0 || !item) return;

    setSaving(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 700));

    const delta =
      type === "in"
        ? amount
        : type === "out"
          ? -amount
          : amount - item.stock;

    onRecord({
      id: `mov_${Date.now()}`,
      itemId: item.id,
      item: item.name,
      sku: item.sku,
      type,
      quantity: delta,
      reason:
        type === "adjustment"
          ? `${reason.trim()} (count set to ${amount})`
          : reason.trim(),
      performedBy: "You",
      createdAt: new Date().toISOString(),
    });

    setSaving(false);
    setSuccess(
      type === "in"
        ? `${amount} units added to ${item.name}.`
        : type === "out"
          ? `${amount} units removed from ${item.name}.`
          : `${item.name} count adjusted.`,
    );
    setQuantity("");
    setReason("");
    setTimeout(() => setSuccess(null), 4000);
  }

  return (
    <section
      id="adjust-stock"
      className="scroll-mt-24 rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
    >
      <div className="flex items-start gap-2.5 border-b border-line pb-4">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
          <Icon name="sliders" size={15} />
        </span>
        <div>
          <h3 className="text-[13.5px] font-semibold text-ink">
            Record a movement
          </h3>
          <p className="mt-0.5 text-[10.5px] text-slate-500">
            Receive, ship or reconcile stock in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-4 space-y-3.5">
        <Select
          label="Item"
          value={itemId}
          onChange={(event) => setItemId(event.target.value)}
        >
          {inventoryItems.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name} ({entry.sku})
            </option>
          ))}
        </Select>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-ink">Movement</p>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { value: "in", label: "Add" },
                { value: "out", label: "Remove" },
                { value: "adjustment", label: "Set count" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                aria-pressed={type === option.value}
                className={cn(
                  "rounded-lg border px-2 py-2 text-[11px] font-semibold transition-colors",
                  type === option.value
                    ? "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-line bg-white text-slate-500 hover:border-slate-300",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <Input
          label={type === "adjustment" ? "New quantity on hand" : "Quantity"}
          type="number"
          min={0}
          step={1}
          placeholder="0"
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
            if (errors.quantity)
              setErrors((current) => ({ ...current, quantity: undefined }));
          }}
          error={errors.quantity}
          hint={
            item
              ? `Current stock: ${item.stock} units`
              : undefined
          }
        />

        <Textarea
          label="Reason"
          rows={2}
          placeholder="e.g. Purchase order PO-2085 received"
          value={reason}
          onChange={(event) => {
            setReason(event.target.value);
            if (errors.reason)
              setErrors((current) => ({ ...current, reason: undefined }));
          }}
          error={errors.reason}
        />

        {success && (
          <p className="flex items-start gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700">
            <Icon name="check-circle" size={14} className="mt-0.5 shrink-0" />
            {success}
          </p>
        )}

        <Button type="submit" size="lg" loading={saving} className="w-full">
          {saving ? "Recording…" : "Record movement"}
          {!saving && <Icon name="check" size={15} />}
        </Button>
        <p className="text-center text-[9.5px] leading-4 text-slate-400">
          Movements are timestamped and attributed to you in the audit log.
        </p>
      </form>
    </section>
  );
}

export function StockManager() {
  const [movements, setMovements] = useState<StockMovement[]>(stockMovements);

  const summary = useMemo(() => {
    const received = movements
      .filter((movement) => movement.type === "in")
      .reduce((sum, movement) => sum + movement.quantity, 0);
    const shipped = Math.abs(
      movements
        .filter((movement) => movement.type === "out")
        .reduce((sum, movement) => sum + movement.quantity, 0),
    );
    const adjustments = movements.filter(
      (movement) => movement.type === "adjustment",
    ).length;
    const net = movements.reduce(
      (sum, movement) => sum + movement.quantity,
      0,
    );
    return { received, shipped, adjustments, net };
  }, [movements]);

  const cards: {
    label: string;
    value: string;
    caption: string;
    icon: IconName;
    tone: string;
  }[] = [
    {
      label: "Units received",
      value: formatNumber(summary.received),
      caption: "Across all items",
      icon: "arrow-down",
      tone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    },
    {
      label: "Units shipped",
      value: formatNumber(summary.shipped),
      caption: "Order fulfilment",
      icon: "arrow-up",
      tone: "bg-rose-50 text-rose-600 ring-rose-100",
    },
    {
      label: "Adjustments",
      value: String(summary.adjustments),
      caption: "Cycle counts & fixes",
      icon: "refresh",
      tone: "bg-sky-50 text-sky-600 ring-sky-100",
    },
    {
      label: "Net change",
      value: `${summary.net > 0 ? "+" : ""}${formatNumber(summary.net)}`,
      caption: "Units on hand",
      icon: "activity",
      tone:
        summary.net >= 0
          ? "bg-brand-50 text-brand-600 ring-brand-100"
          : "bg-amber-50 text-amber-600 ring-amber-100",
    },
  ];

  function exportMovements(rows: StockMovement[]) {
    downloadCsv("stockflow-movements.csv", [
      ["Item", "SKU", "Type", "Quantity", "Reason", "By", "Date"],
      ...rows.map((movement) => [
        movement.item,
        movement.sku,
        movement.type,
        String(movement.quantity),
        movement.reason,
        movement.performedBy,
        formatDate(movement.createdAt, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      ]),
    ]);
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
                card.tone,
              )}
            >
              <Icon name={card.icon} size={17} />
            </span>
            <div>
              <p className="text-[10.5px] font-medium text-slate-500">
                {card.label}
              </p>
              <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                {card.value}
              </p>
              <p className="text-[9.5px] text-slate-400">{card.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[1.6fr_1fr]">
        <MovementTable movements={movements} onExport={exportMovements} />
        <div className="xl:sticky xl:top-24">
          <AdjustmentForm
            onRecord={(movement) =>
              setMovements((current) => [movement, ...current])
            }
          />
        </div>
      </div>
    </div>
  );
}
