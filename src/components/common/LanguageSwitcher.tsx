"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale() as Locale;

  function handleLocaleChange(locale: Locale) {
    if (locale === currentLocale) {
      return;
    }

    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Change language</span>
      <select
        value={currentLocale}
        onChange={(event) => handleLocaleChange(event.target.value as Locale)}
        className="h-9 cursor-pointer rounded-full border border-slate-200 bg-white px-3 pr-8 text-xs font-bold uppercase text-slate-700 outline-none transition hover:border-slate-300 hover:text-slate-950 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        aria-label="Change language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
