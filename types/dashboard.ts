import type { IconName } from "@/components/ui/Icon";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: IconName;
  caption: string;
}

export interface ChartPoint {
  label: string;
  inbound: number;
  outbound: number;
}

export interface ActivityEntry {
  id: string;
  title: string;
  description: string;
  time: string;
  tone: "brand" | "emerald" | "amber" | "sky";
  icon: IconName;
}
