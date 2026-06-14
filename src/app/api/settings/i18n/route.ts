import { NextResponse } from "next/server";
import { getI18nSettings } from "@/lib/settings/i18n-setting";

export async function GET() {
  const settings = await getI18nSettings();

  return NextResponse.json({
    success: true,
    data: settings,
  });
}