import { Schema, model, models } from "mongoose";
import {
  industryStatuses,
  type IndustryStatus,
} from "@/types/template-builder";

export interface IThemeColors {
  primary?: string;
  secondary?: string;
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  border?: string;
}

export interface IThemeFonts {
  heading?: string;
  body?: string;
}

export interface IThemeRadius {
  sm?: number;
  md?: number;
  lg?: number;
}

export interface IThemeShadow {
  sm?: string;
  md?: string;
  lg?: string;
}

export interface IThemePreset {
  name: string;
  slug: string;
  description?: string;
  status: IndustryStatus;
  colors?: IThemeColors;
  fonts?: IThemeFonts;
  radius?: IThemeRadius;
  shadow?: IThemeShadow;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ThemePresetSchema = new Schema<IThemePreset>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: industryStatuses,
      default: "active",
      index: true,
    },
    colors: {
      primary: { type: String, trim: true },
      secondary: { type: String, trim: true },
      background: { type: String, trim: true },
      surface: { type: String, trim: true },
      text: { type: String, trim: true },
      muted: { type: String, trim: true },
      border: { type: String, trim: true },
    },
    fonts: {
      heading: { type: String, trim: true },
      body: { type: String, trim: true },
    },
    radius: {
      sm: { type: Number },
      md: { type: Number },
      lg: { type: Number },
    },
    shadow: {
      sm: { type: String, trim: true },
      md: { type: String, trim: true },
      lg: { type: String, trim: true },
    },
    isDefault: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "theme_presets",
  }
);

ThemePresetSchema.index({ status: 1, isDefault: 1 });

export const ThemePreset =
  models.ThemePreset ||
  model<IThemePreset>("ThemePreset", ThemePresetSchema);
