import { NextResponse } from "next/server";
import { getSiteMedia } from "@/lib/site-media";

export async function GET() {
  const media = await getSiteMedia();
  return NextResponse.json(media, {
    headers: { "Cache-Control": "no-store" },
  });
}
