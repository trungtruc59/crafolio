import EmptyTemplatesState from "@/features/admin/templates/components/EmptyTemplatesState";
import TemplatePagination from "@/features/admin/templates/components/TemplatePagination";
import TemplatesFilterBar from "@/features/admin/templates/components/TemplatesFilterBar";
import TemplatesGrid from "@/features/admin/templates/components/TemplatesGrid";
import TemplatesPageHeader from "@/features/admin/templates/components/TemplatesPageHeader";
import type {
  TemplateFilters,
  TemplatesResponse,
} from "@/features/admin/templates/types";

type AdminTemplatesPageProps = {
  data: TemplatesResponse;
  filters: TemplateFilters;
};

function hasActiveFilters(filters: TemplateFilters) {
  return Boolean(
    filters.search ||
      filters.status ||
      filters.templateType ||
      filters.industryId ||
      filters.categoryId
  );
}

export default function AdminTemplatesPage({
  data,
  filters,
}: AdminTemplatesPageProps) {
  const hasTemplates = data.items.length > 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <TemplatesPageHeader />
      <TemplatesFilterBar filters={filters} />

      {hasTemplates ? (
        <>
          <TemplatesGrid templates={data.items} />
          <TemplatePagination pagination={data.pagination} />
        </>
      ) : (
        <EmptyTemplatesState hasFilters={hasActiveFilters(filters)} />
      )}
    </div>
  );
}
