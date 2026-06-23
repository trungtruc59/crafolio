"use client";

import GenericBlock from "@/features/template-builder/blocks/GenericBlock";
import { blockRegistry } from "@/features/template-builder/renderer/block-registry";
import type {
  BuilderBlock,
  BuilderSelection,
} from "@/features/template-builder/types";

type BlockRendererProps = {
  block: BuilderBlock;
  selection?: BuilderSelection;
  onSelect?: (selection: BuilderSelection) => void;
};

export default function BlockRenderer({
  block,
  selection,
  onSelect,
}: BlockRendererProps) {
  const BlockComponent = blockRegistry[block.type] ?? GenericBlock;
  const isSelected = selection?.type === "block" && selection.id === block._id;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.({ type: "block", id: block._id });
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.({ type: "block", id: block._id });
        }
      }}
      className={[
        "rounded-md border border-transparent p-1 transition",
        isSelected ? "border-cyan-500 ring-2 ring-cyan-200" : "hover:border-cyan-200",
      ].join(" ")}
    >
      <BlockComponent block={block} />
    </div>
  );
}
