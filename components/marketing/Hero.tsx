import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroDashboard } from "./HeroDashboard";

const avatars = [
  { initials: "MC", classes: "from-indigo-400 to-violet-500" },
  { initials: "JL", classes: "from-amber-300 to-orange-500" },
  { initials: "PN", classes: "from-emerald-300 to-teal-500" },
  { initials: "SR", classes: "from-sky-300 to-blue-500" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f8f9ff_0%,#fbfbff_52%,#ffffff_100%)]" />
      <div className="hero-glow absolute left-1/2 top-[-120px] -z-10 h-[560px] w-[900px] -translate-x-1/2" />
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="max-w-xl animate-fade-up">
          <Link
            href="#features"
            className="group inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/80 py-1 pl-1 pr-3 text-[12px] font-medium text-slate-600 shadow-sm transition-colors hover:border-brand-300"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              <Icon name="sparkles" size={11} />
              New
            </span>
            AI reorder forecasting is here
            <Icon
              name="arrow-right"
              size={13}
              className="text-slate-400 transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <h1 className="mt-6 text-balance text-[40px] font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-[54px] lg:text-[60px]">
            Inventory that keeps up with{" "}
            <span className="text-gradient">your business.</span>
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-[15.5px] leading-7 text-slate-600 sm:text-[17px]">
            Stockflow gives operations teams a real-time view of every SKU,
            automates the busywork, and helps you buy smarter — without the
            spreadsheet chaos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className={buttonStyles({ size: "xl", className: "group" })}
            >
              Start free trial
              <Icon
                name="arrow-right"
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="#how-it-works"
              className={buttonStyles({
                variant: "outline",
                size: "xl",
                className: "bg-white/80",
              })}
            >
              <span className="grid size-5 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Icon name="play" size={10} />
              </span>
              See how it works
            </a>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={13} className="text-emerald-600" />
              14-day free trial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={13} className="text-emerald-600" />
              No credit card required
            </span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200/80 pt-6">
            <div className="flex -space-x-2.5">
              {avatars.map((avatar) => (
                <span
                  key={avatar.initials}
                  className={`grid size-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${avatar.classes} text-[10px] font-bold text-white shadow-sm`}
                >
                  {avatar.initials}
                </span>
              ))}
              <span className="grid size-9 place-items-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-semibold text-slate-600">
                4k+
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={13}
                    className="text-amber-400"
                  />
                ))}
                <span className="ml-1 text-[12px] font-semibold text-ink">
                  4.9/5
                </span>
              </div>
              <p className="mt-0.5 text-[11.5px] text-slate-500">
                Loved by 4,000+ operations teams
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-200 lg:pl-4">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
