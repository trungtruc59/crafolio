import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { saveAdminSettings } from "@/lib/settings/admin-settings";
import {
  updateAdminSettingsSchema,
  type UpdateAdminSettingsInput,
} from "@/lib/validations/settings.schema";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function formDataToSettings(formData: FormData): UpdateAdminSettingsInput {
  return {
    mail: {
      fromName: readString(formData, "mailFromName"),
      fromAddress: readString(formData, "mailFromAddress"),
      smtpServer: readString(formData, "smtpServer"),
      smtpPort: Number(readString(formData, "smtpPort")),
      smtpEncryption: readString(formData, "smtpEncryption") as
        | "tls"
        | "ssl"
        | "none",
      smtpUsername: readString(formData, "smtpUsername"),
      smtpPassword: readString(formData, "smtpPassword"),
      testEmail: readString(formData, "testEmail"),
    },
    system: {
      siteName: readString(formData, "siteName"),
      siteUrl: readString(formData, "siteUrl"),
      adminEmail: readString(formData, "adminEmail"),
      language: readString(formData, "language") as "vi" | "en",
      timezone: readString(formData, "timezone"),
      uploadLimit: Number(readString(formData, "uploadLimit")),
      sessionTimeout: Number(readString(formData, "sessionTimeout")),
      allowRegistration: formData.has("allowRegistration"),
      maintenanceMode: formData.has("maintenanceMode"),
    },
    seo: {
      title: readString(formData, "seoTitle"),
      description: readString(formData, "seoDescription"),
      keywords: readString(formData, "seoKeywords"),
      canonicalUrl: readString(formData, "seoCanonicalUrl"),
      ogImage: readString(formData, "seoOgImage"),
      indexing: formData.has("seoIndexing"),
      openGraph: formData.has("seoOpenGraph"),
      twitterCard: formData.has("seoTwitterCard"),
      sitemap: formData.has("seoSitemap"),
      jsonLd: formData.has("seoJsonLd"),
    },
  };
}

async function parseSettingsRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return {
      isFormSubmit: false,
      data: await request.json(),
    };
  }

  return {
    isFormSubmit: true,
    data: formDataToSettings(await request.formData()),
  };
}

function redirectToSettings(request: Request, status: "saved" | "error") {
  const url = new URL("/admin/settings", request.url);
  url.searchParams.set(status, "1");

  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return errorResponse({
      code: 401,
      messageKey: "auth.unauthorized",
    });
  }

  const { isFormSubmit, data } = await parseSettingsRequest(request);
  const parsed = updateAdminSettingsSchema.safeParse(data);

  if (!parsed.success) {
    if (isFormSubmit) {
      return redirectToSettings(request, "error");
    }

    return errorResponse({
      code: 400,
      messageKey: "settings.invalidSettingsData",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const settings = await saveAdminSettings(
      parsed.data,
      session.user.email || session.user.id
    );

    revalidatePath("/admin/settings");

    if (isFormSubmit) {
      return redirectToSettings(request, "saved");
    }

    return successResponse({
      messageKey: "settings.updateSuccess",
      data: settings,
    });
  } catch (error) {
    console.error("ADMIN_SETTINGS_UPDATE_ERROR", error);

    if (isFormSubmit) {
      return redirectToSettings(request, "error");
    }

    return errorResponse({
      code: error instanceof z.ZodError ? 400 : 500,
      messageKey:
        error instanceof z.ZodError
          ? "settings.invalidSettingsData"
          : "common.serverError",
    });
  }
}
