"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

type ApiResponse<T = unknown> = {
  success: boolean;
  code: number;
  messageKey: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export function RegisterForm() {
  const t = useTranslations();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [messageKey, setMessageKey] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessageKey(null);
    setFieldErrors({});

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });

    const result = (await response.json()) as ApiResponse;

    if (!result.success) {
      setIsLoading(false);
      setMessageKey(result.messageKey);
      setFieldErrors(result.errors ?? {});
      return;
    }

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  function getFieldError(field: string) {
    const errorKey = fieldErrors[field]?.[0];

    return errorKey ? t(errorKey) : null;
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          {t("auth.registerTitle")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("auth.registerDescription")}
        </p>
      </div>

      {messageKey && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {t(messageKey)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            {t("auth.name")}
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border text-slate-700 border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            placeholder={t("auth.name")}
            required
          />
          {getFieldError("name") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("name")}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            {t("auth.email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border text-slate-700 border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            placeholder={t("auth.email")}
            required
          />
          {getFieldError("email") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("email")}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            {t("auth.password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border text-slate-700 border-slate-300 px-3 py-2 pr-11 outline-none focus:border-slate-900"
              placeholder={t("auth.password")}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute cursor-pointer inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 transition hover:text-slate-900"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {getFieldError("password") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("password")}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            {t("auth.confirmPassword")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-lg border text-slate-700 border-slate-300 px-3 py-2 pr-11 outline-none focus:border-slate-900"
              placeholder={t("auth.confirmPassword")}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute cursor-pointer inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 transition hover:text-slate-900"
              aria-label={
                showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"
              }
              title={
                showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {getFieldError("confirmPassword") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("confirmPassword")}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {isLoading ? t("common.loading") : t("auth.register")}
        </button>
      </form>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700"
      >
        {t("auth.continueWithGoogle")}
      </button>

      <p className="mt-6 text-center text-sm text-slate-500">
        {t("auth.hasAccount")}{" "}
        <Link href="/login" className="font-medium text-slate-900">
          {t("auth.login")}
        </Link>
      </p>
    </div>
  );
}
