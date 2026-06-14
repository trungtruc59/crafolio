"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export function LoginForm() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageKey, setMessageKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessageKey(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    setIsLoading(false);

    if (result?.error) {
      setMessageKey("auth.invalidCredentials");
      return;
    }

    window.location.href = "/";
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          {t("auth.loginTitle")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("auth.loginDescription")}
        </p>
      </div>

      {messageKey && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {t(messageKey)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label id="email" className="mb-1 block text-sm font-medium text-slate-700">
            {t("auth.email")}
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border text-slate-700 border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            {t("auth.password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-300 text-slate-700 px-3 py-2 outline-none focus:border-slate-900"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {isLoading ? t("common.loading") : t("auth.login")}
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
        {t("auth.noAccount")}{" "}
        <Link href="/register" className="font-medium text-slate-900">
          {t("auth.register")}
        </Link>
      </p>
    </div>
  );
}