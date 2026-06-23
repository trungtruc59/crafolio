"use client";

import { Plus } from "lucide-react";
import type {
  BuilderSelection,
  BuilderTemplate,
} from "@/features/template-builder/types";

type BuilderSidebarProps = {
  template: BuilderTemplate;
  selection: BuilderSelection;
  onSelect: (selection: BuilderSelection) => void;
};

export default function BuilderSidebar({
  template,
  selection,
  onSelect,
}: BuilderSidebarProps) {
  const sections = [...template.sections].sort((a, b) => a.order - b.order);

  return (
    <aside className="flex min-h-0 w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
        <h2 className="text-sm font-semibold text-slate-950">Structure</h2>
        <button
          type="button"
          onClick={() => console.log("add section")}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          aria-label="Add Section"
          title="Add Section"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <button
          type="button"
          onClick={() => onSelect({ type: "template", id: template._id })}
          className={[
            "mb-3 w-full rounded-md border px-3 py-2 text-left transition",
            selection?.type === "template"
              ? "border-cyan-400 bg-cyan-50"
              : "border-slate-200 hover:bg-slate-50",
          ].join(" ")}
        >
          <span className="block text-sm font-semibold text-slate-900">
            Template
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            {template.sections.length} sections
          </span>
        </button>

        <div className="space-y-2">
          {sections.map((section) => {
            const sectionActive =
              selection?.type === "section" && selection.id === section._id;
            const blocks = [...section.blocks].sort(
              (a, b) => a.order - b.order
            );

            return (
              <div
                key={section._id}
                className="rounded-md border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => onSelect({ type: "section", id: section._id })}
                  className={[
                    "w-full rounded-t-md px-3 py-2 text-left transition",
                    sectionActive ? "bg-cyan-50" : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span className="block truncate text-sm font-medium text-slate-900">
                    {section.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {section.type} - {blocks.length} blocks
                  </span>
                </button>

                {blocks.length > 0 ? (
                  <div className="border-t border-slate-100 px-2 py-2">
                    {blocks.map((block) => {
                      const blockActive =
                        selection?.type === "block" &&
                        selection.id === block._id;

                      return (
                        <button
                          key={block._id}
                          type="button"
                          onClick={() =>
                            onSelect({ type: "block", id: block._id })
                          }
                          className={[
                            "mb-1 w-full rounded-md px-2 py-1.5 text-left text-xs transition last:mb-0",
                            blockActive
                              ? "bg-cyan-100 text-slate-950"
                              : "text-slate-600 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <span className="block truncate font-medium">
                            {block.name}
                          </span>
                          <span className="mt-0.5 block truncate text-slate-400">
                            {block.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
