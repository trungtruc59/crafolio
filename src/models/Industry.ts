import { Schema, model, models } from "mongoose";
import {
  industryStatuses,
  type IndustryStatus,
} from "@/types/template-builder";

export interface IIndustry {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  thumbnail?: string;
  status: IndustryStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>(
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
    icon: {
      type: String,
      trim: true,
    },
    thumbnail: {
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
    collection: "industries",
  }
);

IndustrySchema.index({ status: 1, order: 1 });

export const Industry =
  models.Industry || model<IIndustry>("Industry", IndustrySchema);
