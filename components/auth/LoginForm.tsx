"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SocialButtons } from "./SocialButtons";
import { AuthDivider } from "./AuthDivider";
import { useAuth } from "@/hooks/useAuth";
import {
  validateLogin,
  type LoginErrors,
  type LoginValues,
} from "@/lib/validations/auth.schema";

const initialValues: LoginValues = {
  email: "",
  password: "",
  remember: true,
};

export function LoginForm() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [notice, setNotice] = useState<string | null>(null);

  function update<K extends keyof LoginValues>(key: K, value: LoginValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const session = await login({
      email: values.email.trim(),
      password: values.password,
      remember: values.remember,
    });

    if (session) {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-brand-100 bg-brand-50/60 px-3.5 py-3">
        <Icon
          name="sparkles"
          size={15}
          className="mt-0.5 shrink-0 text-brand-600"
        />
        <p className="text-[11.5px] leading-5 text-brand-800">
          <span className="font-semibold">Demo mode</span> — use any valid email
          with a password of 8+ characters to explore the workspace.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input
          label="Work email"
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          icon="mail"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
        />

        <PasswordInput
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={(event) => update("password", event.target.value)}
          error={errors.password}
          labelAction={
            <Link
              href="/forgot-password"
              className="text-[11.5px] font-semibold text-brand-700 hover:text-brand-800 hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        <div className="flex items-center justify-between gap-3 pt-0.5">
          <Checkbox
            label="Keep me signed in"
            checked={values.remember}
            onChange={(event) => update("remember", event.target.checked)}
          />
          <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-400">
            <Icon name="lock" size={11} />
            Secure sign-in
          </span>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-[12px] text-rose-700">
            <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
          {!loading && <Icon name="arrow-right" size={16} />}
        </Button>
      </form>

      <div aria-live="polite">
        {notice && (
          <p className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-5 text-slate-600">
            <Icon name="alert" size={13} className="mt-0.5 shrink-0" />
            {notice}
          </p>
        )}
      </div>

      <AuthDivider label="or sign in with" />

      <SocialButtons
        onSelect={(provider) =>
          setNotice(
            `${provider} sign-in isn't connected in this demo. Use your email and password above.`,
          )
        }
      />

      <p className="mt-6 text-center text-[12.5px] text-slate-500">
        New to Stockflow?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
