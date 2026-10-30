import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Start your free 14-day Stockflow trial. Track stock, automate reordering and manage every warehouse in one place.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Start tracking stock in minutes. Free for 14 days, no credit card."
    >
      <RegisterForm />
    </AuthShell>
  );
}
