import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StockManager } from "@/components/stock/StockManager";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Stock movements",
};

export default function StockPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <PageHeader
        title="Stock movements"
        description="Every receipt, shipment and cycle count — in one auditable trail."
        actions={
          <>
            <Link
              href="/inventory"
              className={buttonStyles({ variant: "outline", size: "md" })}
            >
              <Icon name="boxes" size={15} />
              View inventory
            </Link>
            <Link
              href="#adjust-stock"
              className={buttonStyles({ size: "md" })}
            >
              <Icon name="plus" size={15} />
              Adjust stock
            </Link>
          </>
        }
      />
      <div className="mt-6">
        <StockManager />
      </div>
    </div>
  );
}
