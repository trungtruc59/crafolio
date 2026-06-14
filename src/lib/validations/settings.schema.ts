import { z } from "zod";

export const updateI18nSettingsSchema = z.object({
  defaultLocale: z.enum(["vi", "en"]),
  enabledLocales: z
    .array(z.enum(["vi", "en"]))
    .min(1),
}).refine(
  (data) => data.enabledLocales.includes(data.defaultLocale),
  {
    message: "settings.defaultLocaleMustBeEnabled",
    path: ["defaultLocale"],
  }
);