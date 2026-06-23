import Link from "next/link";
import {
  ArrowUpRight,
  Crown,
  ExternalLink,
  Layers,
  MoreHorizontal,
} from "lucide-react";
import TemplateStatusBadge from "@/features/admin/templates/components/TemplateStatusBadge";
import TemplateTypeBadge from "@/features/admin/templates/components/TemplateTypeBadge";
import type {
  AdminTemplate,
  AdminTemplateCategory,
  AdminTemplateIndustry,
} from "@/features/admin/templates/types";

type TemplateCardProps = {
  template: AdminTemplate;
};

function readName(
  value: AdminTemplateIndustry | AdminTemplateCategory | string | null | undefined
) {
  return typeof value === "object" && value !== null ? value.name : "";
}

function formatDate(value?: string) {
  if (!value) {
    return "Not updated";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const industryName = readName(template.industryId);
  const categoryName = readName(template.categoryId);
  const sectionCount = template.sections?.length ?? 0;

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="relative h-40 border-b border-slate-100 bg-slate-100">
        {template.thumbnail ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${template.thumbnail})` }}
            aria-label={`${template.name} thumbnail`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_100%)]">
            <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-500 shadow-sm">
              Template preview
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <TemplateStatusBadge status={template.status} />
          <TemplateTypeBadge type={template.templateType} />
        </div>

        {template.isPremium ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            <Crown className="h-3.5 w-3.5" />
            Premium
          </span>
        ) : null}
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-slate-950">
            {template.name}
          </h3>
          <p className="mt-1 truncate text-xs text-slate-500">
            /{template.slug}
          </p>
          <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">
            {template.description || "No description provided."}
          </p>
        </div>

        <div className="grid gap-2 text-xs text-slate-500">
          <div className="flex items-center justify-between gap-3">
            <span>Industry</span>
            <span className="truncate font-medium text-slate-700">
              {industryName || "General"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Category</span>
            <span className="truncate font-medium text-slate-700">
              {categoryName || "None"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Updated</span>
            <span className="font-medium text-slate-700">
              {formatDate(template.updatedAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Layers className="h-3.5 w-3.5" />
            {sectionCount} sections
          </span>

          <div className="flex items-center gap-2">
            {template.previewUrl ? (
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                aria-label="Preview template"
                title="Preview"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            <button
              type="button"
              disabled
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-300"
              aria-label="More actions"
              title="More actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <Link
              href={`/admin/templates/${template._id}/builder`}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-medium text-white transition hover:bg-cyan-700"
            >
              Open Builder
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
