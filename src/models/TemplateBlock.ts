import { Schema, model, models, Types } from "mongoose";
import {
  alignTypes,
  blockTypes,
  sizeTypes,
  type AlignType,
  type BlockType,
  type SizeType,
} from "@/types/template-builder";

export interface IBlockContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  alt?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: unknown[];
  metadata?: Record<string, unknown>;
}

export interface IBlockSettings {
  align: AlignType;
  size: SizeType;
  variant?: string;
  linkTarget: "_self" | "_blank";
}

export interface IBlockStyles {
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: number;
  className?: string;
}

export interface ITemplateBlock {
  sectionId: Types.ObjectId;
  type: BlockType;
  name: string;
  order: number;
  isVisible: boolean;
  content?: IBlockContent;
  settings: IBlockSettings;
  styles?: IBlockStyles;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateBlockSchema = new Schema<ITemplateBlock>(
  {
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "TemplateSection",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: blockTypes,
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
    content: {
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      description: { type: String, trim: true },
      image: { type: String, trim: true },
      alt: { type: String, trim: true },
      buttonText: { type: String, trim: true },
      buttonUrl: { type: String, trim: true },
      items: {
        type: [Schema.Types.Mixed],
        default: [],
      },
      metadata: {
        type: Schema.Types.Mixed,
      },
    },
    settings: {
      align: {
        type: String,
        enum: alignTypes,
        default: "left",
      },
      size: {
        type: String,
        enum: sizeTypes,
        default: "md",
      },
      variant: {
        type: String,
        trim: true,
      },
      linkTarget: {
        type: String,
        enum: ["_self", "_blank"],
        default: "_self",
      },
    },
    styles: {
      color: { type: String, trim: true },
      backgroundColor: { type: String, trim: true },
      fontSize: { type: Number },
      fontWeight: { type: Number },
      className: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
    collection: "template_blocks",
  }
);

TemplateBlockSchema.index({ sectionId: 1, order: 1 });

export const TemplateBlock =
  models.TemplateBlock ||
  model<ITemplateBlock>("TemplateBlock", TemplateBlockSchema);
