export type SectionType =
  | "hero"
  | "about"
  | "skills"
  | "tech_stack"
  | "projects"
  | "experience"
  | "education"
  | "services"
  | "gallery"
  | "before_after"
  | "testimonials"
  | "awards"
  | "design_philosophy"
  | "contact"
  | "footer"
  | "custom";

export type BlockType =
  | "text"
  | "image"
  | "button"
  | "socials"
  | "skill_list"
  | "tech_stack"
  | "project_card"
  | "experience_item"
  | "education_item"
  | "service_card"
  | "gallery_item"
  | "before_after_item"
  | "testimonial_card"
  | "award_item"
  | "contact_form"
  | "custom";

export type SectionLayout = {
  variant?: string;
  container?: "full" | "boxed";
  columns?: number;
  spacing?: {
    paddingTop?: number;
    paddingBottom?: number;
  };
};

export type SectionStyles = {
  backgroundColor?: string;
  textColor?: string;
  className?: string;
};

export type BuilderTheme = {
  _id: string;
  name: string;
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
  radius?: Record<string, number>;
  shadow?: Record<string, string>;
};

export type BuilderBlock = {
  _id: string;
  sectionId: string;
  type: BlockType;
  name: string;
  order: number;
  isVisible: boolean;
  content?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  styles?: Record<string, unknown>;
};

export type BuilderSection = {
  _id: string;
  templateId: string;
  type: SectionType;
  name: string;
  order: number;
  isVisible: boolean;
  layout?: SectionLayout;
  styles?: SectionStyles;
  blocks: BuilderBlock[];
};

export type BuilderTemplate = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  templateType: "industry_specific" | "basic_customizable";
  status: "draft" | "published" | "archived";
  thumbnail?: string;
  previewUrl?: string;
  themeId?: BuilderTheme | string | null;
  sections: BuilderSection[];
};

export type BuilderSelection =
  | { type: "template"; id: string }
  | { type: "section"; id: string }
  | { type: "block"; id: string }
  | null;

export type SectionComponentProps = {
  section: BuilderSection;
  selection?: BuilderSelection;
  onSelect?: (selection: BuilderSelection) => void;
};

export type BlockComponentProps = {
  block: BuilderBlock;
};
