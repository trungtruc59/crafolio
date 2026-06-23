"use client";

import SectionRenderer from "@/features/template-builder/renderer/SectionRenderer";
import type {
  BuilderSelection,
  BuilderTemplate,
} from "@/features/template-builder/types";

type TemplateRendererProps = {
  template: BuilderTemplate;
  selection?: BuilderSelection;
  onSelect?: (selection: BuilderSelection) => void;
};

export default function TemplateRenderer({
  template,
  selection,
  onSelect,
}: TemplateRendererProps) {
  const sections = [...template.sections]
    .filter((section) => section.isVisible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className="min-h-full bg-white"
      onClick={() => onSelect?.({ type: "template", id: template._id })}
    >
      {sections.map((section) => (
        <SectionRenderer
          key={section._id}
          section={section}
          selection={selection}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
