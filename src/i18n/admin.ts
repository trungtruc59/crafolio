import { getLocale } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { getAdminSettings } from "@/lib/settings/admin-settings";

const adminMessagesMap = {
  vi: () => import("../messages/admin/vi.json"),
  en: () => import("../messages/admin/en.json"),
};

export type AdminMessages = Awaited<
  ReturnType<(typeof adminMessagesMap)[Locale]>
>["default"];

function isValidLocale(locale?: string): locale is Locale {
  return !!locale && locales.includes(locale as Locale);
}

export async function getAdminLocale() {
  const settings = await getAdminSettings();
  const locale = settings.system.language || (await getLocale());

  return isValidLocale(locale) ? locale : defaultLocale;
}

export async function getAdminMessages(locale?: string) {
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale;

  return (await adminMessagesMap[safeLocale]()).default;
}
