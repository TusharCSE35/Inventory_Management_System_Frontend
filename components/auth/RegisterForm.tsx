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
import { getPasswordStrength } from "@/lib/utils";
import {
  validateRegister,
  type RegisterErrors,
  type RegisterValues,
} from "@/lib/validations/auth.schema";

const initialValues: RegisterValues = {
  name: "",
  email: "",
  company: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export function RegisterForm() {
  const router = useRouter();
  const { register, loading, error } = useAuth();
  const [values, setValues] = useState<RegisterValues>(initialValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const strength = getPasswordStrength(values.password);

  function update<K extends keyof RegisterValues>(
    key: K,
    value: RegisterValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const nextErrors = validateRegister(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const session = await register({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || undefined,
      password: values.password,
    });

    if (session) {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input
          label="Full name"
          name="name"
          placeholder="Maya Chen"
          autoComplete="name"
          icon="user"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
        />

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

        <Input
          label="Company"
          name="company"
          placeholder="Northwind Supply (optional)"
          autoComplete="organization"
          icon="briefcase"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          error={errors.company}
        />

        <div>
          <PasswordInput
            name="password"
            label="Create password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            value={values.password}
            onChange={(event) => update("password", event.target.value)}
            error={errors.password}
          />
          {values.password.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <span
                    key={step}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      strength.score >= step ? strength.color : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>
              <span
                className={`w-11 text-right text-[10px] font-semibold ${
                  strength.score <= 1
                    ? "text-rose-600"
                    : strength.score === 2
                      ? "text-amber-600"
                      : strength.score === 3
                        ? "text-brand-600"
                        : "text-emerald-600"
                }`}
              >
                {strength.label}
              </span>
            </div>
          )}
        </div>

        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(event) => update("confirmPassword", event.target.value)}
          error={errors.confirmPassword}
        />

        <Checkbox
          label={
            <span>
              I agree to the{" "}
              <Link
                href="#"
                onClick={(event) => event.stopPropagation()}
                className="font-medium text-brand-700 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                onClick={(event) => event.stopPropagation()}
                className="font-medium text-brand-700 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          }
          checked={values.terms}
          onChange={(event) => update("terms", event.target.checked)}
          error={errors.terms}
        />

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-[12px] text-rose-700">
            <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {loading ? "Creating your workspace…" : "Create account"}
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

      <AuthDivider label="or sign up with" />

      <SocialButtons
        onSelect={(provider) =>
          setNotice(
            `${provider} sign-up isn't connected in this demo. Create your account with email above.`,
          )
        }
      />

      <p className="mt-5 text-center text-[11px] text-slate-400">
        Free 14-day trial · No credit card required · Cancel anytime
      </p>

      <p className="mt-4 text-center text-[12.5px] text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
