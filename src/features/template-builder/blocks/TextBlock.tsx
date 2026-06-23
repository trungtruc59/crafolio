import type { BlockComponentProps } from "@/features/template-builder/types";

function readText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export default function TextBlock({ block }: BlockComponentProps) {
  const title = readText(block.content?.title);
  const subtitle = readText(block.content?.subtitle);
  const description = readText(block.content?.description);

  return (
    <div className="space-y-2">
      {subtitle ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {subtitle}
        </p>
      ) : null}
      {title ? (
        <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
      ) : null}
      {description ? (
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      {!title && !subtitle && !description ? (
        <p className="text-sm text-slate-400">{block.name}</p>
      ) : null}
    </div>
  );
}
