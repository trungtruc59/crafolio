import { v2 as cloudinary } from "cloudinary";
import type {
  ResourceApiResponse,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";

type CloudinaryResource = ResourceApiResponse["resources"][number];

export type CloudinaryImage = {
  publicId: string;
  secureUrl: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  bytes: number;
  createdAt: string;
};

const DEFAULT_FOLDER = "crafolio";

function requireCloudinaryEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary environment variables");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudinary;
}

function toCloudinaryImage(resource: CloudinaryResource | UploadApiResponse) {
  return {
    publicId: resource.public_id,
    secureUrl: resource.secure_url,
    url: resource.url,
    width: resource.width,
    height: resource.height,
    format: resource.format,
    resourceType: resource.resource_type,
    bytes: resource.bytes,
    createdAt: resource.created_at,
  } satisfies CloudinaryImage;
}

export function normalizeCloudinaryFolder(folder?: string | null) {
  const normalized = folder
    ?.trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9/_-]/g, "-")
    .replace(/\/{2,}/g, "/");

  return normalized || DEFAULT_FOLDER;
}

export async function uploadCloudinaryImage(
  file: File,
  options?: Pick<UploadApiOptions, "folder" | "public_id" | "tags">
) {
  const client = requireCloudinaryEnv();
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder: normalizeCloudinaryFolder(options?.folder),
        public_id: options?.public_id,
        tags: options?.tags,
        resource_type: "image",
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve(uploadResult);
      }
    );

    stream.end(buffer);
  });

  return toCloudinaryImage(result);
}

export async function listCloudinaryImages({
  folder,
  maxResults,
  nextCursor,
}: {
  folder?: string | null;
  maxResults?: number;
  nextCursor?: string | null;
}) {
  const client = requireCloudinaryEnv();
  const result = (await client.api.resources({
    type: "upload",
    resource_type: "image",
    prefix: normalizeCloudinaryFolder(folder),
    max_results: Math.min(Math.max(maxResults ?? 30, 1), 100),
    next_cursor: nextCursor || undefined,
  })) as ResourceApiResponse;

  return {
    images: result.resources.map(toCloudinaryImage),
    nextCursor: result.next_cursor ?? null,
  };
}

export async function deleteCloudinaryImage(publicId: string) {
  const client = requireCloudinaryEnv();
  const result = await client.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  return result;
}
