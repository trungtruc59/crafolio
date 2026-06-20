import { connectDB } from "@/lib/db";
import {
  updateAdminSettingsSchema,
  type UpdateAdminSettingsInput,
} from "@/lib/validations/settings.schema";
import { type ISystemSetting, SystemSetting } from "@/models/SystemSetting";

export const ADMIN_SETTINGS_KEY = "admin-settings";

export const DEFAULT_ADMIN_SETTINGS = {
  mail: {
    smtpServer: undefined,
    smtpPort: 587,
    smtpEncryption: "tls",
    smtpUsername: undefined,
    smtpPassword: undefined,
    testEmail: undefined,
  },
  system: {
    siteName: "Crafolio",
    siteUrl: "https://crafolio.id.vn",
    adminEmail: undefined,
    language: "vi",
    timezone: "Asia/Bangkok",
    uploadLimit: 10,
    sessionTimeout: 60,
    allowRegistration: true,
    maintenanceMode: false,
  },
  seo: {
    title: "Crafolio - Portfolio Builder",
    description: undefined,
    keywords: undefined,
    canonicalUrl: undefined,
    ogImage: undefined,
    indexing: true,
    openGraph: true,
    twitterCard: true,
    sitemap: true,
    jsonLd: false,
  },
} satisfies UpdateAdminSettingsInput;

function normalizeSettings(setting?: Partial<ISystemSetting> | null) {
  return {
    mail: {
      ...DEFAULT_ADMIN_SETTINGS.mail,
      ...setting?.mail,
      smtpPassword: "",
    },
    system: {
      ...DEFAULT_ADMIN_SETTINGS.system,
      ...setting?.system,
    },
    seo: {
      ...DEFAULT_ADMIN_SETTINGS.seo,
      ...setting?.seo,
    },
  };
}

export async function getAdminSettings() {
  await connectDB();

  const setting = await SystemSetting.findOne({
    key: ADMIN_SETTINGS_KEY,
  }).lean<ISystemSetting | null>();

  return normalizeSettings(setting);
}

export async function saveAdminSettings(
  input: UpdateAdminSettingsInput,
  updatedBy?: string
) {
  const parsed = updateAdminSettingsSchema.parse(input);
  const fieldsToSet: Record<string, unknown> = {
    key: ADMIN_SETTINGS_KEY,
    "mail.smtpPort": parsed.mail.smtpPort,
    "mail.smtpEncryption": parsed.mail.smtpEncryption,
    "system.siteName": parsed.system.siteName,
    "system.siteUrl": parsed.system.siteUrl,
    "system.language": parsed.system.language,
    "system.timezone": parsed.system.timezone,
    "system.uploadLimit": parsed.system.uploadLimit,
    "system.sessionTimeout": parsed.system.sessionTimeout,
    "system.allowRegistration": parsed.system.allowRegistration,
    "system.maintenanceMode": parsed.system.maintenanceMode,
    "seo.title": parsed.seo.title,
    "seo.indexing": parsed.seo.indexing,
    "seo.openGraph": parsed.seo.openGraph,
    "seo.twitterCard": parsed.seo.twitterCard,
    "seo.sitemap": parsed.seo.sitemap,
    "seo.jsonLd": parsed.seo.jsonLd,
  };
  const fieldsToUnset: Record<string, ""> = {};

  function setOptionalField(path: string, value?: string) {
    if (value) {
      fieldsToSet[path] = value;
      return;
    }

    fieldsToUnset[path] = "";
  }

  setOptionalField("mail.smtpServer", parsed.mail.smtpServer);
  setOptionalField("mail.smtpUsername", parsed.mail.smtpUsername);
  setOptionalField("mail.testEmail", parsed.mail.testEmail);
  setOptionalField("system.adminEmail", parsed.system.adminEmail);
  setOptionalField("seo.description", parsed.seo.description);
  setOptionalField("seo.keywords", parsed.seo.keywords);
  setOptionalField("seo.canonicalUrl", parsed.seo.canonicalUrl);
  setOptionalField("seo.ogImage", parsed.seo.ogImage);

  if (parsed.mail.smtpPassword) {
    fieldsToSet["mail.smtpPassword"] = parsed.mail.smtpPassword;
  }

  if (updatedBy) {
    fieldsToSet.updatedBy = updatedBy;
  }

  await connectDB();

  const setting = await SystemSetting.findOneAndUpdate(
    { key: ADMIN_SETTINGS_KEY },
    {
      $set: fieldsToSet,
      ...(Object.keys(fieldsToUnset).length > 0
        ? { $unset: fieldsToUnset }
        : {}),
    },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    }
  ).lean<ISystemSetting>();

  return normalizeSettings(setting);
}
