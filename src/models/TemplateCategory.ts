import { Schema, model, models, Types } from "mongoose";
import {
  industryStatuses,
  type IndustryStatus,
} from "@/types/template-builder";

export interface ITemplateCategory {
  industryId: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  status: IndustryStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateCategorySchema = new Schema<ITemplateCategory>(
  {
    industryId: {
      type: Schema.Types.ObjectId,
      ref: "Industry",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
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
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "template_categories",
  }
);

TemplateCategorySchema.index({ industryId: 1, slug: 1 }, { unique: true });
TemplateCategorySchema.index({ industryId: 1, status: 1, order: 1 });

export const TemplateCategory =
  models.TemplateCategory ||
  model<ITemplateCategory>("TemplateCategory", TemplateCategorySchema);
