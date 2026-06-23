import TemplateCard from "@/features/admin/templates/components/TemplateCard";
import type { AdminTemplate } from "@/features/admin/templates/types";

type TemplatesGridProps = {
  templates: AdminTemplate[];
};

export default function TemplatesGrid({ templates }: TemplatesGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard key={template._id} template={template} />
      ))}
    </div>
  );
}
