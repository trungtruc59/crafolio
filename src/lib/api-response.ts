import { NextResponse } from "next/server";

export function successResponse<T>(
  data: T,
  messageKey = "common.success",
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      messageKey,
      data,
    },
    { status }
  );
}

export function errorResponse(
  messageKey = "common.error",
  status = 400,
  errors?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      messageKey,
      errors,
    },
    { status }
  );
}