import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const normalizedCode = code.trim().toLowerCase();
  const url = new URL(request.url);
  const redirectUrl = new URL("/", url.origin);

  try {
    await ensureSchema();
    const db = sql();
    const rows = (await db`
      SELECT id FROM affiliates WHERE LOWER(referral_code) = ${normalizedCode} AND status = 'approved'
    `) as unknown as Array<{ id: number }>;
    const affiliate = rows[0];

    if (affiliate) {
      await db`INSERT INTO affiliate_clicks (affiliate_id) VALUES (${affiliate.id})`;
      const response = NextResponse.redirect(redirectUrl, { status: 307 });
      response.cookies.set("tpds_ref", normalizedCode, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    }
  } catch (err) {
    console.error("referral click tracking error", err);
  }

  return NextResponse.redirect(redirectUrl, { status: 307 });
}
