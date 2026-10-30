import type { IconName } from "@/components/ui/Icon";

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  badge?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "layout" },
  { label: "Inventory", href: "/inventory", icon: "boxes", badge: "1,284" },
  { label: "Categories", href: "/categories", icon: "tags" },
  { label: "Stock movements", href: "/stock", icon: "activity" },
];

export const secondaryNav: NavItem[] = [
  { label: "Profile", href: "/profile", icon: "user" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
