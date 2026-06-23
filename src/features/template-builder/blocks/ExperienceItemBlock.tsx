import type { BlockComponentProps } from "@/features/template-builder/types";

function readText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export default function ExperienceItemBlock({ block }: BlockComponentProps) {
  const title = readText(block.content?.title) || block.name;
  const subtitle = readText(block.content?.subtitle);
  const description = readText(block.content?.description);

  return (
    <article className="border-l-2 border-cyan-500 pl-4">
      <h4 className="font-semibold text-slate-950">{title}</h4>
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
    </article>
  );
}
