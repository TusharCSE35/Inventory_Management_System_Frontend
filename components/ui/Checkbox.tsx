"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: string;
  error?: string;
}

export function Checkbox({
  label,
  description,
  error,
  id,
  className,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div>
      <div className="flex items-start gap-2.5">
        <input
          id={checkboxId}
          type="checkbox"
          className={cn(
            "mt-0.5 size-4 shrink-0 cursor-pointer rounded-[5px] border-slate-300 accent-brand-600",
            error && "outline outline-2 outline-offset-1 outline-rose-300",
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {(label || description) && (
          <label
            htmlFor={checkboxId}
            className="cursor-pointer select-none text-[13px] leading-5 text-slate-600"
          >
            {label}
            {description && (
              <span className="mt-0.5 block text-xs text-slate-500">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1.5 pl-6.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
