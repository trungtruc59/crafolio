import mongoose, { Types } from "mongoose";
import { Industry } from "@/models/Industry";
import { Template } from "@/models/Template";
import { TemplateBlock } from "@/models/TemplateBlock";
import { TemplateCategory } from "@/models/TemplateCategory";
import { TemplateSection } from "@/models/TemplateSection";
import { ThemePreset } from "@/models/ThemePreset";
import type { CreateTemplateInput } from "@/lib/validators/template.validator";
import { findSectionPresetsService } from "./find-section-presets.service";

function assertObjectId(value: string, fieldName: string) {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error(`${fieldName} is invalid`);
  }
}

export async function createTemplateService(input: CreateTemplateInput) {
  const session = await mongoose.startSession();
  let committed = false;

  try {
    session.startTransaction();

    const existingTemplate = await Template.findOne({
      slug: input.slug,
    }).session(session);

    if (existingTemplate) {
      throw new Error("Template slug already exists");
    }

    const industryId =
      input.templateType === "basic_customizable" ? undefined : input.industryId;
    const categoryId =
      input.templateType === "basic_customizable" ? undefined : input.categoryId;
    const customizationLevel =
      input.customizationLevel ??
      (input.templateType === "basic_customizable" ? "high" : "medium");

    if (industryId) {
      assertObjectId(industryId, "industryId");

      const industry = await Industry.findOne({
        _id: industryId,
        status: "active",
      }).session(session);

      if (!industry) {
        throw new Error("Industry not found or inactive");
      }
    }

    if (categoryId) {
      assertObjectId(categoryId, "categoryId");

      const category = await TemplateCategory.findOne({
        _id: categoryId,
        status: "active",
      }).session(session);

      if (!category) {
        throw new Error("Template category not found or inactive");
      }

      if (!industryId || String(category.industryId) !== industryId) {
        throw new Error("Template category does not belong to the industry");
      }
    }

    if (input.themeId) {
      assertObjectId(input.themeId, "themeId");

      const theme = await ThemePreset.findOne({
        _id: input.themeId,
        status: "active",
      }).session(session);

      if (!theme) {
        throw new Error("Theme preset not found or inactive");
      }
    }

    const [template] = await Template.create(
      [
        {
          name: input.name,
          slug: input.slug,
          description: input.description,
          templateType: input.templateType,
          industryId: industryId ?? null,
          categoryId: categoryId ?? null,
          themeId: input.themeId ?? null,
          thumbnail: input.thumbnail,
          previewUrl: input.previewUrl,
          isPremium: input.isPremium,
          customizationLevel,
          seo: input.seo,
          sections: [],
          status: "draft",
        },
      ],
      { session }
    );

    if (input.autoGenerateSections) {
      const presets = await findSectionPresetsService(input, session);
      const sectionIds: Types.ObjectId[] = [];

      for (const preset of presets) {
        const [section] = await TemplateSection.create(
          [
            {
              templateId: template._id,
              type: preset.type,
              name: preset.name,
              order: preset.defaultOrder,
              isVisible: true,
              layout: preset.defaultLayout,
              styles: preset.defaultStyles,
              blocks: [],
            },
          ],
          { session }
        );

        const blockIds: Types.ObjectId[] = [];

        for (const defaultBlock of preset.defaultBlocks) {
          const [block] = await TemplateBlock.create(
            [
              {
                sectionId: section._id,
                type: defaultBlock.type,
                name: defaultBlock.name,
                order: defaultBlock.order,
                isVisible: true,
                content: defaultBlock.content,
                settings: defaultBlock.settings,
                styles: defaultBlock.styles,
              },
            ],
            { session }
          );

          blockIds.push(block._id);
        }

        section.blocks = blockIds;
        await section.save({ session });
        sectionIds.push(section._id);
      }

      template.sections = sectionIds;
    }

    await template.save({ session });
    await session.commitTransaction();
    committed = true;

    return Template.findById(template._id)
      .populate("industryId")
      .populate("categoryId")
      .populate("themeId")
      .populate({
        path: "sections",
        populate: {
          path: "blocks",
        },
      });
  } catch (error) {
    if (!committed) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }
}
