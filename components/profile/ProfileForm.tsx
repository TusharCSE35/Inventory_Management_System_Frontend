"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import {
  getSessionSnapshot,
  subscribeToSession,
} from "@/services/auth.service";
import type { User } from "@/types/auth";
import { initials } from "@/lib/utils";

const fallbackUser: User = {
  id: "demo",
  name: "Maya Chen",
  email: "maya@northwind.co",
  role: "Admin",
  company: "Northwind Supply",
};

export function ProfileForm() {
  const sessionValue = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    () => null,
  );
  const user = useMemo<User>(() => {
    if (!sessionValue) return fallbackUser;
    try {
      const session = JSON.parse(sessionValue) as { user?: User };
      return session.user ?? fallbackUser;
    } catch {
      return fallbackUser;
    }
  }, [sessionValue]);

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const [passwordErrors, setPasswordErrors] = useState<{
    current?: string;
    next?: string;
    confirm?: string;
  }>({});
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: typeof errors = {};
    if (!name) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSavingProfile(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    setSavingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  }

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get("currentPassword") ?? "");
    const newPassword = String(data.get("newPassword") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    const next: typeof passwordErrors = {};
    if (!currentPassword) next.current = "Enter your current password.";
    if (newPassword.length < 8) next.next = "Use at least 8 characters.";
    else if (newPassword === currentPassword)
      next.next = "Choose a different password.";
    if (confirmPassword !== newPassword)
      next.confirm = "Passwords do not match.";
    setPasswordErrors(next);
    if (Object.keys(next).length > 0) return;

    setSavingPassword(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 900));
    setSavingPassword(false);
    setPasswordSaved(true);
    form.reset();
    setTimeout(() => setPasswordSaved(false), 4000);
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <form
          key={user.id}
          onSubmit={saveProfile}
          noValidate
          className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
            <div>
              <h2 className="text-[13.5px] font-semibold text-ink">
                Personal information
              </h2>
              <p className="mt-0.5 text-[10.5px] text-slate-500">
                This is how you appear to teammates across Stockflow.
              </p>
            </div>
            <Icon name="user" size={17} className="text-slate-300" />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              name="name"
              defaultValue={user.name}
              onChange={() =>
                setErrors((current) => ({ ...current, name: undefined }))
              }
              error={errors.name}
            />
            <Input
              label="Work email"
              name="email"
              type="email"
              defaultValue={user.email}
              onChange={() =>
                setErrors((current) => ({ ...current, email: undefined }))
              }
              error={errors.email}
            />
            <Input
              label="Phone"
              name="phone"
              defaultValue="+1 (415) 555-0138"
              hint="Used for critical stock alerts only."
            />
            <Input
              label="Job title"
              name="jobTitle"
              defaultValue="Operations Lead"
            />
            <Select
              label="Timezone"
              name="timezone"
              defaultValue="America/Los_Angeles"
              containerClassName="sm:col-span-2"
            >
              <option value="America/Los_Angeles">
                Pacific Time (US &amp; Canada)
              </option>
              <option value="America/New_York">
                Eastern Time (US &amp; Canada)
              </option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Kolkata">India Standard Time</option>
              <option value="Australia/Sydney">Sydney (AEST)</option>
            </Select>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-[10px] text-slate-400">
              Last updated 2 days ago
            </p>
            <div className="flex items-center gap-2">
              {profileSaved && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <Icon name="check-circle" size={13} />
                  Profile saved
                </span>
              )}
              <Button type="submit" size="md" loading={savingProfile}>
                {savingProfile ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        </form>

        <form
          onSubmit={savePassword}
          noValidate
          className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
            <div>
              <h2 className="text-[13.5px] font-semibold text-ink">
                Password &amp; security
              </h2>
              <p className="mt-0.5 text-[10.5px] text-slate-500">
                Use a long, unique password you don&apos;t reuse elsewhere.
              </p>
            </div>
            <Icon name="lock" size={17} className="text-slate-300" />
          </div>

          <div className="mt-4 grid gap-4">
            <Input
              label="Current password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              onChange={() =>
                setPasswordErrors((current) => ({
                  ...current,
                  current: undefined,
                }))
              }
              error={passwordErrors.current}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="New password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                onChange={() =>
                  setPasswordErrors((current) => ({
                    ...current,
                    next: undefined,
                  }))
                }
                error={passwordErrors.next}
              />
              <Input
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                onChange={() =>
                  setPasswordErrors((current) => ({
                    ...current,
                    confirm: undefined,
                  }))
                }
                error={passwordErrors.confirm}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <Icon name="shield" size={12} />
              2FA enabled · Last changed 3 months ago
            </p>
            <div className="flex items-center gap-2">
              {passwordSaved && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <Icon name="check-circle" size={13} />
                  Updated
                </span>
              )}
              <Button
                type="submit"
                size="md"
                variant="outline"
                loading={savingPassword}
              >
                {savingPassword ? "Updating…" : "Update password"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-line bg-white p-5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 text-xl font-semibold text-white shadow-lg shadow-brand-500/20">
            {initials(user.name)}
          </div>
          <h3 className="mt-3 text-[14px] font-semibold tracking-[-0.01em] text-ink">
            {user.name}
          </h3>
          <p className="text-[11px] text-slate-500">{user.email}</p>
          <div className="mt-2.5 flex justify-center">
            <Badge tone="brand" dot>
              {user.role}
            </Badge>
          </div>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[10.5px] font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-ink"
          >
            <Icon name="edit" size={12} />
            Change photo
          </button>

          <dl className="mt-4 divide-y divide-slate-100 border-t border-line pt-1 text-left">
            {[
              ["Workspace", user.company || "Northwind Supply"],
              ["Member since", "Jan 2024"],
              ["Movements logged", "248"],
              ["Plan", "Business"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 text-[10.5px]"
              >
                <dt className="text-slate-400">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
            <Icon name="shield" size={14} className="text-emerald-500" />
            Account security
          </p>
          <div className="mt-3 space-y-2.5">
            {[
              "Two-factor authentication",
              "Active sessions",
              "Connected apps",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center justify-between text-[10.5px]"
              >
                <span className="text-slate-500">{label}</span>
                <Icon name="check" size={13} className="text-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
