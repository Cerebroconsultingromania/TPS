import { NextResponse } from "next/server";
import { clearAffiliateSession } from "@/lib/affiliate";

export async function POST() {
  await clearAffiliateSession();
  return NextResponse.json({ ok: true });
}
