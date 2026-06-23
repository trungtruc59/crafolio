import Link from "next/link";
import { Plus } from "lucide-react";

export default function TemplatesPageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Admin
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          Templates
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage industry-specific and customizable portfolio templates.
        </p>
      </div>

      <Link
        href="/admin/templates/create"
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-cyan-700"
      >
        <Plus className="h-4 w-4" />
        Create Template
      </Link>
    </div>
  );
}
