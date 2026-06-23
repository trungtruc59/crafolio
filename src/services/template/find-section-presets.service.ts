import type { ClientSession } from "mongoose";
import { SectionPreset } from "@/models/SectionPreset";
import type { CreateTemplateInput } from "@/lib/validators/template.validator";

export async function findSectionPresetsService(
  input: CreateTemplateInput,
  session?: ClientSession
) {
  if (input.templateType === "basic_customizable") {
    return SectionPreset.find({
      isGlobal: true,
      status: "active",
    })
      .sort({ defaultOrder: 1 })
      .session(session ?? null);
  }

  if (input.categoryId) {
    const categoryPresets = await SectionPreset.find({
      categoryId: input.categoryId,
      status: "active",
    })
      .sort({ defaultOrder: 1 })
      .session(session ?? null);

    if (categoryPresets.length > 0) {
      return categoryPresets;
    }
  }

  if (input.industryId) {
    const industryPresets = await SectionPreset.find({
      industryId: input.industryId,
      status: "active",
    })
      .sort({ defaultOrder: 1 })
      .session(session ?? null);

    if (industryPresets.length > 0) {
      return industryPresets;
    }
  }

  return SectionPreset.find({
    isGlobal: true,
    status: "active",
  })
    .sort({ defaultOrder: 1 })
    .session(session ?? null);
}
