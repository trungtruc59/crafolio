import ButtonBlock from "@/features/template-builder/blocks/ButtonBlock";
import ContactFormBlock from "@/features/template-builder/blocks/ContactFormBlock";
import ExperienceItemBlock from "@/features/template-builder/blocks/ExperienceItemBlock";
import ImageBlock from "@/features/template-builder/blocks/ImageBlock";
import ProjectCardBlock from "@/features/template-builder/blocks/ProjectCardBlock";
import SkillListBlock from "@/features/template-builder/blocks/SkillListBlock";
import TextBlock from "@/features/template-builder/blocks/TextBlock";
import type { BlockComponentProps, BlockType } from "@/features/template-builder/types";

export const blockRegistry: Partial<
  Record<BlockType, React.ComponentType<BlockComponentProps>>
> = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  skill_list: SkillListBlock,
  tech_stack: SkillListBlock,
  project_card: ProjectCardBlock,
  experience_item: ExperienceItemBlock,
  contact_form: ContactFormBlock,
};
