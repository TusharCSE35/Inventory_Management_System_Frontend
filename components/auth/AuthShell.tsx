import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

const stats = [
  { value: "99.2%", label: "Stock accuracy" },
  { value: "4,000+", label: "Teams onboard" },
  { value: "12M", label: "SKUs tracked" },
];

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.02fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-ink lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="pointer-events-none absolute -left-24 top-1/3 size-[420px] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-20 size-[360px] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 size-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="bg-grid absolute inset-0 opacity-[0.07]" />

        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <div className="flex items-center justify-between">
            <Logo theme="dark" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>

          <div className="max-w-md py-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-200">
              <Icon name="sparkles" size={12} />
              The inventory command center
            </span>
            <h2 className="mt-5 text-balance text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-white xl:text-[40px]">
              Every SKU. Every warehouse.{" "}
              <span className="bg-gradient-to-r from-brand-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                One calm view.
              </span>
            </h2>
            <p className="mt-4 text-[14px] leading-7 text-slate-400">
              Stop stitching together spreadsheets. Stockflow gives your team
              live stock, automated reordering and reporting they can actually
              trust.
            </p>

            <figure className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={12}
                    className="text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="mt-2.5 text-[12.5px] leading-6 text-slate-300">
                &ldquo;Stockflow replaced three tools and a very tired
                spreadsheet. Our team finally trusts the numbers.&rdquo;
              </blockquote>
              <figcaption className="mt-3.5 flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white">
                  MC
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold text-white">
                    Maya Chen
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Head of Operations, Northwind Supply
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[18px] font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10.5px] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-1.5 text-[10.5px] text-slate-500">
              <Icon name="shield-check" size={13} className="text-emerald-400" />
              SOC 2 Type II · 256-bit encryption · GDPR ready
            </p>
          </div>
        </div>
      </aside>

      <div className="relative flex min-h-screen flex-col bg-white">
        <div className="pointer-events-none absolute right-0 top-0 size-[420px] rounded-full bg-brand-50 blur-3xl" />

        <header className="relative flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
          >
            <Icon name="arrow-left" size={14} />
            Back to website
          </Link>
        </header>

        <main className="relative flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[420px] animate-fade-up">
            <div className="mb-7">
              <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink">
                {title}
              </h1>
              <p className="mt-2 text-[13.5px] leading-6 text-slate-500">
                {subtitle}
              </p>
            </div>
            {children}
          </div>
        </main>

        <footer className="relative px-5 pb-6 text-center text-[10.5px] text-slate-400">
          © {2026} Stockflow, Inc. ·{" "}
          <Link href="#" className="hover:text-slate-600">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="#" className="hover:text-slate-600">
            Terms
          </Link>{" "}
          ·{" "}
          <Link href="#" className="hover:text-slate-600">
            Help
          </Link>
        </footer>
      </div>
    </div>
  );
}
