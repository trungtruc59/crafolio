import { connectDB } from "@/lib/db";
import { Template } from "@/models/Template";
import type { BuilderTemplate } from "@/features/template-builder/types";

export async function getTemplateBuilderData(
  id: string
): Promise<BuilderTemplate | null> {
  await connectDB();

  const template = await Template.findById(id)
    .populate("themeId")
    .populate({
      path: "sections",
      options: { sort: { order: 1 } },
      populate: {
        path: "blocks",
        options: { sort: { order: 1 } },
      },
    })
    .lean();

  if (!template) {
    return null;
  }

  return JSON.parse(JSON.stringify(template)) as BuilderTemplate;
}
