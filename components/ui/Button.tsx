import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "dark"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_24px_-12px_rgba(91,82,245,0.6)] hover:bg-brand-700 hover:shadow-[0_14px_28px_-12px_rgba(91,82,245,0.7)] active:scale-[0.985]",
  secondary:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 active:scale-[0.985]",
  outline:
    "border border-line bg-white text-ink hover:border-brand-200 hover:bg-brand-50/50 active:scale-[0.985]",
  ghost: "text-ink-soft hover:bg-slate-100 hover:text-ink",
  dark: "bg-ink text-white hover:bg-slate-800 active:scale-[0.985]",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 shadow-[0_10px_24px_-12px_rgba(225,29,72,0.55)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-4.5 text-sm",
  lg: "h-12 px-6 text-[15px]",
  xl: "h-13 px-7 text-base",
  icon: "size-10",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading ? (
        <Icon name="loader" size={16} className="animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
