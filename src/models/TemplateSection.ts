import { Schema, model, models, Types } from "mongoose";
import {
  containerTypes,
  sectionTypes,
  type ContainerType,
  type SectionType,
} from "@/types/template-builder";

export interface ISectionSpacing {
  paddingTop: number;
  paddingBottom: number;
}

export interface ISectionLayout {
  variant?: string;
  container: ContainerType;
  columns: number;
  spacing: ISectionSpacing;
}

export interface ISectionStyles {
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export interface ITemplateSection {
  templateId: Types.ObjectId;
  type: SectionType;
  name: string;
  order: number;
  isVisible: boolean;
  layout: ISectionLayout;
  styles?: ISectionStyles;
  blocks: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSectionSchema = new Schema<ITemplateSection>(
  {
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: sectionTypes,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    layout: {
      variant: {
        type: String,
        trim: true,
      },
      container: {
        type: String,
        enum: containerTypes,
        default: "boxed",
      },
      columns: {
        type: Number,
        default: 1,
        min: 1,
      },
      spacing: {
        paddingTop: {
          type: Number,
          default: 80,
        },
        paddingBottom: {
          type: Number,
          default: 80,
        },
      },
    },
    styles: {
      backgroundColor: { type: String, trim: true },
      textColor: { type: String, trim: true },
      className: { type: String, trim: true },
    },
    blocks: [
      {
        type: Schema.Types.ObjectId,
        ref: "TemplateBlock",
      },
    ],
  },
  {
    timestamps: true,
    collection: "template_sections",
  }
);

TemplateSectionSchema.index({ templateId: 1, order: 1 });

export const TemplateSection =
  models.TemplateSection ||
  model<ITemplateSection>("TemplateSection", TemplateSectionSchema);
