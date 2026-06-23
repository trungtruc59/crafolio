import Image from "next/image";
import type { BlockComponentProps } from "@/features/template-builder/types";

function readText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export default function ProjectCardBlock({ block }: BlockComponentProps) {
  const title = readText(block.content?.title) || block.name;
  const description = readText(block.content?.description);
  const image = readText(block.content?.image);

  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white">
      {image ? (
        <div className="relative aspect-video bg-slate-100">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      ) : null}
      <div className="space-y-2 p-4">
        <h4 className="font-semibold text-slate-950">{title}</h4>
        {description ? (
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
    </article>
  );
}
