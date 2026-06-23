"use client";

import GenericSection from "@/features/template-builder/sections/GenericSection";
import { sectionRegistry } from "@/features/template-builder/renderer/section-registry";
import type {
  BuilderSection,
  BuilderSelection,
} from "@/features/template-builder/types";

type SectionRendererProps = {
  section: BuilderSection;
  selection?: BuilderSelection;
  onSelect?: (selection: BuilderSelection) => void;
};

export default function SectionRenderer({
  section,
  selection,
  onSelect,
}: SectionRendererProps) {
  const SectionComponent = sectionRegistry[section.type] ?? GenericSection;
  const isSelected =
    selection?.type === "section" && selection.id === section._id;

  return (
    <section
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.({ type: "section", id: section._id });
      }}
      className={[
        "relative border border-transparent transition",
        isSelected ? "border-cyan-500 ring-2 ring-cyan-200" : "hover:border-cyan-200",
      ].join(" ")}
      style={{
        backgroundColor: section.styles?.backgroundColor,
        color: section.styles?.textColor,
        paddingTop: section.layout?.spacing?.paddingTop,
        paddingBottom: section.layout?.spacing?.paddingBottom,
      }}
    >
      <SectionComponent
        section={section}
        selection={selection}
        onSelect={onSelect}
      />
    </section>
  );
}
