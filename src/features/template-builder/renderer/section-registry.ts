import AboutSection from "@/features/template-builder/sections/AboutSection";
import ContactSection from "@/features/template-builder/sections/ContactSection";
import ExperienceSection from "@/features/template-builder/sections/ExperienceSection";
import HeroSection from "@/features/template-builder/sections/HeroSection";
import ProjectsSection from "@/features/template-builder/sections/ProjectsSection";
import SkillsSection from "@/features/template-builder/sections/SkillsSection";
import type {
  SectionComponentProps,
  SectionType,
} from "@/features/template-builder/types";

export const sectionRegistry: Partial<
  Record<SectionType, React.ComponentType<SectionComponentProps>>
> = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  tech_stack: SkillsSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  contact: ContactSection,
};
