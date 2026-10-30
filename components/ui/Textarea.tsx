"use client";

import {
  forwardRef,
  useId,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, className, containerClassName, id, ...props },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-[13px] font-medium text-ink"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          className={cn(
            "min-h-24 w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink shadow-[0_1px_2px_rgba(15,23,42,0.03)] outline-none transition-all duration-200 placeholder:text-slate-400",
            "focus:border-brand-400 focus:ring-4 focus:ring-brand-100",
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
              : "border-line hover:border-slate-300",
            className,
          )}
          {...props}
        />
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
