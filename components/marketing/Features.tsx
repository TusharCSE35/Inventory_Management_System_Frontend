import { SectionHeader } from "./SectionHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

interface Feature {
  icon: IconName;
  title: string;
  description: string;
  accent: string;
  iconTone: string;
}

const features: Feature[] = [
  {
    icon: "chart-line",
    title: "Real-time stock visibility",
    description:
      "See every SKU, location and movement the second it happens. No refreshing, no stale exports, no surprises.",
    accent: "from-brand-500/10 to-transparent",
    iconTone: "bg-brand-50 text-brand-600 ring-brand-100",
  },
  {
    icon: "refresh",
    title: "Automated reordering",
    description:
      "Set reorder points once. Stockflow drafts purchase orders before you run out.",
    accent: "from-emerald-500/10 to-transparent",
    iconTone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  },
  {
    icon: "warehouse",
    title: "Multi-warehouse sync",
    description:
      "Transfer stock between locations with full traceability and instant reconciliation.",
    accent: "from-sky-500/10 to-transparent",
    iconTone: "bg-sky-50 text-sky-600 ring-sky-100",
  },
  {
    icon: "scan",
    title: "Barcode & QR scanning",
    description:
      "Receive, pick and count in seconds using any phone or handheld scanner.",
    accent: "from-amber-500/10 to-transparent",
    iconTone: "bg-amber-50 text-amber-600 ring-amber-100",
  },
  {
    icon: "sparkles",
    title: "Forecast demand with AI",
    description:
      "Spot seasonality, avoid overstock and plan purchases with confidence.",
    accent: "from-violet-500/10 to-transparent",
    iconTone: "bg-violet-50 text-violet-600 ring-violet-100",
  },
  {
    icon: "shield-check",
    title: "Roles & audit trails",
    description:
      "Granular permissions and a complete, exportable history of every change.",
    accent: "from-rose-500/10 to-transparent",
    iconTone: "bg-rose-50 text-rose-600 ring-rose-100",
  },
];

function StockPreview() {
  const rows = [
    { name: "Aurora Headphones", qty: "148 units", tone: "emerald" as const, label: "In stock" },
    { name: "Nomad Laptop Sleeve", qty: "12 units", tone: "amber" as const, label: "Low" },
    { name: "Drift Running Shoes", qty: "0 units", tone: "rose" as const, label: "Out" },
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-line bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.3)]">
      <div className="flex items-center justify-between border-b border-line bg-slate-50/60 px-3.5 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Live inventory
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center gap-2.5 px-3.5 py-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-slate-100 text-slate-500">
              <Icon name="package" size={13} />
            </span>
            <span className="flex-1 truncate text-[11px] font-medium text-ink">
              {row.name}
            </span>
            <span className="text-[10px] text-slate-400">{row.qty}</span>
            <Badge tone={row.tone} className="px-2 py-0.5 text-[9px]">
              {row.label}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForecastPreview() {
  const bars = [38, 54, 46, 68, 58, 82, 72, 94];
  return (
    <div className="mt-5 flex h-14 items-end gap-1.5 rounded-xl border border-line bg-slate-50/60 p-2.5">
      {bars.map((height, index) => (
        <div
          key={index}
          className="flex-1 rounded-sm bg-gradient-to-t from-brand-200 to-brand-500"
          style={{ height: `${height}%`, opacity: 0.55 + index * 0.05 }}
        />
      ))}
    </div>
  );
}

function RolesPreview() {
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {["Owner", "Operations", "Picker", "Finance", "Auditor"].map((role) => (
        <span
          key={role}
          className="rounded-md border border-line bg-slate-50 px-2 py-1 text-[9px] font-medium text-slate-500"
        >
          {role}
        </span>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Platform"
          title={
            <>
              Everything you need to run stock.
              <br className="hidden sm:block" /> Nothing you don&apos;t.
            </>
          }
          description="Replace spreadsheets, disconnected tools and late-night stock checks with one calm, connected system."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {features.map((feature, index) => {
            const featured = index === 0;
            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft sm:p-6 ${
                  featured ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid size-10 place-items-center rounded-xl ring-1 ring-inset ${feature.iconTone}`}
                    >
                      <Icon name={feature.icon} size={19} />
                    </span>
                    {featured && (
                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
                        Most loved
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[13.5px] leading-6 text-slate-600">
                    {feature.description}
                  </p>
                  {featured && <StockPreview />}
                  {feature.icon === "sparkles" && <ForecastPreview />}
                  {feature.icon === "shield-check" && <RolesPreview />}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
