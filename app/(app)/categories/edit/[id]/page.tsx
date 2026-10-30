import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { categories } from "@/lib/mock-data";

export function generateStaticParams() {
  return categories.map((entry) => ({ id: entry.id }));
}


export const metadata: Metadata = {
  title: "Edit category",
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = categories.find((entry) => entry.id === id);
  if (!category) notFound();

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <PageHeader
        title={`Edit ${category.name}`}
        description={`${category.itemCount} items currently belong to this category.`}
        actions={
          <>
            <Link
              href={`/inventory?category=${category.id}`}
              className={buttonStyles({ variant: "outline", size: "md" })}
            >
              <Icon name="boxes" size={15} />
              View items
            </Link>
            <Link
              href="/categories"
              className={buttonStyles({ variant: "ghost", size: "md" })}
            >
              Back to categories
            </Link>
          </>
        }
      />
      <div className="mt-6">
        <CategoryForm
          mode="edit"
          initialValues={{
            name: category.name,
            description: category.description,
            color: category.color,
            icon: category.icon,
          }}
        />
      </div>
    </div>
  );
}
