import { Icon } from "@/components/ui/Icon";

const miniNav = [
  { icon: "layout" as const, active: false },
  { icon: "boxes" as const, active: true },
  { icon: "tags" as const, active: false },
  { icon: "activity" as const, active: false },
  { icon: "settings" as const, active: false },
];

const miniStats = [
  { label: "Inbound", value: "810", tone: "text-emerald-600" },
  { label: "Outbound", value: "610", tone: "text-brand-600" },
  { label: "Low stock", value: "18", tone: "text-amber-600" },
];

const stockRows = [
  { name: "Aurora Headphones", sku: "AUR-1042", qty: 148, pct: 82, color: "bg-emerald-500" },
  { name: "Nomad Sleeve 14\"", sku: "NMD-2201", qty: 12, pct: 22, color: "bg-amber-500" },
  { name: "Halo Desk Lamp", sku: "HAL-3308", qty: 64, pct: 58, color: "bg-brand-500" },
];

export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] animate-scale-in lg:mr-0">
      <div className="absolute -left-10 top-16 -z-10 size-56 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="absolute -right-8 bottom-4 -z-10 size-48 rounded-full bg-cyan-300/25 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-pop">
        <div className="flex h-9 items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4">
          <span className="size-2 rounded-full bg-rose-300" />
          <span className="size-2 rounded-full bg-amber-300" />
          <span className="size-2 rounded-full bg-emerald-300" />
          <div className="mx-auto flex h-5 w-44 items-center justify-center gap-1.5 rounded-md bg-white text-[9px] font-medium text-slate-400 ring-1 ring-slate-200/80">
            <Icon name="lock" size={9} />
            app.stockflow.io/dashboard
          </div>
        </div>

        <div className="flex">
          <aside className="hidden w-14 flex-col items-center gap-2 border-r border-slate-100 bg-slate-50/40 py-4 sm:flex">
            <span className="mb-2 grid size-7 place-items-center rounded-lg bg-brand-600 text-white">
              <Icon name="boxes" size={14} />
            </span>
            {miniNav.map((item) => (
              <span
                key={item.icon}
                className={
                  item.active
                    ? "grid size-8 place-items-center rounded-lg bg-white text-brand-600 shadow-sm ring-1 ring-slate-200/70"
                    : "grid size-8 place-items-center rounded-lg text-slate-400"
                }
              >
                <Icon name={item.icon} size={15} />
              </span>
            ))}
            <span className="mt-auto grid size-7 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-[9px] font-bold text-white">
              MC
            </span>
          </aside>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  Inventory overview
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    $184,320
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                    <Icon name="trending-up" size={10} />
                    12.4%
                  </span>
                </div>
              </div>
              <span className="inline-flex h-6 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-[9px] font-medium text-slate-500">
                Last 7 months
                <Icon name="chevron-down" size={10} />
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {miniStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-2"
                >
                  <p className="text-[9px] text-slate-400">{stat.label}</p>
                  <p className={`text-sm font-semibold ${stat.tone}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <svg
                viewBox="0 0 520 150"
                className="h-[120px] w-full"
                role="img"
                aria-label="Inbound and outbound stock trend"
              >
                <defs>
                  <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[30, 65, 100, 135].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="520"
                    y1={y}
                    y2={y}
                    stroke="#eef1f7"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M0 112 C45 104 70 92 100 96 S160 78 200 82 S260 62 300 66 S370 42 410 48 S480 26 520 22 L520 150 L0 150 Z"
                  fill="url(#hero-area)"
                />
                <path
                  d="M0 112 C45 104 70 92 100 96 S160 78 200 82 S260 62 300 66 S370 42 410 48 S480 26 520 22"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-draw"
                />
                <path
                  d="M0 128 C50 122 80 118 110 120 S180 108 220 112 S300 96 340 100 S420 86 460 90 S500 80 520 78"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="5 5"
                  opacity="0.8"
                />
                <circle cx="520" cy="22" r="4" fill="#6366f1" />
                <circle cx="520" cy="22" r="8" fill="#6366f1" opacity="0.15" />
              </svg>
              <div className="mt-1 flex justify-between px-0.5 text-[9px] font-medium text-slate-400">
                {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map(
                  (month) => (
                    <span key={month}>{month}</span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
                <p className="text-[10px] font-semibold text-ink">
                  Fast-moving stock
                </p>
                <span className="text-[9px] font-medium text-brand-600">
                  View all
                </span>
              </div>
              <div className="divide-y divide-slate-50">
                {stockRows.map((row) => (
                  <div
                    key={row.sku}
                    className="flex items-center gap-2.5 px-3 py-2"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-500">
                      <Icon name="package" size={12} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[10px] font-medium text-ink">
                          {row.name}
                        </p>
                        <span className="shrink-0 text-[9px] font-semibold text-slate-500">
                          {row.qty}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${row.color}`}
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="text-[8px] text-slate-400">
                          {row.sku}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-5 top-28 hidden w-52 rounded-xl border border-slate-200/80 bg-white p-3 shadow-card sm:block lg:-right-9">
        <div className="flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
            <Icon name="truck" size={15} />
          </span>
          <div>
            <p className="text-[10px] font-semibold text-ink">
              PO-2084 received
            </p>
            <p className="mt-0.5 text-[9px] leading-4 text-slate-500">
              60 units added to Warehouse A
            </p>
            <p className="mt-1 text-[8px] font-medium text-emerald-600">
              Just now
            </p>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -bottom-6 -left-4 hidden w-44 rounded-xl border border-slate-200/80 bg-white p-3 shadow-card sm:block lg:-left-8">
        <div className="flex items-center gap-2.5">
          <div className="relative grid size-10 place-items-center">
            <svg viewBox="0 0 40 40" className="absolute inset-0 size-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#eef1f7"
                strokeWidth="4"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#34d399"
                strokeWidth="4"
                strokeDasharray="100.5"
                strokeDashoffset="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[9px] font-bold text-ink">99%</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-ink">Stock accuracy</p>
            <p className="text-[9px] text-slate-500">All warehouses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
