"use client";

import { useCallback, useState } from "react";
import {
  login as loginService,
  register as registerService,
  requestPasswordReset,
} from "@/services/auth.service";
import type {
  AuthSession,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async <T,>(action: () => Promise<T>): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        return await action();
      } catch {
        setError("Something went wrong. Please try again.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const login = useCallback(
    (payload: LoginPayload): Promise<AuthSession | null> =>
      run(() => loginService(payload)),
    [run],
  );

  const register = useCallback(
    (payload: RegisterPayload): Promise<AuthSession | null> =>
      run(() => registerService(payload)),
    [run],
  );

  const forgotPassword = useCallback(
    (payload: ForgotPasswordPayload) =>
      run(() => requestPasswordReset(payload)),
    [run],
  );

  return { loading, error, login, register, forgotPassword, setError };
}
