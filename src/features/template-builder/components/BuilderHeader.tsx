"use client";

import { Eye, Rocket, Save } from "lucide-react";
import type { BuilderTemplate } from "@/features/template-builder/types";

type BuilderHeaderProps = {
  template: BuilderTemplate;
};

export default function BuilderHeader({ template }: BuilderHeaderProps) {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="truncate text-lg font-semibold text-slate-950">
            {template.name}
          </h1>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase text-slate-600">
            {template.status}
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-slate-500">/{template.slug}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => console.log("preview", template._id)}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => console.log("save draft", template._id)}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={() => console.log("publish", template._id)}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          <Rocket className="h-4 w-4" />
          Publish
        </button>
      </div>
    </header>
  );
}
