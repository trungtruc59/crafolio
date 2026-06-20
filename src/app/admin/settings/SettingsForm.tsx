"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useState } from "react";

type SettingsFormProps = {
  children: ReactNode;
  initialStatus?: "saved" | "error";
  savedMessage: string;
  errorMessage: string;
};

export default function SettingsForm({
  children,
  initialStatus,
  savedMessage,
  errorMessage,
}: SettingsFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus(undefined);

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "fetch",
        },
      });

      setStatus(response.ok ? "saved" : "error");

      if (response.ok) {
        router.refresh();
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      method="POST"
      action="/api/settings"
      onSubmit={handleSubmit}
      className="mx-auto max-w-6xl space-y-6"
      aria-busy={isSaving}
    >
      {status ? (
        <p
          className={[
            "rounded-md border px-3 py-2 text-sm font-medium",
            status === "saved"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-600",
          ].join(" ")}
        >
          {status === "saved" ? savedMessage : errorMessage}
        </p>
      ) : null}
      {children}
    </form>
  );
}
