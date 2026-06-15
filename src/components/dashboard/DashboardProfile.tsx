"use client";

import type { ComponentType, FormEvent } from "react";
import { useState } from "react";
import {
  AtSign,
  BriefcaseBusiness,
  Camera,
  Code2,
  ExternalLink,
  Globe,
  Link2,
  Plus,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";

type SocialPlatform = "github" | "linkedin" | "twitter" | "instagram" | "website";

type SocialLink = {
  id: number;
  platform: SocialPlatform;
  url: string;
};

const platformOptions: Array<{
  value: SocialPlatform;
  label: string;
  placeholder: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  {
    value: "github",
    label: "GitHub",
    placeholder: "https://github.com/username",
    icon: Code2,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/username",
    icon: BriefcaseBusiness,
  },
  {
    value: "twitter",
    label: "Twitter",
    placeholder: "https://twitter.com/username",
    icon: AtSign,
  },
  {
    value: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/username",
    icon: Camera,
  },
  {
    value: "website",
    label: "Website",
    placeholder: "https://your-domain.com",
    icon: Globe,
  },
];

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function getPlatformMeta(platform: SocialPlatform) {
  return platformOptions.find((item) => item.value === platform) ?? platformOptions[0];
}

export default function DashboardProfile() {
  const [platform, setPlatform] = useState<SocialPlatform>("github");
  const [url, setUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [error, setError] = useState("");
  const tglobal = useTranslations();
  const t = useTranslations("dashboard.profileSettings");

  const selectedPlatform = getPlatformMeta(platform);
  const SelectedPlatformIcon = selectedPlatform.icon;

  function handleAddSocial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextUrl = normalizeUrl(url);

    try {
      new URL(nextUrl);
    } catch {
      setError(t("linkError"));
      return;
    }

    setSocialLinks((current) => [
      ...current,
      {
        id: Date.now(),
        platform,
        url: nextUrl,
      },
    ]);
    setUrl("");
    setError("");
  }

  function handleRemoveSocial(id: number) {
    setSocialLinks((current) => current.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {t("description")}  
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
            <Link2 className="h-4 w-4 text-emerald-600" />
            {socialLinks.length} {tglobal("common.linkContact")}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleAddSocial}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_auto]">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">{t("networkPlatform")}</span>
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value as SocialPlatform)}
              className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
            >
              {platformOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">{tglobal("common.link")}</span>
            <div className="mt-2 flex h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 transition focus-within:border-slate-950 focus-within:ring-2 focus-within:ring-slate-950/10">
              <SelectedPlatformIcon className="h-4 w-4 text-slate-400" />
              <input
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setError("");
                }}
                placeholder={selectedPlatform.placeholder}
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 lg:self-end"
          >
            <Plus className="h-4 w-4" />
            {tglobal("common.button.add")}
          </button>
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </form>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-semibold text-slate-950">
            {t("contactedPlatform")}
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {socialLinks.map((item) => {
            const meta = getPlatformMeta(item.platform);
            const Icon = meta.icon;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-950">
                      {meta.label}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block truncate text-sm text-slate-500 transition hover:text-emerald-600"
                    >
                      {item.url}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    aria-label={`Mo ${meta.label}`}
                    title={`Mo ${meta.label}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveSocial(item.id)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Xoa ${meta.label}`}
                    title={`Xoa ${meta.label}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {socialLinks.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                <Link2 className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-slate-900">
                  {t("noLinkedPlatform")}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                  {t("noLinkedPlatformDescription")}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
