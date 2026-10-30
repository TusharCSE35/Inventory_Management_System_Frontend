"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/Button";

const faqs = [
  {
    question: "How long does it take to get set up?",
    answer:
      "Most teams are live in under 10 minutes. Import a CSV or connect your storefront, add your warehouse locations, and Stockflow will map your catalogue automatically. If you would like a hand, our team offers free migration support on every plan.",
  },
  {
    question: "Can I import my existing spreadsheet?",
    answer:
      "Yes. Upload an XLSX or CSV and Stockflow intelligently maps your columns, flags duplicates and previews the import before anything is saved. Your existing SKUs, suppliers and stock levels come across intact.",
  },
  {
    question: "Does Stockflow work with my sales channels?",
    answer:
      "Stockflow syncs natively with Shopify, Amazon, WooCommerce and major ERPs including QuickBooks and Xero. Every sale updates stock in real time, and our open API covers anything else in your stack.",
  },
  {
    question: "How does barcode scanning work?",
    answer:
      "Open Stockflow on any phone or pair a Bluetooth scanner. Scan to receive, pick, transfer or count stock — no extra hardware required. Offline scans queue up and sync automatically when you are back online.",
  },
  {
    question: "Is my inventory data secure?",
    answer:
      "Security is built in, not bolted on. Stockflow is SOC 2 Type II certified, encrypts data in transit and at rest, and offers SSO, granular roles and full audit logs on the Scale plan. You can export or delete your data at any time.",
  },
  {
    question: "Can I change plans or cancel anytime?",
    answer:
      "Absolutely. Upgrade, downgrade or cancel from your billing settings whenever you like. Annual plans can be cancelled at renewal, and we will never lock your data behind a paywall — exports remain available on every plan.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions, answered."
            description="Everything you need to know about Stockflow, from setup to security. Can't find what you're looking for?"
            align="left"
          />

          <div className="mt-7 rounded-2xl border border-line bg-surface/70 p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-line">
                <Icon name="help" size={19} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  Still have questions?
                </p>
                <p className="text-[11.5px] text-slate-500">
                  We reply within one business day.
                </p>
              </div>
            </div>
            <Link
              href="mailto:hello@stockflow.app"
              className={buttonStyles({
                variant: "outline",
                size: "md",
                className: "mt-4 w-full bg-white",
              })}
            >
              <Icon name="mail" size={15} />
              Talk to a human
            </Link>
          </div>
        </div>

        <div className="divide-y divide-line rounded-2xl border border-line bg-white">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left transition-colors hover:bg-slate-50/70 sm:px-6"
                  >
                    <span className="text-[13.5px] font-semibold text-ink sm:text-[14px]">
                      {faq.question}
                    </span>
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? "rotate-180 border-brand-200 bg-brand-50 text-brand-700"
                          : "border-line bg-white text-slate-400"
                      }`}
                    >
                      <Icon
                        name={isOpen ? "minus" : "plus"}
                        size={12}
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  hidden={!isOpen}
                  className="animate-fade-up px-5 pb-5 sm:px-6"
                >
                  <p className="max-w-2xl text-[13px] leading-6.5 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
