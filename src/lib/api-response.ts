import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  code: number;
  message?: string;
  messageKey?: string;
  data?: T;
  errors?: unknown;
}

type LegacySuccessOptions<T> = {
  code?: number;
  messageKey: string;
  data?: T;
};

type LegacyErrorOptions = {
  code?: number;
  messageKey: string;
  errors?: unknown;
};

export function successResponse<T>(
  message: string,
  data: T,
  status?: number
): NextResponse;
export function successResponse<T>(
  options: LegacySuccessOptions<T>
): NextResponse;
export function successResponse<T>(
  messageOrOptions: string | LegacySuccessOptions<T>,
  data?: T,
  status = 200
) {
  if (typeof messageOrOptions === "string") {
    return NextResponse.json(
      {
        success: true,
        message: messageOrOptions,
        data,
      },
      {
        status,
      }
    );
  }

  const { code = 200, messageKey, data: responseData } = messageOrOptions;

  return NextResponse.json(
    {
      success: true,
      code,
      messageKey,
      data: responseData,
    },
    {
      status: code,
    }
  );
}

export function errorResponse(
  message: string,
  errors?: unknown,
  status?: number
): NextResponse;
export function errorResponse(options: LegacyErrorOptions): NextResponse;
export function errorResponse(
  messageOrOptions: string | LegacyErrorOptions,
  errors?: unknown,
  status = 400
) {
  if (typeof messageOrOptions === "string") {
    return NextResponse.json(
      {
        success: false,
        message: messageOrOptions,
        ...(errors === undefined ? {} : { errors }),
      },
      {
        status,
      }
    );
  }

  const { code = 400, messageKey, errors: responseErrors } = messageOrOptions;

  return NextResponse.json(
    {
      success: false,
      code,
      messageKey,
      errors: responseErrors,
    },
    {
      status: code,
    }
  );
}
