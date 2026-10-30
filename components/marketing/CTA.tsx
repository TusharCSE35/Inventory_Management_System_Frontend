import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function CTA() {
  return (
    <section className="bg-white pb-20 pt-4 sm:pb-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-14 text-center shadow-[0_40px_100px_-40px_rgba(49,46,129,0.7)] sm:px-10 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="bg-dots absolute inset-0 opacity-20" />

          <div className="animate-float-small absolute left-8 top-10 hidden rounded-xl border border-white/15 bg-white/10 p-3 text-left backdrop-blur sm:block">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-400/20 text-emerald-300">
                <Icon name="check-circle" size={14} />
              </span>
              <div>
                <p className="text-[9px] font-semibold text-white">
                  Stock accuracy
                </p>
                <p className="text-[8px] text-brand-200">99.2% this month</p>
              </div>
            </div>
          </div>

          <div className="animate-float absolute bottom-10 right-8 hidden rounded-xl border border-white/15 bg-white/10 p-3 text-left backdrop-blur sm:block">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-white/15 text-white">
                <Icon name="truck" size={14} />
              </span>
              <div>
                <p className="text-[9px] font-semibold text-white">
                  PO-2084 received
                </p>
                <p className="text-[8px] text-brand-200">60 units added</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-100 backdrop-blur">
              <Icon name="sparkles" size={12} />
              Start today
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-4xl lg:text-[44px]">
              Ready to make stock feel effortless?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-[14.5px] leading-7 text-brand-100/90 sm:text-[15.5px]">
              Join 4,000+ teams who stopped guessing and started growing.
              Your first 14 days are on us.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className={buttonStyles({
                  size: "xl",
                  className:
                    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 focus-visible:outline-white",
                })}
              >
                Start your free trial
                <Icon name="arrow-right" size={17} />
              </Link>

              <Link
                href="/login"
                className={buttonStyles({
                  size: "xl",
                  variant: "ghost",
                  className:
                    "border border-white/30 bg-white/5 text-white hover:border-white/50 hover:bg-white/15 hover:text-white",
                })}
              >
                Book a demo
              </Link>
            </div>
            <p className="mt-5 text-[11.5px] text-brand-200">
              No credit card required · Cancel anytime · Free migration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
