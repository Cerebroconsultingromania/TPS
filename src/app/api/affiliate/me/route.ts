import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { getCurrentAffiliate, referralLink } from "@/lib/affiliate";

export async function GET() {
  try {
    const affiliate = await getCurrentAffiliate();
    if (!affiliate || affiliate.status !== "approved") {
      return NextResponse.json({ error: "Neautentificat." }, { status: 401 });
    }

    await ensureSchema();
    const db = sql();

    const sales = (await db`
      SELECT id, amount_cents, commission_cents, sale_date, note, paid_at
      FROM affiliate_sales
      WHERE affiliate_id = ${affiliate.id}
      ORDER BY sale_date DESC, id DESC
    `) as unknown as Array<{
      id: number;
      amount_cents: number;
      commission_cents: number;
      sale_date: string;
      note: string | null;
      paid_at: string | null;
    }>;

    const clicksResult = (await db`
      SELECT COUNT(*)::int AS count FROM affiliate_clicks WHERE affiliate_id = ${affiliate.id}
    `) as unknown as Array<{ count: number }>;

    const totalEarnedCents = sales.reduce((sum, s) => sum + s.commission_cents, 0);
    const totalRevenueCents = sales.reduce((sum, s) => sum + s.amount_cents, 0);
    const totalPaidCents = sales
      .filter((s) => s.paid_at)
      .reduce((sum, s) => sum + s.commission_cents, 0);
    const totalPendingCents = totalEarnedCents - totalPaidCents;

    return NextResponse.json({
      affiliate: {
        fullName: affiliate.full_name,
        email: affiliate.email,
        referralCode: affiliate.referral_code,
        referralLink: referralLink(affiliate.referral_code),
        memberSince: affiliate.approved_at ?? affiliate.created_at,
      },
      paymentInfo: {
        paymentMethod: affiliate.payment_method,
        paymentFullName: affiliate.payment_full_name,
        paymentAddress: affiliate.payment_address,
        paymentIban: affiliate.payment_iban,
        paymentBankName: affiliate.payment_bank_name,
        paymentSwift: affiliate.payment_swift,
        paypalEmail: affiliate.paypal_email,
      },
      stats: {
        totalSales: sales.length,
        totalEarnedCents,
        totalRevenueCents,
        totalPaidCents,
        totalPendingCents,
        clicks: clicksResult[0]?.count ?? 0,
      },
      sales,
    });
  } catch (err) {
    console.error("affiliate me error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
