import { SystemSetting } from "@/models/SystemSetting";
import { connectDB } from "@/lib/db";

export const DEFAULT_I18N_SETTING = {
  key: "i18n",
  defaultLocale: "vi" as const,
  enabledLocales: ["vi"] as const,
};

export async function getI18nSettings() {
  await connectDB();

  let setting = await SystemSetting.findOne({
    key: "i18n",
  }).lean();

  if (!setting) {
    setting = await SystemSetting.create(DEFAULT_I18N_SETTING);
  }

  return {
    defaultLocale: setting.defaultLocale || "vi",
    enabledLocales:
      setting.enabledLocales?.length > 0
        ? setting.enabledLocales
        : ["vi"],
  };
}