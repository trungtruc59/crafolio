import { auth } from "@/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { connectDB } from "@/lib/db";
import { validateCreateTemplateInput } from "@/lib/validators/template.validator";
import { Template } from "@/models/Template";
import { createTemplateService } from "@/services/template/create-template.service";
import {
  templateStatuses,
  templateTypes,
  type TemplateStatus,
  type TemplateType,
} from "@/types/template-builder";
import { Types } from "mongoose";

type TemplateFilter = {
  $or?: Array<{
    name?: RegExp;
    slug?: RegExp;
    description?: RegExp;
  }>;
  industryId?: string;
  categoryId?: string;
  status?: TemplateStatus;
  templateType?: TemplateType;
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readPositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function isTemplateStatus(value: string | null): value is TemplateStatus {
  return !!value && templateStatuses.includes(value as TemplateStatus);
}

function isTemplateType(value: string | null): value is TemplateType {
  return !!value && templateTypes.includes(value as TemplateType);
}

function addObjectIdFilter(
  filter: TemplateFilter,
  key: "industryId" | "categoryId",
  value: string | null
) {
  if (!value) {
    return;
  }

  if (!Types.ObjectId.isValid(value)) {
    throw new Error(`${key} is invalid`);
  }

  filter[key] = value;
}

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return errorResponse("Unauthorized", undefined, 401);
  }

  try {
    await connectDB();

    const url = new URL(req.url);
    const page = readPositiveInteger(url.searchParams.get("page"), 1);
    const limit = Math.min(
      readPositiveInteger(url.searchParams.get("limit"), 12),
      60
    );
    const skip = (page - 1) * limit;
    const search = url.searchParams.get("search")?.trim();
    const status = url.searchParams.get("status");
    const templateType = url.searchParams.get("templateType");
    const filter: TemplateFilter = {};

    if (search) {
      const searchRegex = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { name: searchRegex },
        { slug: searchRegex },
        { description: searchRegex },
      ];
    }

    addObjectIdFilter(filter, "industryId", url.searchParams.get("industryId"));
    addObjectIdFilter(filter, "categoryId", url.searchParams.get("categoryId"));

    if (status) {
      if (!isTemplateStatus(status)) {
        return errorResponse("Invalid template status", undefined, 400);
      }

      filter.status = status;
    }

    if (templateType) {
      if (!isTemplateType(templateType)) {
        return errorResponse("Invalid template type", undefined, 400);
      }

      filter.templateType = templateType;
    }

    const [items, total] = await Promise.all([
      Template.find(filter)
        .populate("industryId")
        .populate("categoryId")
        .populate("themeId")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Template.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(total / limit);

    return successResponse(
      "Templates fetched successfully",
      {
        items: JSON.parse(JSON.stringify(items)),
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, undefined, 400);
    }

    return errorResponse("Failed to fetch templates", undefined, 500);
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return errorResponse("Unauthorized", undefined, 401);
  }

  try {
    await connectDB();

    const body = await req.json();
    const input = validateCreateTemplateInput(body);
    const template = await createTemplateService(input);

    return successResponse("Template created successfully", template, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return errorResponse("Invalid JSON body", undefined, 400);
    }

    if (error instanceof Error) {
      const status =
        error.message === "Template slug already exists" ? 409 : 400;

      return errorResponse(error.message, undefined, status);
    }

    return errorResponse("Failed to create template", undefined, 500);
  }
}
