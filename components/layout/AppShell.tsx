"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn, initials } from "@/lib/utils";
import { primaryNav, secondaryNav } from "@/config/navigation.config";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import {
  getSessionSnapshot,
  logout,
  subscribeToSession,
} from "@/services/auth.service";
import type { User } from "@/types/auth";

const fallbackUser: User = {
  id: "demo",
  name: "Maya Chen",
  email: "maya@northwind.co",
  role: "Admin",
};

const notifications = [
  {
    id: "n1",
    icon: "alert" as const,
    tone: "bg-amber-50 text-amber-600",
    title: "3 items below reorder point",
    time: "2 min ago",
  },
  {
    id: "n2",
    icon: "truck" as const,
    tone: "bg-emerald-50 text-emerald-600",
    title: "PO-2084 marked as received",
    time: "24 min ago",
  },
  {
    id: "n3",
    icon: "check-circle" as const,
    tone: "bg-brand-50 text-brand-600",
    title: "Cycle count for Warehouse A approved",
    time: "1 hr ago",
  },
];

function pageTitle(pathname: string): string {
  const all = [...primaryNav, ...secondaryNav];
  const match = all
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.label ?? "Dashboard";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const sessionValue = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    () => null,
  );
  const user = useMemo<User>(() => {
    if (!sessionValue) return fallbackUser;
    try {
      const session = JSON.parse(sessionValue) as { user?: User };
      return session.user ?? fallbackUser;
    } catch {
      return fallbackUser;
    }
  }, [sessionValue]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const title = pageTitle(pathname);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <Logo />
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden"
          aria-label="Close navigation"
        >
          <Icon name="x" size={18} />
        </button>
      </div>

      <div className="px-3 pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/60 px-3 py-2.5 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-[11px] font-bold text-white">
            N
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-ink">
              {user.company || "Northwind Supply"}
            </p>
            <p className="text-[10px] text-slate-500">Growth plan</p>
          </div>
          <Icon name="chevron-down" size={14} className="text-slate-400" />
        </Link>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-3 thin-scrollbar" aria-label="Workspace">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Workspace
        </p>
        <div className="mt-2 space-y-0.5">
          {primaryNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-ink",
                )}
              >
                <Icon
                  name={item.icon}
                  size={17}
                  className={active ? "text-brand-600" : "text-slate-400"}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                      active
                        ? "bg-brand-100 text-brand-700"
                        : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <p className="mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Account
        </p>
        <div className="mt-2 space-y-0.5">
          {secondaryNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-ink",
                )}
              >
                <Icon
                  name={item.icon}
                  size={17}
                  className={active ? "text-brand-600" : "text-slate-400"}
                />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
          <span className="grid size-8 place-items-center rounded-lg bg-white/15">
            <Icon name="sparkles" size={16} />
          </span>
          <p className="mt-2.5 text-[12.5px] font-semibold">Need a hand?</p>
          <p className="mt-1 text-[10.5px] leading-4.5 text-brand-100">
            Book a free 20-minute onboarding session with our team.
          </p>
          <Link
            href="#"
            className="mt-3 inline-flex items-center gap-1 text-[10.5px] font-semibold text-white hover:underline"
          >
            Book onboarding
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white">
            {initials(user.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-ink">
              {user.name}
            </p>
            <p className="truncate text-[10px] text-slate-500">{user.role}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="grid size-7 place-items-center rounded-md text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            aria-label="Log out"
            title="Log out"
          >
            <Icon name="logout" size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-white lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl">
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-9 place-items-center rounded-lg border border-line text-slate-500 lg:hidden"
              aria-label="Open navigation"
            >
              <Icon name="menu" size={18} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400">
                <span>Workspace</span>
                <Icon name="chevron-right" size={10} />
                <span className="truncate font-medium text-slate-500">
                  {title}
                </span>
              </div>
              <h1 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
                {title}
              </h1>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-line bg-white px-3 py-1.5 text-slate-400 transition-all focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100 md:flex">
                <Icon name="search" size={15} />
                <input
                  type="search"
                  placeholder="Search anything…"
                  aria-label="Search workspace"
                  className="w-40 bg-transparent text-[12px] text-ink placeholder:text-slate-400 focus:outline-none focus:ring-0 lg:w-52"
                />
                <kbd className="rounded border border-line bg-slate-50 px-1.5 py-0.5 text-[9px] font-medium text-slate-400">
                  /
                </kbd>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen((value) => !value);
                    setUserMenuOpen(false);
                  }}
                  className="relative grid size-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                >
                  <Icon name="bell" size={18} />
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full z-40 mt-2 w-80 animate-scale-in overflow-hidden rounded-xl border border-line bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-line px-4 py-3">
                      <p className="text-[12.5px] font-semibold text-ink">
                        Notifications
                      </p>
                      <Badge tone="brand">3 new</Badge>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-2.5 px-4 py-3 hover:bg-slate-50/70"
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg",
                              item.tone,
                            )}
                          >
                            <Icon name={item.icon} size={14} />
                          </span>
                          <div>
                            <p className="text-[11.5px] font-medium leading-5 text-ink">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/stock"
                      className="block border-t border-line px-4 py-2.5 text-center text-[11px] font-semibold text-brand-700 hover:bg-brand-50/50"
                    >
                      View all activity
                    </Link>
                  </div>
                )}
              </div>

              <span className="mx-1 hidden h-6 w-px bg-line sm:block" />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen((value) => !value);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg p-1 pr-1.5 transition-colors hover:bg-slate-100"
                  aria-label="Account menu"
                  aria-expanded={userMenuOpen}
                >
                  <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white">
                    {initials(user.name)}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block max-w-28 truncate text-[11.5px] font-semibold text-ink">
                      {user.name}
                    </span>
                    <span className="block text-[9.5px] text-slate-400">
                      {user.email}
                    </span>
                  </span>
                  <Icon
                    name="chevron-down"
                    size={13}
                    className="hidden text-slate-400 sm:block"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-40 mt-2 w-52 animate-scale-in overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-xl">
                    <div className="border-b border-line px-3.5 py-2.5 sm:hidden">
                      <p className="truncate text-[12px] font-semibold text-ink">
                        {user.name}
                      </p>
                      <p className="truncate text-[10px] text-slate-400">
                        {user.email}
                      </p>
                    </div>
                    {secondaryNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] text-slate-600 hover:bg-slate-50"
                      >
                        <Icon name={item.icon} size={15} className="text-slate-400" />
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 border-t border-line px-3.5 py-2.5 text-[12px] text-rose-600 hover:bg-rose-50"
                    >
                      <Icon name="logout" size={15} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>

        <footer className="border-t border-line bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-2 text-[10.5px] text-slate-400 sm:flex-row sm:items-center">
            <p className="flex items-center gap-1.5">
              <LogoMark className="size-4 rounded-[5px]" />
              Stockflow · Inventory workspace
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-slate-600">
                Help center
              </Link>
              <Link href="#" className="hover:text-slate-600">
                API status
              </Link>
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Operational
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
