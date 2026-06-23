"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TemplatesPagination } from "@/features/admin/templates/types";

type TemplatePaginationProps = {
  pagination: TemplatesPagination;
};

export default function TemplatePagination({
  pagination,
}: TemplatePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(pagination.totalPages, 1);
  const isPreviousDisabled = pagination.page <= 1;
  const isNextDisabled = pagination.page >= totalPages;

  function goToPage(page: number) {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("page", String(page));
    router.push(`/admin/templates?${nextParams.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing page{" "}
        <span className="font-medium text-slate-900">{pagination.page}</span> of{" "}
        <span className="font-medium text-slate-900">{totalPages}</span> -{" "}
        {pagination.total} total
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isPreviousDisabled}
          onClick={() => goToPage(pagination.page - 1)}
          className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium text-slate-700">
          Page {pagination.page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={isNextDisabled}
          onClick={() => goToPage(pagination.page + 1)}
          className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
