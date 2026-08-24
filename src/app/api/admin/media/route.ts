import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteMedia, saveSiteMedia } from "@/lib/site-media";
import type { SiteMedia } from "@/lib/media-types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const media = await getSiteMedia();
  return NextResponse.json(media);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteMedia;
  await saveSiteMedia(body);
  return NextResponse.json({ ok: true });
}
