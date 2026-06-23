"use client";

import type {
  BuilderBlock,
  BuilderSection,
  BuilderSelection,
  BuilderTemplate,
} from "@/features/template-builder/types";

type BuilderInspectorProps = {
  template: BuilderTemplate;
  selection: BuilderSelection;
};

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <input
        readOnly
        value={String(value ?? "")}
        className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700"
      />
    </label>
  );
}

function KeyValuePreview({
  title,
  value,
}: {
  title: string;
  value?: Record<string, unknown>;
}) {
  const entries = Object.entries(value ?? {});

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {entries.length === 0 ? (
        <p className="mt-2 text-sm text-slate-400">Empty</p>
      ) : (
        <div className="mt-2 space-y-2">
          {entries.map(([key, entryValue]) => (
            <div
              key={key}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <p className="text-xs font-medium text-slate-500">{key}</p>
              <p className="mt-1 break-words text-sm text-slate-800">
                {typeof entryValue === "object"
                  ? JSON.stringify(entryValue)
                  : String(entryValue ?? "")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function findSelectedSection(
  template: BuilderTemplate,
  selection: BuilderSelection
) {
  if (selection?.type !== "section") {
    return null;
  }

  return template.sections.find((section) => section._id === selection.id) ?? null;
}

function findSelectedBlock(
  template: BuilderTemplate,
  selection: BuilderSelection
) {
  if (selection?.type !== "block") {
    return null;
  }

  for (const section of template.sections) {
    const block = section.blocks.find((item) => item._id === selection.id);

    if (block) {
      return block;
    }
  }

  return null;
}

function TemplatePanel({ template }: { template: BuilderTemplate }) {
  return (
    <div className="space-y-4">
      <Field label="Name" value={template.name} />
      <Field label="Slug" value={template.slug} />
      <Field label="Type" value={template.templateType} />
      <Field label="Status" value={template.status} />
    </div>
  );
}

function SectionPanel({ section }: { section: BuilderSection }) {
  return (
    <div className="space-y-4">
      <Field label="Section name" value={section.name} />
      <Field label="Type" value={section.type} />
      <Field label="Order" value={section.order} />
      <Field label="Visible" value={section.isVisible ? "Yes" : "No"} />
      <Field label="Variant" value={section.layout?.variant} />
      <Field label="Container" value={section.layout?.container} />
      <Field label="Padding top" value={section.layout?.spacing?.paddingTop} />
      <Field
        label="Padding bottom"
        value={section.layout?.spacing?.paddingBottom}
      />
      <Field label="Background" value={section.styles?.backgroundColor} />
      <Field label="Text color" value={section.styles?.textColor} />
    </div>
  );
}

function BlockPanel({ block }: { block: BuilderBlock }) {
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <Field label="Block name" value={block.name} />
        <Field label="Type" value={block.type} />
        <Field label="Order" value={block.order} />
        <Field label="Visible" value={block.isVisible ? "Yes" : "No"} />
      </div>
      <KeyValuePreview title="Content" value={block.content} />
      <KeyValuePreview title="Settings" value={block.settings} />
      <KeyValuePreview title="Styles" value={block.styles} />
    </div>
  );
}

export default function BuilderInspector({
  template,
  selection,
}: BuilderInspectorProps) {
  const section = findSelectedSection(template, selection);
  const block = findSelectedBlock(template, selection);

  return (
    <aside className="min-h-0 w-[340px] shrink-0 overflow-y-auto border-l border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-950">Inspector</h2>
        <p className="mt-1 text-xs text-slate-500">
          {block ? "Block" : section ? "Section" : "Template"} properties
        </p>
      </div>
      <div className="p-4">
        {block ? (
          <BlockPanel block={block} />
        ) : section ? (
          <SectionPanel section={section} />
        ) : (
          <TemplatePanel template={template} />
        )}
      </div>
    </aside>
  );
}
