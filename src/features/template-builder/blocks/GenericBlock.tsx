import type { BlockComponentProps } from "@/features/template-builder/types";

export default function GenericBlock({ block }: BlockComponentProps) {
  const content = block.content
    ? JSON.stringify(block.content, null, 2).slice(0, 240)
    : "No content";

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">{block.name}</p>
        <span className="rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
          {block.type}
        </span>
      </div>
      <pre className="mt-2 max-h-28 overflow-hidden whitespace-pre-wrap text-xs leading-5 text-slate-500">
        {content}
      </pre>
    </div>
  );
}
