"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { categories } from "@/lib/mock-data";
import { stockStatusMeta } from "@/config/table.config";
import { cn, formatCurrency } from "@/lib/utils";
import type { InventoryFormValues, StockStatus } from "@/types/inventory";

interface FormState {
  name: string;
  sku: string;
  categoryId: string;
  stock: string;
  reorderLevel: string;
  unitPrice: string;
  cost: string;
  location: string;
  supplier: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyState: FormState = {
  name: "",
  sku: "",
  categoryId: "cat_electronics",
  stock: "0",
  reorderLevel: "10",
  unitPrice: "",
  cost: "",
  location: "",
  supplier: "",
  description: "",
};

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: "package" | "boxes" | "warehouse";
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start gap-2.5 border-b border-line pb-4">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
          <Icon name={icon} size={15} />
        </span>
        <div>
          <h3 className="text-[13.5px] font-semibold text-ink">{title}</h3>
          <p className="mt-0.5 text-[10.5px] text-slate-500">{description}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function InventoryForm({
  mode = "create",
  initialValues,
  itemId,
}: {
  mode?: "create" | "edit";
  initialValues?: InventoryFormValues;
  itemId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormState>(
    initialValues
      ? {
          name: initialValues.name,
          sku: initialValues.sku,
          categoryId: initialValues.categoryId,
          stock: String(initialValues.stock),
          reorderLevel: String(initialValues.reorderLevel),
          unitPrice: String(initialValues.unitPrice),
          cost: String(initialValues.cost),
          location: initialValues.location,
          supplier: initialValues.supplier,
          description: initialValues.description,
        }
      : emptyState,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  const stock = Number(values.stock) || 0;
  const reorder = Number(values.reorderLevel) || 0;
  const price = Number(values.unitPrice) || 0;
  const previewStatus: StockStatus =
    stock === 0 ? "out-of-stock" : stock <= reorder ? "low-stock" : "in-stock";
  const meta = stockStatusMeta[previewStatus];
  const categoryName =
    categories.find((category) => category.id === values.categoryId)?.name ??
    "Uncategorised";

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Give this item a name.";
    if (!values.sku.trim()) next.sku = "A SKU is required.";
    else if (!/^[A-Za-z0-9-]{3,}$/.test(values.sku.trim()))
      next.sku = "Use letters, numbers and dashes only.";
    if (!values.categoryId) next.categoryId = "Choose a category.";
    if (values.stock === "" || Number(values.stock) < 0)
      next.stock = "Enter a valid quantity.";
    if (values.reorderLevel === "" || Number(values.reorderLevel) < 0)
      next.reorderLevel = "Enter a valid reorder level.";
    if (!values.unitPrice || Number(values.unitPrice) <= 0)
      next.unitPrice = "Unit price must be greater than 0.";
    if (values.cost !== "" && Number(values.cost) < 0)
      next.cost = "Cost cannot be negative.";
    if (!values.location.trim()) next.location = "Add a bin or shelf location.";
    if (!values.supplier.trim()) next.supplier = "Add a supplier.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 850));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      router.push("/inventory");
    }, 650);
  }

  function onDelete() {
    if (typeof window === "undefined") return;
    const confirmed = window.confirm(
      "Delete this item? This is a demo action and cannot be undone.",
    );
    if (confirmed) router.push("/inventory");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid items-start gap-5 lg:grid-cols-[1.65fr_1fr]">
        <div className="space-y-4">
          <FormSection
            icon="package"
            title="Item details"
            description="Core information used across the workspace."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Item name"
                name="name"
                placeholder="e.g. Aurora Wireless Headphones"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                error={errors.name}
                containerClassName="sm:col-span-2"
              />
              <Input
                label="SKU"
                name="sku"
                placeholder="e.g. AUR-1042"
                value={values.sku}
                onChange={(event) =>
                  update("sku", event.target.value.toUpperCase())
                }
                error={errors.sku}
                hint="Must be unique across your catalogue."
              />
              <Select
                label="Category"
                name="categoryId"
                value={values.categoryId}
                onChange={(event) => update("categoryId", event.target.value)}
                error={errors.categoryId}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Textarea
                label="Description"
                name="description"
                placeholder="A short description of the product, variants or packaging."
                value={values.description}
                onChange={(event) => update("description", event.target.value)}
                containerClassName="sm:col-span-2"
                rows={3}
              />
            </div>
          </FormSection>

          <FormSection
            icon="boxes"
            title="Stock & pricing"
            description="Keep thresholds and margins accurate."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Quantity on hand"
                name="stock"
                type="number"
                min={0}
                step={1}
                value={values.stock}
                onChange={(event) => update("stock", event.target.value)}
                error={errors.stock}
              />
              <Input
                label="Reorder point"
                name="reorderLevel"
                type="number"
                min={0}
                step={1}
                value={values.reorderLevel}
                onChange={(event) => update("reorderLevel", event.target.value)}
                error={errors.reorderLevel}
                hint="We'll alert you at or below this level."
              />
              <Input
                label="Unit price"
                name="unitPrice"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={values.unitPrice}
                onChange={(event) => update("unitPrice", event.target.value)}
                error={errors.unitPrice}
              />
              <Input
                label="Unit cost"
                name="cost"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={values.cost}
                onChange={(event) => update("cost", event.target.value)}
                error={errors.cost}
                hint="Used to calculate margin."
              />
            </div>
          </FormSection>

          <FormSection
            icon="warehouse"
            title="Location & supplier"
            description="Where this item lives and who supplies it."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Bin / shelf location"
                name="location"
                placeholder="e.g. A1-03"
                value={values.location}
                onChange={(event) => update("location", event.target.value)}
                error={errors.location}
              />
              <Input
                label="Supplier"
                name="supplier"
                placeholder="e.g. Northwind Traders"
                value={values.supplier}
                onChange={(event) => update("supplier", event.target.value)}
                error={errors.supplier}
              />
            </div>
          </FormSection>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Live preview
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-500">
                <Icon name="package" size={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {values.name || "Untitled item"}
                </p>
                <p className="text-[10.5px] text-slate-400">
                  {values.sku || "SKU —"} · {categoryName}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50/80 px-3 py-2.5">
              <span className="text-[10.5px] text-slate-500">Status</span>
              <Badge tone={meta.tone} dot>
                {meta.label}
              </Badge>
            </div>
            <dl className="mt-3 space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">On hand</dt>
                <dd className="font-semibold text-ink">{stock} units</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Stock value</dt>
                <dd className="font-semibold text-ink">
                  {formatCurrency(stock * price)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Margin</dt>
                <dd className="font-semibold text-ink">
                  {price > 0
                    ? `${Math.round(((price - (Number(values.cost) || 0)) / price) * 100)}%`
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" size={15} className="text-brand-600" />
              <p className="text-[11.5px] font-semibold text-brand-900">
                A few good habits
              </p>
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {[
                "Use a consistent SKU pattern.",
                "Set reorder points from real lead times.",
                "Add bin locations to speed up picking.",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-1.5 text-[10.5px] leading-4.5 text-brand-800/80"
                >
                  <Icon
                    name="check"
                    size={11}
                    className="mt-0.5 shrink-0 text-brand-600"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-4">
            {saved && (
              <p className="mb-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700">
                <Icon name="check-circle" size={14} />
                Item saved. Redirecting…
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              loading={saving}
              className="w-full"
            >
              {saving
                ? "Saving…"
                : mode === "edit"
                  ? "Save changes"
                  : "Create item"}
              {!saving && <Icon name="check" size={15} />}
            </Button>
            <Link
              href="/inventory"
              className={buttonStyles({
                variant: "outline",
                size: "md",
                className: "mt-2 w-full",
              })}
            >
              Cancel
            </Link>
            {mode === "edit" && itemId && (
              <button
                type="button"
                onClick={onDelete}
                className={cn(
                  "mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-rose-600 transition-colors hover:bg-rose-50",
                )}
              >
                <Icon name="trash" size={14} />
                Delete item
              </button>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}
