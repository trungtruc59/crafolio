import { Schema, model, models, Types } from "mongoose";
import {
  blockTypes,
  containerTypes,
  industryStatuses,
  sectionTypes,
  type BlockType,
  type ContainerType,
  type IndustryStatus,
  type SectionType,
} from "@/types/template-builder";

export interface ISectionPresetLayout {
  variant?: string;
  container: ContainerType;
  columns: number;
  spacing: {
    paddingTop: number;
    paddingBottom: number;
  };
}

export interface ISectionPresetStyles {
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export interface ISectionPresetBlock {
  type: BlockType;
  name: string;
  order: number;
  content?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  styles?: Record<string, unknown>;
}

export interface ISectionPreset {
  industryId?: Types.ObjectId;
  categoryId?: Types.ObjectId;
  name: string;
  type: SectionType;
  description?: string;
  defaultOrder: number;
  isGlobal: boolean;
  status: IndustryStatus;
  defaultLayout: ISectionPresetLayout;
  defaultStyles?: ISectionPresetStyles;
  defaultBlocks: ISectionPresetBlock[];
  createdAt: Date;
  updatedAt: Date;
}

const SectionPresetBlockSchema = new Schema<ISectionPresetBlock>(
  {
    type: {
      type: String,
      enum: blockTypes,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    content: {
      type: Schema.Types.Mixed,
    },
    settings: {
      type: Schema.Types.Mixed,
    },
    styles: {
      type: Schema.Types.Mixed,
    },
  },
  {
    _id: false,
  }
);

const SectionPresetSchema = new Schema<ISectionPreset>(
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
      maxlength: 120,
    },
    type: {
      type: String,
      enum: sectionTypes,
      required: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    defaultOrder: {
      type: Number,
      default: 0,
    },
    isGlobal: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: industryStatuses,
      default: "active",
      index: true,
    },
    defaultLayout: {
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
    defaultStyles: {
      backgroundColor: { type: String, trim: true },
      textColor: { type: String, trim: true },
      className: { type: String, trim: true },
    },
    defaultBlocks: {
      type: [SectionPresetBlockSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "section_presets",
  }
);

SectionPresetSchema.index({ industryId: 1, status: 1 });
SectionPresetSchema.index({ categoryId: 1, status: 1 });
SectionPresetSchema.index({ isGlobal: 1, status: 1 });

export const SectionPreset =
  models.SectionPreset ||
  model<ISectionPreset>("SectionPreset", SectionPresetSchema);
