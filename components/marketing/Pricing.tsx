"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

const plans = [
  {
    name: "Starter",
    description: "For small catalogues finding their feet.",
    monthly: 29,
    annual: 23,
    cta: "Start free trial",
    features: [
      "Up to 500 SKUs",
      "1 warehouse location",
      "2 team seats",
      "Barcode scanning",
      "Low-stock alerts",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "For growing teams running serious operations.",
    monthly: 79,
    annual: 63,
    cta: "Start free trial",
    featured: true,
    features: [
      "Up to 10,000 SKUs",
      "3 warehouse locations",
      "10 team seats",
      "Automated purchase orders",
      "AI demand forecasting",
      "Sales channel integrations",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    description: "For multi-location distributors and enterprise.",
    monthly: 199,
    annual: 159,
    cta: "Talk to sales",
    features: [
      "Unlimited SKUs",
      "Unlimited warehouses",
      "Unlimited seats",
      "SSO & audit logs",
      "API access & webhooks",
      "Dedicated success manager",
      "99.9% uptime SLA",
    ],
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-line/70 bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple pricing that scales with you."
          description="Start free for 14 days. Upgrade when you are ready — no setup fees, no long-term contracts, no surprises."
        />

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm">
            {(
              [
                { value: "monthly", label: "Monthly" },
                { value: "annual", label: "Annual" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBilling(option.value)}
                aria-pressed={billing === option.value}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all",
                  billing === option.value
                    ? "bg-ink text-white shadow-sm"
                    : "text-slate-500 hover:text-ink",
                )}
              >
                {option.label}
                {option.value === "annual" && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                      billing === "annual"
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-emerald-50 text-emerald-700",
                    )}
                  >
                    SAVE 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => {
            const price = billing === "annual" ? plan.annual : plan.monthly;
            return (
              <article
                key={plan.name}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300 sm:p-7",
                  plan.featured
                    ? "border-brand-300 shadow-[0_24px_70px_-30px_rgba(79,70,229,0.55)] ring-1 ring-brand-200 lg:-mt-2 lg:pb-9"
                    : "border-line hover:border-slate-300 hover:shadow-soft",
                )}
              >
                {plan.featured && (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b from-brand-50/80 to-transparent" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                      Most popular
                    </span>
                  </>
                )}

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-ink">
                      {plan.name}
                    </h3>
                    {plan.featured && (
                      <Icon
                        name="sparkles"
                        size={17}
                        className="text-brand-500"
                      />
                    )}
                  </div>
                  <p className="mt-1 min-h-10 text-[12.5px] leading-5 text-slate-500">
                    {plan.description}
                  </p>
                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-[38px] font-semibold leading-none tracking-[-0.04em] text-ink">
                      ${price}
                    </span>
                    <span className="pb-1 text-[12px] text-slate-500">
                      / month
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    {billing === "annual"
                      ? `Billed annually · $${price * 12}/year`
                      : "Billed monthly · cancel anytime"}
                  </p>

                  <Link
                    href="/register"
                    className={buttonStyles({
                      variant: plan.featured ? "primary" : "outline",
                      size: "lg",
                      className: "mt-5 w-full",
                    })}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[12.5px] text-slate-600"
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full",
                            plan.featured
                              ? "bg-brand-100 text-brand-700"
                              : "bg-emerald-50 text-emerald-600",
                          )}
                        >
                          <Icon name="check" size={9} strokeWidth={2.6} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[12px] text-slate-500">
          All plans include a 14-day free trial · No credit card required ·{" "}
          <Link href="#" className="font-medium text-brand-700 hover:underline">
            Need something custom? Talk to sales
          </Link>
        </p>
      </div>
    </section>
  );
}
