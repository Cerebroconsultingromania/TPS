import { NextResponse } from "next/server";
import type { AnalyticsEvent } from "@/lib/analytics-types";
import { recordAnalyticsEvents } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { events?: AnalyticsEvent[] };
    const events = body.events ?? [];

    if (!Array.isArray(events) || events.length > 40) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const sanitized = events.filter(
      (e) =>
        e &&
        typeof e.type === "string" &&
        typeof e.path === "string" &&
        typeof e.sessionId === "string" &&
        e.path.length < 200 &&
        e.sessionId.length < 80
    );

    await recordAnalyticsEvents(sanitized);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
