import Image from "next/image";
import type { BlockComponentProps } from "@/features/template-builder/types";

function readText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export default function ImageBlock({ block }: BlockComponentProps) {
  const image = readText(block.content?.image);
  const alt = readText(block.content?.alt) || block.name;

  if (!image) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
        Image placeholder
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-slate-100">
      <Image src={image} alt={alt} fill className="object-cover" />
    </div>
  );
}
