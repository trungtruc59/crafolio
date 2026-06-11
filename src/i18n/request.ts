import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  const currentLocale = routing.locales.includes(
    locale as "vi" | "en"
  )
    ? locale
    : routing.defaultLocale;

  return {
    locale: currentLocale,
    messages: (
      await import(`../../messages/${currentLocale}.json`)
    ).default,
  };
});