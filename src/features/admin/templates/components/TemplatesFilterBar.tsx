"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search } from "lucide-react";
import type {
  TemplateFilters,
  TemplateStatus,
  TemplateType,
} from "@/features/admin/templates/types";

type TemplatesFilterBarProps = {
  filters: TemplateFilters;
};

export default function TemplatesFilterBar({
  filters,
}: TemplatesFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(filters.search ?? "");
  const [status, setStatus] = useState<TemplateStatus | "">(
    filters.status ?? ""
  );
  const [templateType, setTemplateType] = useState<TemplateType | "">(
    filters.templateType ?? ""
  );

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("page", "1");

    if (search.trim()) {
      nextParams.set("search", search.trim());
    } else {
      nextParams.delete("search");
    }

    if (status) {
      nextParams.set("status", status);
    } else {
      nextParams.delete("status");
    }

    if (templateType) {
      nextParams.set("templateType", templateType);
    } else {
      nextParams.delete("templateType");
    }

    router.push(`/admin/templates?${nextParams.toString()}`);
  }

  function handleReset() {
    router.push("/admin/templates");
  }

  return (
    <form
      onSubmit={handleApply}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Search templates</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search templates"
            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as TemplateStatus | "")}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={templateType}
          onChange={(event) =>
            setTemplateType(event.target.value as TemplateType | "")
          }
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          aria-label="Filter by template type"
        >
          <option value="">All Types</option>
          <option value="industry_specific">Industry Specific</option>
          <option value="basic_customizable">Basic Customizable</option>
        </select>

        <select
          disabled
          className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
          aria-label="Industry filter"
        >
          <option>Industry filter coming soon</option>
        </select>

        <select
          disabled
          className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
          aria-label="Category filter"
        >
          <option>Category filter coming soon</option>
        </select>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </form>
  );
}
