import Link from "next/link";
import { Plus } from "lucide-react";

type EmptyTemplatesStateProps = {
  hasFilters: boolean;
};

export default function EmptyTemplatesState({
  hasFilters,
}: EmptyTemplatesStateProps) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        No templates found
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasFilters
          ? "Try adjusting your search or filters."
          : "Create your first template to start building portfolio layouts."}
      </p>
      <Link
        href="/admin/templates/create"
        className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-cyan-700"
      >
        <Plus className="h-4 w-4" />
        Create Template
      </Link>
    </section>
  );
}
