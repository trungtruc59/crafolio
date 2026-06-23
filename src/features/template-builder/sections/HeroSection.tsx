"use client";

import BlockRenderer from "@/features/template-builder/renderer/BlockRenderer";
import type { SectionComponentProps } from "@/features/template-builder/types";

export default function HeroSection({
  section,
  selection,
  onSelect,
}: SectionComponentProps) {
  const blocks = [...section.blocks].sort((a, b) => a.order - b.order);

  if (blocks.length === 0) {
    return (
      <div className="mx-auto flex min-h-80 max-w-5xl items-center justify-center px-8 text-sm text-slate-400">
        Hero section has no blocks
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-80 max-w-5xl items-center gap-8 px-8 py-14 md:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {blocks
          .filter((block) => block.type !== "image")
          .map((block) => (
            <BlockRenderer
              key={block._id}
              block={block}
              selection={selection}
              onSelect={onSelect}
            />
          ))}
      </div>
      <div className="space-y-4">
        {blocks
          .filter((block) => block.type === "image")
          .map((block) => (
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
