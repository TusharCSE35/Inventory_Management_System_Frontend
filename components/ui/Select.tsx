"use client";

import {
  forwardRef,
  useId,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  selectClassName?: string;
  labelAction?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      error,
      hint,
      className,
      containerClassName,
      selectClassName,
      labelAction,
      id,
      children,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div className={cn("w-full", containerClassName)}>
        {(label || labelAction) && (
          <div className="mb-1.5 flex items-center justify-between gap-3">
            {label && (
              <label
                htmlFor={selectId}
                className="text-[13px] font-medium text-ink"
              >
                {label}
              </label>
            )}
            {labelAction}
          </div>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            className={cn(
              "h-11 w-full appearance-none rounded-xl border bg-white pl-3.5 pr-9 text-sm text-ink shadow-[0_1px_2px_rgba(15,23,42,0.03)] outline-none transition-all duration-200",
              "focus:border-brand-400 focus:ring-4 focus:ring-brand-100",
              error
                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                : "border-line hover:border-slate-300",
              selectClassName,
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
            <Icon name="chevron-down" size={15} />
          </span>
        </div>
        {error ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
            <Icon name="alert" size={13} />
            {error}
          </p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);
