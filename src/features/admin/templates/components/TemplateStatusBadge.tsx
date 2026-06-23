import type { TemplateStatus } from "@/features/admin/templates/types";

type TemplateStatusBadgeProps = {
  status: TemplateStatus;
};

const statusClasses: Record<TemplateStatus, string> = {
  draft: "border-amber-200 bg-amber-50 text-amber-700",
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  archived: "border-slate-200 bg-slate-100 text-slate-600",
};

export default function TemplateStatusBadge({
  status,
}: TemplateStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium capitalize",
        statusClasses[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}
