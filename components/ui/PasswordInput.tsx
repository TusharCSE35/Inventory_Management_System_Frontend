"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Input } from "./Input";
import { Icon } from "./Icon";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  error?: string;
  hint?: string;
  labelAction?: React.ReactNode;
};

export function PasswordInput({
  label = "Password",
  error,
  hint,
  labelAction,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      label={label}
      error={error}
      hint={hint}
      labelAction={labelAction}
      icon="lock"
      type={visible ? "text" : "password"}
      autoComplete={props.autoComplete ?? "current-password"}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="grid size-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          <Icon name={visible ? "eye-off" : "eye"} size={17} />
        </button>
      }
      {...props}
    />
  );
}
