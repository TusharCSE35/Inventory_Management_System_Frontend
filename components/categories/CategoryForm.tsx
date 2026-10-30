"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const palette = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#ec4899" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Slate", value: "#64748b" },
];

const iconOptions: IconName[] = [
  "zap",
  "package",
  "warehouse",
  "tags",
  "activity",
  "briefcase",
  "boxes",
  "barcode",
  "globe",
  "cart",
];

export interface CategoryFormValues {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export function CategoryForm({
  mode = "create",
  initialValues,
}: {
  mode?: "create" | "edit";
  initialValues?: CategoryFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CategoryFormValues>(
    initialValues ?? {
      name: "",
      description: "",
      color: palette[0].value,
      icon: "package",
    },
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryFormValues, string>>
  >({});
  const [saving, setSaving] = useState(false);

  function update<K extends keyof CategoryFormValues>(
    key: K,
    value: CategoryFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Give this category a name.";
    else if (values.name.trim().length < 2)
      next.name = "Name must be at least 2 characters.";
    if (!values.description.trim())
      next.description = "Add a short description.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    router.push("/categories");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="grid gap-4">
            <Input
              label="Category name"
              name="name"
              placeholder="e.g. Electronics"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              error={errors.name}
            />
            <Textarea
              label="Description"
              name="description"
              placeholder="What kinds of products belong in this category?"
              rows={3}
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
              error={errors.description}
            />

            <div>
              <p className="mb-1.5 text-[13px] font-medium text-ink">Colour</p>
              <div className="flex flex-wrap gap-2">
                {palette.map((colour) => (
                  <button
                    key={colour.value}
                    type="button"
                    onClick={() => update("color", colour.value)}
                    aria-label={colour.name}
                    aria-pressed={values.color === colour.value}
                    className={cn(
                      "grid size-9 place-items-center rounded-xl ring-1 ring-inset transition-all",
                      values.color === colour.value
                        ? "ring-2 ring-offset-2 ring-brand-400"
                        : "ring-black/5 hover:scale-105",
                    )}
                    style={{ backgroundColor: colour.value }}
                  >
                    {values.color === colour.value && (
                      <Icon name="check" size={16} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[13px] font-medium text-ink">Icon</p>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => update("icon", icon)}
                    aria-label={icon}
                    aria-pressed={values.icon === icon}
                    className={cn(
                      "grid aspect-square place-items-center rounded-xl border transition-all",
                      values.icon === icon
                        ? "border-brand-300 bg-brand-50 text-brand-700 ring-2 ring-brand-100"
                        : "border-line bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600",
                    )}
                  >
                    <Icon name={icon} size={17} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Preview
            </h3>
            <div className="mt-3 flex items-start gap-3">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm"
                style={{ backgroundColor: values.color }}
              >
                <Icon name={values.icon as IconName} size={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {values.name || "Untitled category"}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-4.5 text-slate-500">
                  {values.description || "Your description will appear here."}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-slate-50/80 px-3 py-2">
                <p className="text-[9.5px] text-slate-400">Items</p>
                <p className="mt-0.5 text-[12px] font-semibold text-ink">0</p>
              </div>
              <div className="rounded-lg bg-slate-50/80 px-3 py-2">
                <p className="text-[9.5px] text-slate-400">Stock value</p>
                <p className="mt-0.5 text-[12px] font-semibold text-ink">
                  $0
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-4">
            <Button
              type="submit"
              size="lg"
              loading={saving}
              className="w-full"
            >
              {saving
                ? "Saving…"
                : mode === "edit"
                  ? "Save category"
                  : "Create category"}
              {!saving && <Icon name="check" size={15} />}
            </Button>
            <Link
              href="/categories"
              className={buttonStyles({
                variant: "outline",
                size: "md",
                className: "mt-2 w-full",
              })}
            >
              Cancel
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}
