"use client";

import BlockRenderer from "@/features/template-builder/renderer/BlockRenderer";
import type { SectionComponentProps } from "@/features/template-builder/types";

export default function AboutSection({
  section,
  selection,
  onSelect,
}: SectionComponentProps) {
  const blocks = [...section.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-4xl px-8 py-12">
      <h2 className="mb-6 text-2xl font-semibold text-slate-950">
        {section.name}
      </h2>
      <div className="grid gap-4">
        {blocks.map((block) => (
          <BlockRenderer
            key={block._id}
            block={block}
            selection={selection}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
