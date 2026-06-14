import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const locales = ["vi", "en"] as const;
const defaultLocale = "vi";

type Locale = (typeof locales)[number];

const messagesMap = {
  vi: () => import("../messages/vi.json"),
  en: () => import("../messages/en.json"),
};

function isValidLocale(locale?: string): locale is Locale {
  return !!locale && locales.includes(locale as Locale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale = isValidLocale(cookieLocale)
    ? cookieLocale
    : defaultLocale;

  const messages = (await messagesMap[locale]()).default;

  return {
    locale,
    messages,
  };
});