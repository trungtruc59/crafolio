import type { BlockComponentProps } from "@/features/template-builder/types";

function getLabel(item: unknown) {
  if (typeof item === "string") {
    return item;
  }

  if (typeof item === "object" && item !== null) {
    const record = item as Record<string, unknown>;
    const label = record.label ?? record.name ?? record.title;

    return typeof label === "string" ? label : "Item";
  }

  return "Item";
}

export default function SkillListBlock({ block }: BlockComponentProps) {
  const items = Array.isArray(block.content?.items) ? block.content.items : [];

  if (items.length === 0) {
    return <p className="text-sm text-slate-400">No skills yet</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${getLabel(item)}-${index}`}
          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
        >
          {getLabel(item)}
        </span>
      ))}
    </div>
  );
}
