export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryId: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  cost: number;
  location: string;
  supplier: string;
  description: string;
  updatedAt: string;
  status: StockStatus;
}

export interface InventoryFormValues {
  name: string;
  sku: string;
  categoryId: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  cost: number;
  location: string;
  supplier: string;
  description: string;
}
