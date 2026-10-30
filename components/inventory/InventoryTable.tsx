"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Select } from "@/components/ui/Select";
import { buttonStyles } from "@/components/ui/Button";
import { categories } from "@/lib/mock-data";
import { stockStatusMeta, inventoryPageSize } from "@/config/table.config";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { cn, downloadCsv, formatCurrency, formatDate } from "@/lib/utils";
import type { InventoryItem } from "@/types/inventory";

type SortOption = "updated" | "name" | "stock";

export function InventoryTable({
  initialItems,
}: {
  initialItems: InventoryItem[];
}) {
  const [items] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortOption>("updated");
  const debouncedQuery = useDebounce(query, 200);

  const filtered = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();
    const result = items.filter((item) => {
      const matchesQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.sku.toLowerCase().includes(normalized) ||
        item.supplier.toLowerCase().includes(normalized);
      const matchesCategory =
        category === "all" || item.categoryId === category;
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "stock") return a.stock - b.stock;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [items, debouncedQuery, category, status, sort]);

  const pagination = usePagination({
    total: filtered.length,
    pageSize: inventoryPageSize,
  });
  const visible = filtered.slice(pagination.start, pagination.end);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setSort("updated");
    pagination.reset();
  }

  function exportRows() {
    downloadCsv("stockflow-inventory.csv", [
      ["Name", "SKU", "Category", "Stock", "Reorder level", "Unit price", "Supplier", "Location"],
      ...filtered.map((item) => [
        item.name,
        item.sku,
        item.category,
        String(item.stock),
        String(item.reorderLevel),
        String(item.unitPrice),
        item.supplier,
        item.location,
      ]),
    ]);
  }

  const filtersActive =
    query !== "" || category !== "all" || status !== "all" || sort !== "updated";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex flex-col gap-3 border-b border-line p-4 xl:flex-row xl:items-center">
        <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 text-slate-400 transition-all focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              pagination.reset();
            }}
            placeholder="Search by name, SKU or supplier…"
            aria-label="Search inventory"
            className="w-full min-w-0 bg-transparent text-[12.5px] text-ink placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <Select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              pagination.reset();
            }}
            containerClassName="w-full sm:w-40"
            selectClassName="h-10 text-[12px]"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>

          <Select
            aria-label="Filter by stock status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              pagination.reset();
            }}
            containerClassName="w-full sm:w-36"
            selectClassName="h-10 text-[12px]"
          >
            <option value="all">All status</option>
            <option value="in-stock">In stock</option>
            <option value="low-stock">Low stock</option>
            <option value="out-of-stock">Out of stock</option>
          </Select>

          <Select
            aria-label="Sort inventory"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortOption);
              pagination.reset();
            }}
            containerClassName="w-full sm:w-40"
            selectClassName="h-10 text-[12px]"
          >
            <option value="updated">Recently updated</option>
            <option value="name">Name A–Z</option>
            <option value="stock">Stock: low to high</option>
          </Select>

          <button
            type="button"
            onClick={exportRows}
            className={buttonStyles({
              variant: "outline",
              size: "md",
              className: "col-span-2 h-10 text-[12px] sm:col-auto",
            })}
          >
            <Icon name="download" size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-slate-50/70">
              {[
                "Item",
                "Category",
                "Stock level",
                "Status",
                "Unit price",
                "Updated",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={cn(
                    "px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-slate-400",
                    heading === "Actions" && "text-right",
                  )}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-14 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-50 text-slate-400">
                    <Icon name="search" size={22} />
                  </span>
                  <p className="mt-3 text-[13px] font-semibold text-ink">
                    No items match your filters
                  </p>
                  <p className="mt-1 text-[11.5px] text-slate-500">
                    Try a different search term or clear the filters.
                  </p>
                  {filtersActive && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-3 text-[11.5px] font-semibold text-brand-700 hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              visible.map((item) => {
                const meta = stockStatusMeta[item.status];
                const stockPct = Math.min(
                  Math.round(
                    (item.stock / Math.max(item.reorderLevel * 3, 1)) * 100,
                  ),
                  100,
                );
                return (
                  <tr
                    key={item.id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600">
                          <Icon name="package" size={15} />
                        </span>
                        <div className="min-w-0">
                          <Link
                            href={`/inventory/${item.id}`}
                            className="block max-w-52 truncate text-[12px] font-semibold text-ink hover:text-brand-700"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[9.5px] text-slate-400">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-slate-100/80 px-2 py-1 text-[10px] font-medium text-slate-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-28">
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="font-semibold text-ink">
                            {item.stock}
                          </span>
                          <span className="text-slate-400">
                            / {item.reorderLevel} min
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
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
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={meta.tone} dot>
                        {meta.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-[11.5px] font-medium text-ink">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-3 text-[10.5px] text-slate-500">
                      {formatDate(item.updatedAt, {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/inventory/${item.id}`}
                          className="grid size-7 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
                          aria-label={`View ${item.name}`}
                          title="View item"
                        >
                          <Icon name="eye" size={15} />
                        </Link>
                        <Link
                          href={`/inventory/edit/${item.id}`}
                          className="grid size-7 place-items-center rounded-md text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-700"
                          aria-label={`Edit ${item.name}`}
                          title="Edit item"
                        >
                          <Icon name="edit" size={14} />
                        </Link>
                      </div>
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
            {filtered.length === 0 ? 0 : pagination.start + 1}–
            {pagination.end}
          </span>{" "}
          of <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          items
          {filtersActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-2 font-medium text-brand-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={pagination.previous}
            disabled={pagination.page === 1}
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "h-8 px-2.5 text-[11px]",
            })}
          >
            <Icon name="chevron-left" size={14} />
            Previous
          </button>
          <span className="px-2 text-[10.5px] font-medium text-slate-500">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={pagination.next}
            disabled={pagination.page === pagination.totalPages}
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "h-8 px-2.5 text-[11px]",
            })}
          >
            Next
            <Icon name="chevron-right" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
