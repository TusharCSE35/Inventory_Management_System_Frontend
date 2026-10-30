import { isValidEmail } from "@/lib/utils";

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = "Enter your work email.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "That email doesn't look quite right.";
  }

  if (!values.password) {
    errors.password = "Enter your password.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export interface RegisterValues {
  name: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

export function validateRegister(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your full name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your work email.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "That email doesn't look quite right.";
  }

  if (!values.password) {
    errors.password = "Create a password.";
  } else if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  } else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = "Include at least one letter and one number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match yet.";
  }

  if (!values.terms) {
    errors.terms = "Please accept the terms to continue.";
  }

  return errors;
}

export function validateForgotPassword(email: string): string | undefined {
  if (!email.trim()) return "Enter the email on your account.";
  if (!isValidEmail(email)) return "That email doesn't look quite right.";
  return undefined;
}
