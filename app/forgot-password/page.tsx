import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset your password",
  description:
    "Reset your Stockflow password securely. We'll email you a link to get back into your workspace.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a secure link to get back in."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
