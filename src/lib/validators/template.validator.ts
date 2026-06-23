import {
  customizationLevels,
  templateTypes,
  type CustomizationLevel,
  type TemplateType,
} from "@/types/template-builder";

export type CreateTemplateSeoInput = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
};

export type CreateTemplateInput = {
  name: string;
  slug: string;
  description?: string;
  templateType: TemplateType;
  industryId?: string;
  categoryId?: string;
  themeId?: string;
  thumbnail?: string;
  previewUrl?: string;
  isPremium: boolean;
  customizationLevel?: CustomizationLevel;
  autoGenerateSections: boolean;
  seo?: CreateTemplateSeoInput;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(input: Record<string, unknown>, key: string) {
  const value = input[key];

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`${key} must be a string`);
  }

  return value.trim();
}

function readRequiredString(input: Record<string, unknown>, key: string) {
  const value = optionalString(input, key);

  if (!value || value.length < 2) {
    throw new Error(`${key} is required and must be at least 2 characters`);
  }

  return value;
}

function readOptionalBoolean(
  input: Record<string, unknown>,
  key: string,
  defaultValue: boolean
) {
  const value = input[key];

  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error(`${key} must be a boolean`);
  }

  return value;
}

function readSeo(value: unknown): CreateTemplateSeoInput | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (!isRecord(value)) {
    throw new Error("seo must be an object");
  }

  const keywords = value.keywords;

  if (
    keywords !== undefined &&
    (!Array.isArray(keywords) ||
      keywords.some((keyword) => typeof keyword !== "string"))
  ) {
    throw new Error("seo.keywords must be an array of strings");
  }

  return {
    title: optionalString(value, "title"),
    description: optionalString(value, "description"),
    keywords: Array.isArray(keywords)
      ? keywords.map((keyword) => keyword.trim()).filter(Boolean)
      : undefined,
    image: optionalString(value, "image"),
  };
}

export function validateCreateTemplateInput(
  input: unknown
): CreateTemplateInput {
  if (!isRecord(input)) {
    throw new Error("Request body must be an object");
  }

  const name = readRequiredString(input, "name");
  const slug = readRequiredString(input, "slug");

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("slug can only contain lowercase letters, numbers, and hyphens");
  }

  const templateType = input.templateType;

  if (
    typeof templateType !== "string" ||
    !templateTypes.includes(templateType as TemplateType)
  ) {
    throw new Error("templateType must be industry_specific or basic_customizable");
  }

  const safeTemplateType = templateType as TemplateType;
  const industryId = optionalString(input, "industryId");
  const categoryId = optionalString(input, "categoryId");

  if (safeTemplateType === "industry_specific" && !industryId) {
    throw new Error("industryId is required for industry_specific templates");
  }

  const customizationLevel = input.customizationLevel;

  if (
    customizationLevel !== undefined &&
    (typeof customizationLevel !== "string" ||
      !customizationLevels.includes(customizationLevel as CustomizationLevel))
  ) {
    throw new Error("customizationLevel must be low, medium, or high");
  }

  const normalizedInput: CreateTemplateInput = {
    name,
    slug,
    description: optionalString(input, "description"),
    templateType: safeTemplateType,
    themeId: optionalString(input, "themeId"),
    thumbnail: optionalString(input, "thumbnail"),
    previewUrl: optionalString(input, "previewUrl"),
    isPremium: readOptionalBoolean(input, "isPremium", false),
    customizationLevel: customizationLevel as CustomizationLevel | undefined,
    autoGenerateSections: readOptionalBoolean(
      input,
      "autoGenerateSections",
      true
    ),
    seo: readSeo(input.seo),
  };

  if (safeTemplateType === "industry_specific") {
    normalizedInput.industryId = industryId;
    normalizedInput.categoryId = categoryId;
  }

  return normalizedInput;
}
