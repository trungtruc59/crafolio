import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  code: number;
  messageKey: string;
  data?: T;
  errors?: unknown;
}

export function successResponse<T>({
  code = 200,
  messageKey,
  data,
}: {
  code?: number;
  messageKey: string;
  data?: T;
}) {
  return NextResponse.json(
    {
      success: true,
      code,
      messageKey,
      data,
    },
    {
      status: code,
    }
  );
}

export function errorResponse({
  code = 400,
  messageKey,
  errors,
}: {
  code?: number;
  messageKey: string;
  errors?: unknown;
}) {
  return NextResponse.json(
    {
      success: false,
      code,
      messageKey,
      errors,
    },
    {
      status: code,
    }
  );
}