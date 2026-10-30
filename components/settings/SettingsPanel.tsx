"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const sections: { id: string; label: string; icon: IconName }[] = [
  { id: "workspace", label: "Workspace", icon: "building" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "appearance", label: "Appearance", icon: "palette" },
  { id: "billing", label: "Billing", icon: "credit-card" },
  { id: "danger", label: "Danger zone", icon: "alert" },
];

function SettingCard({
  id,
  title,
  description,
  children,
  icon,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  icon: IconName;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
    >
      <div className="flex items-start gap-3 border-b border-line px-5 py-4">
        <span className="grid size-8 place-items-center rounded-lg bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-100">
          <Icon name={icon} size={15} />
        </span>
        <div>
          <h2 className="text-[13.5px] font-semibold text-ink">{title}</h2>
          <p className="mt-0.5 text-[10.5px] text-slate-500">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function SettingsPanel() {
  const [workspace, setWorkspace] = useState("Northwind Supply");
  const [slug, setSlug] = useState("northwind");
  const [currency, setCurrency] = useState("USD");
  const [dateFormat, setDateFormat] = useState("MMM d, yyyy");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dangerNotice, setDangerNotice] = useState(false);

  const [alerts, setAlerts] = useState({
    lowStock: true,
    weeklyDigest: true,
    newMembers: false,
    productUpdates: true,
    stockout: true,
  });

  const [preferences, setPreferences] = useState({
    compact: false,
    reduceMotion: false,
    sound: false,
  });
  const [accent, setAccent] = useState("#6366f1");

  async function save() {
    setSaving(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[190px_1fr]">
      <nav className="hidden lg:sticky lg:top-24 lg:block" aria-label="Settings">
        <ul className="space-y-0.5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11.5px] font-medium text-slate-500 transition-colors hover:bg-white hover:text-ink"
              >
                <Icon name={section.icon} size={14} />
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-xl border border-line bg-white p-3">
          <p className="text-[10px] font-semibold text-ink">Need a hand?</p>
          <p className="mt-1 text-[9.5px] leading-4 text-slate-500">
            Read the setup guide or talk to our team.
          </p>
          <a
            href="#help"
            className="mt-2 inline-flex items-center gap-1 text-[9.5px] font-semibold text-brand-700 hover:underline"
          >
            Contact support
            <Icon name="arrow-right" size={10} />
          </a>
        </div>
      </nav>

      <div className="space-y-5">
        <SettingCard
          id="workspace"
          title="Workspace"
          description="Core details used across invoices, exports and alerts."
          icon="building"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Workspace name"
              value={workspace}
              onChange={(event) => setWorkspace(event.target.value)}
            />
            <Input
              label="Workspace URL"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              hint={`stockflow.app/${slug || "your-workspace"}`}
            />
            <Select
              label="Base currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="INR">INR — Indian Rupee</option>
            </Select>
            <Select
              label="Date format"
              value={dateFormat}
              onChange={(event) => setDateFormat(event.target.value)}
            >
              <option value="MMM d, yyyy">Mar 4, 2026</option>
              <option value="dd/MM/yyyy">04/03/2026</option>
              <option value="MM/dd/yyyy">03/04/2026</option>
              <option value="yyyy-MM-dd">2026-03-04</option>
            </Select>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 border-t border-line pt-4">
            {saved && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <Icon name="check-circle" size={13} />
                Settings saved
              </span>
            )}
            <Button size="md" loading={saving} onClick={save}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </SettingCard>

        <SettingCard
          id="notifications"
          title="Notifications"
          description="Choose what lands in your inbox and in the app."
          icon="bell"
        >
          <div className="divide-y divide-slate-100">
            <Toggle
              label="Low stock alerts"
              description="Get notified when an item drops below its reorder point."
              checked={alerts.lowStock}
              onChange={(value) =>
                setAlerts((current) => ({ ...current, lowStock: value }))
              }
            />
            <Toggle
              label="Stockout alerts"
              description="Immediate alert when an item reaches zero on hand."
              checked={alerts.stockout}
              onChange={(value) =>
                setAlerts((current) => ({ ...current, stockout: value }))
              }
            />
            <Toggle
              label="Weekly digest"
              description="A Monday summary of movement, value and top sellers."
              checked={alerts.weeklyDigest}
              onChange={(value) =>
                setAlerts((current) => ({ ...current, weeklyDigest: value }))
              }
            />
            <Toggle
              label="New team members"
              description="Know when someone accepts a workspace invitation."
              checked={alerts.newMembers}
              onChange={(value) =>
                setAlerts((current) => ({ ...current, newMembers: value }))
              }
            />
            <Toggle
              label="Product updates"
              description="Occasional notes about new Stockflow features."
              checked={alerts.productUpdates}
              onChange={(value) =>
                setAlerts((current) => ({ ...current, productUpdates: value }))
              }
            />
          </div>
        </SettingCard>

        <SettingCard
          id="appearance"
          title="Appearance"
          description="Tune how Stockflow looks and feels on this device."
          icon="palette"
        >
          <div>
            <p className="text-[12.5px] font-medium text-ink">Accent colour</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { name: "Indigo", value: "#6366f1" },
                { name: "Sky", value: "#0ea5e9" },
                { name: "Emerald", value: "#10b981" },
                { name: "Amber", value: "#f59e0b" },
                { name: "Rose", value: "#ec4899" },
                { name: "Violet", value: "#8b5cf6" },
              ].map((colour) => (
                <button
                  key={colour.value}
                  type="button"
                  aria-label={colour.name}
                  aria-pressed={accent === colour.value}
                  onClick={() => setAccent(colour.value)}
                  className={cn(
                    "grid size-8 place-items-center rounded-lg ring-1 ring-inset transition-all",
                    accent === colour.value
                      ? "ring-2 ring-brand-400 ring-offset-2"
                      : "ring-black/5 hover:scale-105",
                  )}
                  style={{ backgroundColor: colour.value }}
                >
                  {accent === colour.value && (
                    <Icon name="check" size={14} className="text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 divide-y divide-slate-100 border-t border-line">
            <Toggle
              label="Compact tables"
              description="Fit more rows on screen with tighter spacing."
              checked={preferences.compact}
              onChange={(value) =>
                setPreferences((current) => ({ ...current, compact: value }))
              }
            />
            <Toggle
              label="Reduce motion"
              description="Minimise animations and transitions."
              checked={preferences.reduceMotion}
              onChange={(value) =>
                setPreferences((current) => ({
                  ...current,
                  reduceMotion: value,
                }))
              }
            />
            <Toggle
              label="Sound effects"
              description="Play a soft chime when a movement is recorded."
              checked={preferences.sound}
              onChange={(value) =>
                setPreferences((current) => ({ ...current, sound: value }))
              }
            />
          </div>
        </SettingCard>

        <SettingCard
          id="billing"
          title="Billing"
          description="Your plan, seats and upcoming invoice."
          icon="credit-card"
        >
          <div className="flex flex-col gap-4 rounded-xl border border-brand-100 bg-brand-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-inset ring-brand-100">
                <Icon name="sparkles" size={17} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[12.5px] font-semibold text-ink">
                    Business plan
                  </p>
                  <Badge tone="brand">Active</Badge>
                </div>
                <p className="mt-0.5 text-[10.5px] text-slate-500">
                  6 seats · Unlimited SKUs · Advanced reporting
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[16px] font-semibold tracking-[-0.02em] text-ink">
                $149
                <span className="text-[10px] font-medium text-slate-500">
                  /mo
                </span>
              </p>
              <p className="text-[9.5px] text-slate-400">Renews 1 Nov 2026</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10.5px] text-slate-500">
              <Icon name="credit-card" size={14} />
              Visa ending in 4242
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="md">
                Billing history
              </Button>
              <Button size="md">Manage plan</Button>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          id="danger"
          title="Danger zone"
          description="Irreversible actions that affect the whole workspace."
          icon="alert"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12.5px] font-medium text-ink">
                Delete this workspace
              </p>
              <p className="mt-0.5 max-w-md text-[10.5px] leading-4.5 text-slate-500">
                Permanently removes all inventory, movement history and team
                members. This cannot be undone.
              </p>
            </div>
            <Button
              variant="danger"
              size="md"
              onClick={() => setDangerNotice(true)}
            >
              <Icon name="trash" size={14} />
              Delete workspace
            </Button>
          </div>
          {dangerNotice && (
            <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
              <Icon name="alert" size={13} />
              This is a demo workspace — destructive actions are disabled.
            </p>
          )}
        </SettingCard>
      </div>
    </div>
  );
}
