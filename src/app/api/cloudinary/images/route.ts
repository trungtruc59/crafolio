import { getCurrentSession } from "@/lib/session";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  deleteCloudinaryImage,
  listCloudinaryImages,
  normalizeCloudinaryFolder,
  uploadCloudinaryImage,
} from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

async function requireUser() {
  const session = await getCurrentSession();

  if (!session?.user?.id) {
    return null;
  }

  return session.user;
}

async function requireAdmin() {
  const user = await requireUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return errorResponse({
        code: 401,
        messageKey: "auth.unauthorized",
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return errorResponse({
        code: 400,
        messageKey: "cloudinary.imageRequired",
      });
    }

    if (!file.type.startsWith("image/")) {
      return errorResponse({
        code: 400,
        messageKey: "cloudinary.invalidImageType",
      });
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return errorResponse({
        code: 413,
        messageKey: "cloudinary.imageTooLarge",
      });
    }

    const folderValue = formData.get("folder");
    const folder =
      typeof folderValue === "string"
        ? folderValue
        : `crafolio/users/${user.id}`;
    const tagsValue = formData.get("tags");
    const tags =
      typeof tagsValue === "string"
        ? tagsValue
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : ["crafolio"];

    const image = await uploadCloudinaryImage(file, {
      folder: normalizeCloudinaryFolder(folder),
      tags,
    });

    return successResponse({
      code: 201,
      messageKey: "cloudinary.uploadSuccess",
      data: { image },
    });
  } catch (error) {
    console.error("CLOUDINARY_UPLOAD_ERROR", error);

    return errorResponse({
      code: 500,
      messageKey: "cloudinary.uploadFailed",
    });
  }
}

export async function GET(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return errorResponse({
        code: 403,
        messageKey: "auth.forbidden",
      });
    }

    const { searchParams } = new URL(request.url);
    const maxResults = Number(searchParams.get("maxResults") ?? 30);
    const folder = searchParams.get("folder");
    const nextCursor = searchParams.get("nextCursor");

    const data = await listCloudinaryImages({
      folder,
      maxResults: Number.isFinite(maxResults) ? maxResults : 30,
      nextCursor,
    });

    return successResponse({
      messageKey: "cloudinary.listSuccess",
      data,
    });
  } catch (error) {
    console.error("CLOUDINARY_LIST_ERROR", error);

    return errorResponse({
      code: 500,
      messageKey: "cloudinary.listFailed",
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return errorResponse({
        code: 403,
        messageKey: "auth.forbidden",
      });
    }

    const body = (await request.json()) as { publicId?: unknown };

    if (typeof body.publicId !== "string" || !body.publicId.trim()) {
      return errorResponse({
        code: 400,
        messageKey: "cloudinary.publicIdRequired",
      });
    }

    const result = await deleteCloudinaryImage(body.publicId.trim());

    return successResponse({
      messageKey: "cloudinary.deleteSuccess",
      data: { result },
    });
  } catch (error) {
    console.error("CLOUDINARY_DELETE_ERROR", error);

    return errorResponse({
      code: 500,
      messageKey: "cloudinary.deleteFailed",
    });
  }
}
