export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: string;
  avatarUrl?: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  company?: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
