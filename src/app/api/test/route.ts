import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("URI =", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI!);

    return NextResponse.json({
      connected: true,
      readyState: mongoose.connection.readyState,
    });
  } catch (e) {
    console.error("Mongo error:", e);

    return NextResponse.json(
      {
        connected: false,
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}