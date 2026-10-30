"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/hooks/useAuth";
import { validateForgotPassword } from "@/lib/validations/auth.schema";

export function ForgotPasswordForm() {
  const { forgotPassword, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [resent, setResent] = useState(false);

  async function sendReset(target: string) {
    return forgotPassword({ email: target });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResent(false);

    const validation = validateForgotPassword(email);
    setFieldError(validation);
    if (validation) return;

    const result = await sendReset(email.trim());
    if (result) {
      setSentTo(email.trim());
    }
  }

  async function onResend() {
    if (!sentTo) return;
    const result = await sendReset(sentTo);
    if (result) setResent(true);
  }

  if (sentTo) {
    return (
      <div className="animate-fade-up">
        <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
            <Icon name="inbox" size={26} />
          </span>
          <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-ink">
            Check your inbox
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-6 text-slate-500">
            We sent a password reset link to{" "}
            <span className="font-semibold text-ink">{sentTo}</span>. It expires
            in 30 minutes.
          </p>

          <div className="mt-5 rounded-xl border border-line bg-surface/70 px-4 py-3 text-left">
            <p className="flex items-start gap-2 text-[11.5px] leading-5 text-slate-600">
              <Icon
                name="help"
                size={14}
                className="mt-0.5 shrink-0 text-slate-400"
              />
              <span>
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  type="button"
                  onClick={onResend}
                  disabled={loading}
                  className="font-semibold text-brand-700 hover:underline disabled:opacity-50"
                >
                  {loading ? "sending…" : "resend the email"}
                </button>
                .
              </span>
            </p>
          </div>

          {resent && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600">
              <Icon name="check-circle" size={14} />
              Email sent again
            </p>
          )}

          {error && (
            <p className="mt-3 text-[11.5px] text-rose-600">{error}</p>
          )}

          <Link
            href="/login"
            className={buttonStyles({
              size: "lg",
              className: "mt-5 w-full",
            })}
          >
            <Icon name="arrow-left" size={16} />
            Back to sign in
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            setSentTo(null);
            setResent(false);
          }}
          className="mx-auto mt-4 block text-[12px] font-medium text-slate-500 hover:text-ink"
        >
          Try a different email address
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          icon="mail"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setFieldError(undefined);
          }}
          error={fieldError}
          hint="Use the email associated with your Stockflow account."
        />

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-[12px] text-rose-700">
            <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {loading ? "Sending link…" : "Send reset link"}
          {!loading && <Icon name="arrow-right" size={16} />}
        </Button>
      </form>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-line bg-surface/60 px-3.5 py-3">
        <Icon name="shield-check" size={15} className="mt-0.5 text-emerald-600" />
        <p className="text-[11px] leading-5 text-slate-500">
          For your security, reset links expire after 30 minutes and can only
          be used once.
        </p>
      </div>

      <Link
        href="/login"
        className={buttonStyles({
          variant: "ghost",
          size: "md",
          className: "mt-4 w-full text-[12.5px] text-slate-500",
        })}
      >
        <Icon name="arrow-left" size={15} />
        Back to sign in
      </Link>

      <p className="mt-2 text-center text-[12.5px] text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Start a free trial
        </Link>
      </p>
    </div>
  );
}
