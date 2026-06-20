import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalEmail = z.preprocess(
  emptyToUndefined,
  z.string().trim().email().optional()
);

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z.string().trim().url().optional()
);

const optionalText = z.preprocess(
  emptyToUndefined,
  z.string().trim().optional()
);

const checkboxBoolean = z.preprocess((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["1", "true", "on", "yes"].includes(value.toLowerCase());
  }

  return false;
}, z.boolean());

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

export const updateAdminSettingsSchema = z.object({
  mail: z.object({
    fromName: z.string().trim().min(1).max(120),
    fromAddress: optionalEmail,
    smtpServer: optionalText,
    smtpPort: z.coerce.number().int().min(1).max(65535),
    smtpEncryption: z.enum(["tls", "ssl", "none"]),
    smtpUsername: optionalText,
    smtpPassword: optionalText,
    testEmail: optionalEmail,
  }),
  system: z.object({
    siteName: z.string().trim().min(1).max(120),
    siteUrl: z.string().trim().url(),
    adminEmail: optionalEmail,
    language: z.enum(["vi", "en"]),
    timezone: z.string().trim().min(1).max(80),
    uploadLimit: z.coerce.number().int().min(1).max(100),
    sessionTimeout: z.coerce.number().int().min(5).max(1440),
    allowRegistration: checkboxBoolean,
    maintenanceMode: checkboxBoolean,
  }),
  seo: z.object({
    title: z.string().trim().min(1).max(120),
    description: optionalText,
    keywords: optionalText,
    canonicalUrl: optionalUrl,
    ogImage: optionalUrl,
    indexing: checkboxBoolean,
    openGraph: checkboxBoolean,
    twitterCard: checkboxBoolean,
    sitemap: checkboxBoolean,
    jsonLd: checkboxBoolean,
  }),
});

export type UpdateAdminSettingsInput = z.infer<
  typeof updateAdminSettingsSchema
>;
