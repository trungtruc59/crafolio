import { Schema, model, models, Types } from "mongoose";
import {
  customizationLevels,
  templateStatuses,
  templateTypes,
  type CustomizationLevel,
  type TemplateStatus,
  type TemplateType,
} from "@/types/template-builder";

export interface ITemplateSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

export interface ITemplate {
  industryId?: Types.ObjectId;
  categoryId?: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  templateType: TemplateType;
  thumbnail?: string;
  previewUrl?: string;
  status: TemplateStatus;
  isPremium: boolean;
  customizationLevel: CustomizationLevel;
  themeId?: Types.ObjectId;
  sections: Types.ObjectId[];
  seo?: ITemplateSeo;
  createdBy?: Types.ObjectId;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    industryId: {
      type: Schema.Types.ObjectId,
      ref: "Industry",
      default: null,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "TemplateCategory",
      default: null,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
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
    templateType: {
      type: String,
      enum: templateTypes,
      required: true,
      index: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    previewUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: templateStatuses,
      default: "draft",
      index: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
      index: true,
    },
    customizationLevel: {
      type: String,
      enum: customizationLevels,
      default: "medium",
    },
    themeId: {
      type: Schema.Types.ObjectId,
      ref: "ThemePreset",
      default: null,
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: "TemplateSection",
      },
    ],
    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: {
        type: [String],
        default: [],
      },
      image: { type: String, trim: true },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    version: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: "templates",
  }
);

TemplateSchema.index({ industryId: 1, status: 1 });
TemplateSchema.index({ categoryId: 1, status: 1 });
TemplateSchema.index({ templateType: 1, status: 1 });

TemplateSchema.pre("validate", function validateIndustrySpecificTemplate() {
  const template = this as unknown as {
    templateType?: TemplateType;
    industryId?: Types.ObjectId | null;
    invalidate: (path: string, errorMsg: string) => void;
  };

  if (template.templateType === "industry_specific" && !template.industryId) {
    template.invalidate(
      "industryId",
      "industryId is required for industry_specific templates"
    );
  }

});

export const Template =
  models.Template || model<ITemplate>("Template", TemplateSchema);
