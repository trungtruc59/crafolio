"use client";

import BuilderCanvas from "@/features/template-builder/components/BuilderCanvas";
import BuilderHeader from "@/features/template-builder/components/BuilderHeader";
import BuilderInspector from "@/features/template-builder/components/BuilderInspector";
import BuilderSidebar from "@/features/template-builder/components/BuilderSidebar";
import { useBuilderSelection } from "@/features/template-builder/hooks/useBuilderSelection";
import type { BuilderTemplate } from "@/features/template-builder/types";

type BuilderLayoutProps = {
  template: BuilderTemplate;
};

export default function BuilderLayout({ template }: BuilderLayoutProps) {
  const { selection, setSelection } = useBuilderSelection({
    type: "template",
    id: template._id,
  });

  return (
    <div className="h-[calc(100vh-6rem)] min-h-[720px] overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm">
      <BuilderHeader template={template} />
      <div className="flex h-[calc(100%-4rem)] min-h-0">
        <BuilderSidebar
          template={template}
          selection={selection}
          onSelect={setSelection}
        />
        <BuilderCanvas
          template={template}
          selection={selection}
          onSelect={setSelection}
        />
        <BuilderInspector template={template} selection={selection} />
      </div>
    </div>
  );
}
