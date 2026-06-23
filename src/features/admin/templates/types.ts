export type TemplateStatus = "draft" | "published" | "archived";

export type TemplateType = "industry_specific" | "basic_customizable";

export type AdminTemplateIndustry = {
  _id: string;
  name: string;
  slug: string;
};

export type AdminTemplateCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type AdminTemplateTheme = {
  _id: string;
  name: string;
  slug: string;
};

export type AdminTemplate = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  templateType: TemplateType;
  status: TemplateStatus;
  thumbnail?: string;
  previewUrl?: string;
  isPremium?: boolean;
  customizationLevel?: "low" | "medium" | "high";
  industryId?: AdminTemplateIndustry | string | null;
  categoryId?: AdminTemplateCategory | string | null;
  themeId?: AdminTemplateTheme | string | null;
  sections?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type TemplatesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TemplatesResponse = {
  items: AdminTemplate[];
  pagination: TemplatesPagination;
};

export type TemplateFilters = {
  page?: number;
  limit?: number;
  search?: string;
  industryId?: string;
  categoryId?: string;
  status?: TemplateStatus | "";
  templateType?: TemplateType | "";
};
