import AdminTemplatesPage from "@/features/admin/templates/components/AdminTemplatesPage";
import { getAdminTemplates } from "@/features/admin/templates/services/get-admin-templates";
import type {
  TemplateFilters,
  TemplateStatus,
  TemplateType,
} from "@/features/admin/templates/types";

function readString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

function readNumber(value: string | string[] | undefined, fallback: number) {
  const parsed = Number(readString(value));

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function readStatus(value: string | string[] | undefined) {
  const status = readString(value);

  return ["draft", "published", "archived"].includes(status)
    ? (status as TemplateStatus)
    : "";
}

function readTemplateType(value: string | string[] | undefined) {
  const templateType = readString(value);

  return ["industry_specific", "basic_customizable"].includes(templateType)
    ? (templateType as TemplateType)
    : "";
}

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const filters: TemplateFilters = {
    page: readNumber(params.page, 1),
    limit: readNumber(params.limit, 12),
    search: readString(params.search),
    status: readStatus(params.status),
    templateType: readTemplateType(params.templateType),
    industryId: readString(params.industryId),
    categoryId: readString(params.categoryId),
  };
  const data = await getAdminTemplates(filters);

  return <AdminTemplatesPage data={data} filters={filters} />;
}
