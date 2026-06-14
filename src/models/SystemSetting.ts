import mongoose, { Schema, model, models } from "mongoose";

export type Locale = "vi" | "en";

export interface ISystemSetting {
  key: string;
  defaultLocale?: Locale;
  enabledLocales?: Locale[];
  createdAt: Date;
  updatedAt: Date;
}

const SystemSettingSchema = new Schema<ISystemSetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    defaultLocale: {
      type: String,
      enum: ["vi", "en"],
      default: "vi",
    },

    enabledLocales: {
      type: [String],
      enum: ["vi", "en"],
      default: ["vi"],
    },
  },
  {
    timestamps: true,
    collection: "system_settings",
  }
);

export const SystemSetting =
  models.SystemSetting ||
  model<ISystemSetting>("SystemSetting", SystemSettingSchema);