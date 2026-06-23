import Link from "next/link";
import type { BlockComponentProps } from "@/features/template-builder/types";

function readText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export default function ButtonBlock({ block }: BlockComponentProps) {
  const buttonText = readText(block.content?.buttonText) || block.name;
  const buttonUrl = readText(block.content?.buttonUrl) || "#";

  return (
    <Link
      href={buttonUrl}
      className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-cyan-700"
    >
      {buttonText}
    </Link>
  );
}
