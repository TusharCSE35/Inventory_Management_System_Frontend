import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/types/category";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <article
          key={category.id}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-[0.14]"
            style={{ backgroundColor: category.color }}
          />
          <div className="flex items-start justify-between gap-3">
            <span
              className="grid size-10 place-items-center rounded-xl text-white shadow-sm"
              style={{ backgroundColor: category.color }}
            >
              <Icon name={category.icon as IconName} size={18} />
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/inventory?category=${category.id}`}
                className="grid size-7 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
                aria-label={`View items in ${category.name}`}
                title="View items"
              >
                <Icon name="eye" size={15} />
              </Link>
              <Link
                href={`/categories/edit/${category.id}`}
                className="grid size-7 place-items-center rounded-md text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-700"
                aria-label={`Edit ${category.name}`}
                title="Edit category"
              >
                <Icon name="edit" size={14} />
              </Link>
            </div>
          </div>

          <h3 className="mt-4 text-[14px] font-semibold tracking-[-0.01em] text-ink">
            {category.name}
          </h3>
          <p className="mt-1 min-h-9 text-[11.5px] leading-4.5 text-slate-500">
            {category.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-slate-50/80 px-3 py-2">
              <p className="text-[9.5px] text-slate-400">Items</p>
              <p className="mt-0.5 text-[12.5px] font-semibold text-ink">
                {category.itemCount}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50/80 px-3 py-2">
              <p className="text-[9.5px] text-slate-400">Stock value</p>
              <p className="mt-0.5 text-[12.5px] font-semibold text-ink">
                {formatCurrency(category.value)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[10px] text-slate-400">
            <span>Updated recently</span>
            <Link
              href={`/inventory?category=${category.id}`}
              className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline"
            >
              Browse items
              <Icon name="arrow-right" size={11} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
