import { SectionHeader } from "./SectionHeader";
import { Icon, type IconName } from "@/components/ui/Icon";

const steps: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
}[] = [
  {
    number: "01",
    icon: "link",
    title: "Connect your data",
    description:
      "Import a CSV or sync your storefront in a couple of clicks. Your catalogue, suppliers and stock levels come along automatically.",
    bullets: ["CSV & spreadsheet import", "Shopify, Amazon, WooCommerce", "Open REST API"],
  },
  {
    number: "02",
    icon: "sliders",
    title: "Set your guardrails",
    description:
      "Define reorder points, lead times and preferred suppliers once. Stockflow learns the rhythm of your business from there.",
    bullets: ["Reorder points per SKU", "Supplier lead times", "Approval thresholds"],
  },
  {
    number: "03",
    icon: "zap",
    title: "Let Stockflow run",
    description:
      "Get notified before things run low, approve suggested purchase orders, and watch your stock stay predictably healthy.",
    bullets: ["Low-stock alerts", "One-click purchase orders", "Live accuracy reporting"],
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-y border-line/70 bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="How it works"
          title="From spreadsheet to sorted in three steps."
          description="No implementation project. No consultants. Most teams are tracking live stock before their coffee gets cold."
        />

        <div className="relative mt-12 lg:mt-16">
          <div className="absolute left-[16.6%] right-[16.6%] top-11 hidden border-t border-dashed border-brand-200 lg:block" />
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <span className="relative z-10 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_12px_24px_-12px_rgba(79,70,229,0.8)]">
                    <Icon name={step.icon} size={21} />
                  </span>
                  <span className="text-[36px] font-semibold leading-none tracking-tighter text-slate-100 transition-colors group-hover:text-brand-100">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-6 text-slate-600">
                  {step.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-[12.5px] text-slate-600"
                    >
                      <span className="grid size-4 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                        <Icon name="check" size={10} strokeWidth={2.4} />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-line bg-white px-5 py-3 text-[12px] text-slate-500 shadow-sm">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={14} className="text-brand-600" />
            Average setup time: 8 minutes
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <Icon name="users" size={14} className="text-brand-600" />
            Free migration support
          </span>
        </div>
      </div>
    </section>
  );
}
