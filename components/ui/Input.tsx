"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: IconName;
  rightElement?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelAction?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      hint,
      icon,
      rightElement,
      className,
      containerClassName,
      inputClassName,
      labelAction,
      id,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const describedBy = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    return (
      <div className={cn("w-full", containerClassName)}>
        {(label || labelAction) && (
          <div className="mb-1.5 flex items-center justify-between gap-3">
            {label && (
              <label
                htmlFor={inputId}
                className="text-[13px] font-medium text-ink"
              >
                {label}
              </label>
            )}
            {labelAction}
          </div>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Icon name={icon} size={17} />
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              "h-11 w-full rounded-xl border bg-white text-sm text-ink shadow-[0_1px_2px_rgba(15,23,42,0.03)] outline-none transition-all duration-200 placeholder:text-slate-400",
              "focus:border-brand-400 focus:ring-4 focus:ring-brand-100",
              icon ? "pl-10.5" : "pl-3.5",
              rightElement ? "pr-11" : "pr-3.5",
              error
                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                : "border-line hover:border-slate-300",
              inputClassName,
              className,
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {rightElement}
            </span>
          )}
        </div>
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
          >
            <Icon name="alert" size={13} />
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
