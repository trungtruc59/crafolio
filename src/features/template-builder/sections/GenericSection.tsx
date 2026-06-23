"use client";

import BlockRenderer from "@/features/template-builder/renderer/BlockRenderer";
import type { SectionComponentProps } from "@/features/template-builder/types";

export default function GenericSection({
  section,
  selection,
  onSelect,
}: SectionComponentProps) {
  const blocks = [...section.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
          {section.type}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-950">
          {section.name}
        </h2>
      </div>
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
