import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1150px]">
      <PageHeader
        title="Settings"
        description="Configure your workspace, notifications, appearance and billing."
      />
      <div className="mt-6">
        <SettingsPanel />
      </div>
    </div>
  );
}
