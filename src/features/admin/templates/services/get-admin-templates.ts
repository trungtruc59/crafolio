import { headers } from "next/headers";
import type {
  TemplateFilters,
  TemplatesResponse,
} from "@/features/admin/templates/types";

type TemplatesApiResponse = {
  success: boolean;
  message?: string;
  data?: TemplatesResponse;
};

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    "http://localhost:3000"
  );
}

function appendFilter(
  searchParams: URLSearchParams,
  key: string,
  value: string | number | undefined
) {
  if (value === undefined || value === "") {
    return;
  }

  searchParams.set(key, String(value));
}

export async function getAdminTemplates(
  filters: TemplateFilters
): Promise<TemplatesResponse> {
  const searchParams = new URLSearchParams();
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  appendFilter(searchParams, "page", filters.page);
  appendFilter(searchParams, "limit", filters.limit);
  appendFilter(searchParams, "search", filters.search);
  appendFilter(searchParams, "industryId", filters.industryId);
  appendFilter(searchParams, "categoryId", filters.categoryId);
  appendFilter(searchParams, "status", filters.status);
  appendFilter(searchParams, "templateType", filters.templateType);

  const response = await fetch(
    `${getBaseUrl()}/api/admin/templates?${searchParams.toString()}`,
    {
      cache: "no-store",
      headers: cookie ? { cookie } : undefined,
    }
  );
  const payload = (await response.json()) as TemplatesApiResponse;

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || "Failed to fetch templates");
  }

  return payload.data;
}
