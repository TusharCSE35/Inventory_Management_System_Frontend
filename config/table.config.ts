import type { StockStatus } from "@/types/inventory";
import type { BadgeTone } from "@/components/ui/Badge";

export const inventoryPageSize = 8;
export const movementsPageSize = 8;

export const stockStatusMeta: Record<
  StockStatus,
  { label: string; tone: BadgeTone }
> = {
  "in-stock": { label: "In stock", tone: "emerald" },
  "low-stock": { label: "Low stock", tone: "amber" },
  "out-of-stock": { label: "Out of stock", tone: "rose" },
};
