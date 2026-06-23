"use client";

import BlockRenderer from "@/features/template-builder/renderer/BlockRenderer";
import type { SectionComponentProps } from "@/features/template-builder/types";

export default function ContactSection({
  section,
  selection,
  onSelect,
}: SectionComponentProps) {
  const blocks = [...section.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-8 py-12 md:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Contact
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          {section.name}
        </h2>
      </div>
      <div className="space-y-4">
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
