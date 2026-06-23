export const industryStatuses = ["active", "inactive"] as const;
export type IndustryStatus = (typeof industryStatuses)[number];

export const templateStatuses = ["draft", "published", "archived"] as const;
export type TemplateStatus = (typeof templateStatuses)[number];

export const templateTypes = [
  "industry_specific",
  "basic_customizable",
] as const;
export type TemplateType = (typeof templateTypes)[number];

export const customizationLevels = ["low", "medium", "high"] as const;
export type CustomizationLevel = (typeof customizationLevels)[number];

export const sectionTypes = [
  "hero",
  "about",
  "skills",
  "tech_stack",
  "projects",
  "experience",
  "education",
  "services",
  "gallery",
  "before_after",
  "testimonials",
  "awards",
  "design_philosophy",
  "contact",
  "footer",
  "custom",
] as const;
export type SectionType = (typeof sectionTypes)[number];

export const blockTypes = [
  "text",
  "image",
  "button",
  "socials",
  "skill_list",
  "tech_stack",
  "project_card",
  "experience_item",
  "education_item",
  "service_card",
  "gallery_item",
  "before_after_item",
  "testimonial_card",
  "award_item",
  "contact_form",
  "custom",
] as const;
export type BlockType = (typeof blockTypes)[number];

export const containerTypes = ["full", "boxed"] as const;
export type ContainerType = (typeof containerTypes)[number];

export const alignTypes = ["left", "center", "right"] as const;
export type AlignType = (typeof alignTypes)[number];

export const sizeTypes = ["sm", "md", "lg"] as const;
export type SizeType = (typeof sizeTypes)[number];
