"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { marketingNav } from "@/config/app.config";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/80 bg-white/85 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/55 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-slate-100/80 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 sm:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-slate-100"
          >
            Log in
          </Link>
          <Link href="/register" className={buttonStyles({ size: "md" })}>
            Get started
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "x" : "menu"} size={20} />
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-line bg-white px-5 pb-6 pt-2 shadow-xl lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
                <Icon name="chevron-right" size={16} className="text-slate-400" />
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2.5 border-t border-line pt-4">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className={buttonStyles({ size: "lg" })}
            >
              Start free trial
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
