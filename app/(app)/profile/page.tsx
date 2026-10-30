import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-[1150px]">
      <PageHeader
        title="Profile"
        description="Manage your personal details, sign-in preferences and security."
      />
      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}
