import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

const benefits = [
  "Live KPIs and stock health at a glance",
  "Instant alerts when reorder points are crossed",
  "Batch actions, labels and POs in one flow",
  "Native integrations with your channels and ERP",
];

const integrations = [
  "Shopify",
  "Amazon",
  "WooCommerce",
  "QuickBooks",
  "Slack",
  "Xero",
];

const lowStock = [
  { name: "Nomad Laptop Sleeve", sku: "NMD-2201", left: "12 left", pct: 22 },
  { name: "Echo Bluetooth Speaker", sku: "ECH-2214", left: "18 left", pct: 34 },
  { name: "Drift Running Shoes", sku: "DRF-4410", left: "Out", pct: 0 },
];

export function ProductShowcase() {
  return (
    <section id="integrations" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-600/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-[0.06]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <SectionHeader
                eyebrow="Command center"
                theme="dark"
                align="left"
                title="One calm place for every moving part."
                description="Stop stitching together exports. Stockflow brings purchasing, receiving, transfers and reporting into a single, beautifully fast workspace."
              />

              <ul className="mt-7 space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-[14px] text-slate-300"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300 ring-1 ring-inset ring-brand-400/30">
                      <Icon name="check" size={11} strokeWidth={2.4} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="group mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-300 transition-colors hover:text-white"
              >
                Explore the live dashboard
                <Icon
                  name="arrow-right"
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-500/20 via-transparent to-cyan-400/10 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                      Stock health
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      $184,320{" "}
                      <span className="text-[10px] font-medium text-emerald-400">
                        +12.4%
                      </span>
                    </p>
                  </div>
                  <Badge
                    tone="emerald"
                    dot
                    className="bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
                  >
                    Live
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Inbound", value: "810" },
                    { label: "Outbound", value: "610" },
                    { label: "Accuracy", value: "99.2%" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2"
                    >
                      <p className="text-[9px] text-slate-400">{metric.label}</p>
                      <p className="text-[13px] font-semibold text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <svg
                  viewBox="0 0 480 130"
                  className="mt-4 h-[110px] w-full"
                  role="img"
                  aria-label="Stock health trend"
                >
                  <defs>
                    <linearGradient id="showcase-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[28, 60, 92, 124].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="480"
                      y1={y}
                      y2={y}
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                    />
                  ))}
                  <path
                    d="M0 100 C50 96 70 78 100 82 S160 66 200 70 S270 42 310 50 S380 34 420 30 S460 20 480 18 L480 130 L0 130 Z"
                    fill="url(#showcase-area)"
                  />
                  <path
                    d="M0 100 C50 96 70 78 100 82 S160 66 200 70 S270 42 310 50 S380 34 420 30 S460 20 480 18"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 116 C60 112 90 106 130 110 S210 96 250 100 S330 88 370 90 S440 78 480 76"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                    opacity="0.7"
                  />
                </svg>

                <div className="mt-2 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <p className="text-[10px] font-semibold text-white">
                      Needs attention
                    </p>
                    <span className="text-[9px] font-medium text-brand-300">
                      Auto-reorder ready
                    </span>
                  </div>
                  <div className="divide-y divide-white/[0.06]">
                    {lowStock.map((item) => (
                      <div
                        key={item.sku}
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-white/[0.06] text-slate-300">
                          <Icon name="package" size={13} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[10.5px] font-medium text-white">
                            {item.name}
                          </p>
                          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full ${
                                item.pct === 0
                                  ? "bg-rose-400"
                                  : item.pct < 30
                                    ? "bg-amber-400"
                                    : "bg-brand-400"
                              }`}
                              style={{ width: `${Math.max(item.pct, 4)}%` }}
                            />
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-[9px] font-semibold ${
                            item.pct === 0 ? "text-rose-400" : "text-amber-300"
                          }`}
                        >
                          {item.left}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Connects with your stack
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {integrations.map((integration) => (
                <span
                  key={integration}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-slate-300"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
