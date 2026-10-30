import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryForm } from "@/components/inventory/InventoryForm";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Add inventory item",
};

export default function CreateInventoryPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <PageHeader
        title="Add inventory item"
        description="Create a new SKU with stock, pricing and location details."
        actions={
          <Link
            href="/inventory"
            className={buttonStyles({ variant: "outline", size: "md" })}
          >
            <Icon name="arrow-left" size={15} />
            Back to inventory
          </Link>
        }
      />
      <div className="mt-6">
        <InventoryForm mode="create" />
      </div>
    </div>
  );
}
