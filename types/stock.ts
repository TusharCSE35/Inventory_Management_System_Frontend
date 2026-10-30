export type StockMovementType = "in" | "out" | "adjustment";

export interface StockMovement {
  id: string;
  itemId: string;
  item: string;
  sku: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  performedBy: string;
  createdAt: string;
}
