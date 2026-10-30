import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/Button";
import { categories } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  const totalItems = categories.reduce(
    (sum, category) => sum + category.itemCount,
    0,
  );
  const totalValue = categories.reduce(
    (sum, category) => sum + category.value,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <PageHeader
        title="Categories"
        description={`${categories.length} categories organising ${totalItems} SKUs worth ${formatCurrency(totalValue)}.`}
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
              href="/categories/create"
              className={buttonStyles({ size: "md" })}
            >
              <Icon name="plus" size={15} />
              Add category
            </Link>
          </>
        }
      />

      <div className="mt-6">
        <CategoryGrid categories={categories} />
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3.5">
        <Icon
          name="sparkles"
          size={16}
          className="mt-0.5 shrink-0 text-brand-600"
        />
        <p className="text-[11.5px] leading-5 text-brand-900/80">
          <span className="font-semibold text-brand-900">Tip:</span> categories
          power reporting, reorder rules and permissions. Keep them broad enough
          to be useful, and specific enough to be meaningful.
        </p>
      </div>
    </div>
  );
}
