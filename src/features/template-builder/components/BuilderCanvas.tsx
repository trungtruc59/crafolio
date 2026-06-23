"use client";

import EmptyBuilderState from "@/features/template-builder/components/EmptyBuilderState";
import TemplateRenderer from "@/features/template-builder/renderer/TemplateRenderer";
import type {
  BuilderSelection,
  BuilderTemplate,
} from "@/features/template-builder/types";

type BuilderCanvasProps = {
  template: BuilderTemplate;
  selection: BuilderSelection;
  onSelect: (selection: BuilderSelection) => void;
};

export default function BuilderCanvas({
  template,
  selection,
  onSelect,
}: BuilderCanvasProps) {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-slate-100 p-6">
      {template.sections.length === 0 ? (
        <EmptyBuilderState
          title="No sections"
          message="This template does not have generated sections yet."
        />
      ) : (
        <div className="mx-auto min-h-full max-w-5xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <TemplateRenderer
            template={template}
            selection={selection}
            onSelect={onSelect}
          />
        </div>
      )}
    </main>
  );
}
