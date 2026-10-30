"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { footerNav, siteConfig } from "@/config/app.config";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { isValidEmail } from "@/lib/utils";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <div>
      <p className="text-[13px] font-semibold text-ink">
        Inventory insights, monthly
      </p>
      {status === "success" ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-3 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100">
          <Icon name="check-circle" size={15} />
          You&apos;re on the list. Talk soon.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-3" noValidate>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setStatus("idle");
              }}
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-10 min-w-0 flex-1 rounded-xl border border-line bg-white px-3.5 text-[13px] text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
            <button
              type="submit"
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-white transition-colors hover:bg-brand-700"
              aria-label="Subscribe"
            >
              <Icon name="arrow-right" size={17} />
            </button>
          </div>
          {status === "error" && (
            <p className="mt-1.5 text-xs text-rose-600">
              Please enter a valid email.
            </p>
          )}
        </form>
      )}
      <p className="mt-2 text-[11px] text-slate-400">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-slate-600">
              The inventory platform for teams who would rather grow the
              business than chase stock counts.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-9 place-items-center rounded-lg border border-line text-[11px] font-bold text-slate-500 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                >
                  {social.label === "GitHub"
                    ? "GH"
                    : social.label === "LinkedIn"
                      ? "in"
                      : "X"}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-slate-600 transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-slate-500">
            <span>
              © {2026} {siteConfig.name}, Inc.
            </span>
            <Link href="#" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="#" className="hover:text-ink">
              Terms
            </Link>
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </span>
          </div>
          <div className="w-full md:w-72">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
