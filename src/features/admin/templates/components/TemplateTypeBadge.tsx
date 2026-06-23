import type { TemplateType } from "@/features/admin/templates/types";

type TemplateTypeBadgeProps = {
  type: TemplateType;
};

const typeLabels: Record<TemplateType, string> = {
  industry_specific: "Industry",
  basic_customizable: "Basic",
};

const typeClasses: Record<TemplateType, string> = {
  industry_specific: "border-cyan-200 bg-cyan-50 text-cyan-700",
  basic_customizable: "border-violet-200 bg-violet-50 text-violet-700",
};

export default function TemplateTypeBadge({ type }: TemplateTypeBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        typeClasses[type],
      ].join(" ")}
    >
      {typeLabels[type]}
    </span>
  );
}
