import type {
  AuthSession,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

const SESSION_KEY = "stockflow.session";

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

function nameFromEmail(email: string): string {
  const handle = email.split("@")[0] ?? "there";
  return handle
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function saveSession(session: AuthSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function login(payload: LoginPayload): Promise<AuthSession> {
  await wait(900);

  const user: User = {
    id: crypto.randomUUID(),
    name: nameFromEmail(payload.email),
    email: payload.email,
    role: "Admin",
  };

  const session: AuthSession = {
    user,
    token: crypto.randomUUID(),
    expiresAt: Date.now() + (payload.remember ? 30 : 1) * 24 * 60 * 60 * 1000,
  };

  saveSession(session);
  return session;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthSession> {
  await wait(1100);

  const user: User = {
    id: crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    company: payload.company,
    role: "Owner",
  };

  const session: AuthSession = {
    user,
    token: crypto.randomUUID(),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };

  saveSession(session);
  return session;
}

export async function requestPasswordReset(
  payload: ForgotPasswordPayload,
): Promise<{ email: string }> {
  await wait(800);
  return { email: payload.email };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function getSessionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function subscribeToSession(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}
