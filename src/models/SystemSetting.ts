import { Schema, model, models } from "mongoose";

export type Locale = "vi" | "en";

export type SmtpEncryption = "tls" | "ssl" | "none";

export interface IAdminMailSettings {
  smtpServer?: string;
  smtpPort: number;
  smtpEncryption: SmtpEncryption;
  smtpUsername?: string;
  smtpPassword?: string;
  testEmail?: string;
}

export interface IAdminSystemSettings {
  siteName: string;
  siteUrl: string;
  adminEmail?: string;
  language: Locale;
  timezone: string;
  uploadLimit: number;
  sessionTimeout: number;
  allowRegistration: boolean;
  maintenanceMode: boolean;
}

export interface IAdminSeoSettings {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  indexing: boolean;
  openGraph: boolean;
  twitterCard: boolean;
  sitemap: boolean;
  jsonLd: boolean;
}

export interface ISystemSetting {
  key: string;
  defaultLocale?: Locale;
  enabledLocales?: Locale[];
  mail?: IAdminMailSettings;
  system?: IAdminSystemSettings;
  seo?: IAdminSeoSettings;
  updatedBy?: string;
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

    mail: {
      smtpServer: {
        type: String,
        trim: true,
      },
      smtpPort: {
        type: Number,
        default: 587,
      },
      smtpEncryption: {
        type: String,
        enum: ["tls", "ssl", "none"],
        default: "tls",
      },
      smtpUsername: {
        type: String,
        trim: true,
      },
      smtpPassword: {
        type: String,
      },
      testEmail: {
        type: String,
        trim: true,
        lowercase: true,
      },
    },

    system: {
      siteName: {
        type: String,
        trim: true,
        default: "Crafolio",
      },
      siteUrl: {
        type: String,
        trim: true,
        default: "https://crafolio.id.vn",
      },
      adminEmail: {
        type: String,
        trim: true,
        lowercase: true,
      },
      language: {
        type: String,
        enum: ["vi", "en"],
        default: "vi",
      },
      timezone: {
        type: String,
        trim: true,
        default: "Asia/Bangkok",
      },
      uploadLimit: {
        type: Number,
        default: 10,
      },
      sessionTimeout: {
        type: Number,
        default: 60,
      },
      allowRegistration: {
        type: Boolean,
        default: true,
      },
      maintenanceMode: {
        type: Boolean,
        default: false,
      },
    },

    seo: {
      title: {
        type: String,
        trim: true,
        default: "Crafolio - Portfolio Builder",
      },
      description: {
        type: String,
        trim: true,
      },
      keywords: {
        type: String,
        trim: true,
      },
      canonicalUrl: {
        type: String,
        trim: true,
      },
      ogImage: {
        type: String,
        trim: true,
      },
      indexing: {
        type: Boolean,
        default: true,
      },
      openGraph: {
        type: Boolean,
        default: true,
      },
      twitterCard: {
        type: Boolean,
        default: true,
      },
      sitemap: {
        type: Boolean,
        default: true,
      },
      jsonLd: {
        type: Boolean,
        default: false,
      },
    },

    updatedBy: {
      type: String,
      trim: true,
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
