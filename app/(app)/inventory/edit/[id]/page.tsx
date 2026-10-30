import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryForm } from "@/components/inventory/InventoryForm";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { inventoryItems } from "@/lib/mock-data";

export function generateStaticParams() {
  return inventoryItems.map((entry) => ({ id: entry.id }));
}


export const metadata: Metadata = {
  title: "Edit inventory item",
};

export default async function EditInventoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = inventoryItems.find((entry) => entry.id === id);
  if (!item) notFound();

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <PageHeader
        title={`Edit ${item.name}`}
        description={`Update details for ${item.sku}. Changes are visible to your whole team.`}
        actions={
          <>
            <Link
              href={`/inventory/${item.id}`}
              className={buttonStyles({ variant: "outline", size: "md" })}
            >
              <Icon name="eye" size={15} />
              View item
            </Link>
            <Link
              href="/inventory"
              className={buttonStyles({ variant: "ghost", size: "md" })}
            >
              Back to inventory
            </Link>
          </>
        }
      />
      <div className="mt-6">
        <InventoryForm
          mode="edit"
          itemId={item.id}
          initialValues={{
            name: item.name,
            sku: item.sku,
            categoryId: item.categoryId,
            stock: item.stock,
            reorderLevel: item.reorderLevel,
            unitPrice: item.unitPrice,
            cost: item.cost,
            location: item.location,
            supplier: item.supplier,
            description: item.description,
          }}
        />
      </div>
    </div>
  );
}
