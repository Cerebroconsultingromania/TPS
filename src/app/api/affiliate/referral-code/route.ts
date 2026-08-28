import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { getCurrentAffiliate, normalizeReferralCode, validateReferralCode, referralLink } from "@/lib/affiliate";

export async function POST(request: Request) {
  const affiliate = await getCurrentAffiliate();
  if (!affiliate || affiliate.status !== "approved") {
    return NextResponse.json({ error: "Neautentificat." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const raw = typeof body.code === "string" ? body.code : "";
  const code = normalizeReferralCode(raw);

  const validationError = validateReferralCode(code);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await ensureSchema();
    const db = sql();

    if (code === affiliate.referral_code) {
      return NextResponse.json({ ok: true, referralCode: code, referralLink: referralLink(code) });
    }

    const clash = (await db`
      SELECT id FROM affiliates WHERE LOWER(referral_code) = ${code} AND id != ${affiliate.id}
    `) as unknown as Array<{ id: number }>;
    if (clash.length > 0) {
      return NextResponse.json({ error: "Acest link este deja folosit de altcineva." }, { status: 409 });
    }

    await db`UPDATE affiliates SET referral_code = ${code} WHERE id = ${affiliate.id}`;

    return NextResponse.json({ ok: true, referralCode: code, referralLink: referralLink(code) });
  } catch (err) {
    console.error("affiliate referral-code update error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
