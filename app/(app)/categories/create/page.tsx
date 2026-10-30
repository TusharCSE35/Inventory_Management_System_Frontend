import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Add category",
};

export default function CreateCategoryPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <PageHeader
        title="Add category"
        description="Group products so reporting, reordering and permissions stay tidy."
        actions={
          <Link
            href="/categories"
            className={buttonStyles({ variant: "outline", size: "md" })}
          >
            <Icon name="arrow-left" size={15} />
            Back to categories
          </Link>
        }
      />
      <div className="mt-6">
        <CategoryForm mode="create" />
      </div>
    </div>
  );
}
