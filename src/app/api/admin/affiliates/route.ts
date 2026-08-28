import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";
import { referralLink } from "@/lib/affiliate";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureSchema();
    const db = sql();

    const affiliates = (await db`
      SELECT
        a.id, a.full_name, a.email, a.partner_type, a.message, a.referral_code,
        a.status, a.created_at, a.approved_at,
        a.payment_method, a.payment_full_name, a.payment_address,
        a.payment_iban, a.payment_bank_name, a.payment_swift, a.paypal_email,
        COALESCE(s.total_sales, 0)::int AS total_sales,
        COALESCE(s.total_revenue_cents, 0)::int AS total_revenue_cents,
        COALESCE(s.total_commission_cents, 0)::int AS total_commission_cents,
        COALESCE(s.total_paid_cents, 0)::int AS total_paid_cents,
        COALESCE(c.total_clicks, 0)::int AS total_clicks,
        COALESCE(sales_list.sales, '[]'::json) AS sales
      FROM affiliates a
      LEFT JOIN (
        SELECT affiliate_id,
               COUNT(*) AS total_sales,
               SUM(amount_cents) AS total_revenue_cents,
               SUM(commission_cents) AS total_commission_cents,
               SUM(commission_cents) FILTER (WHERE paid_at IS NOT NULL) AS total_paid_cents
        FROM affiliate_sales
        GROUP BY affiliate_id
      ) s ON s.affiliate_id = a.id
      LEFT JOIN (
        SELECT affiliate_id, COUNT(*) AS total_clicks
        FROM affiliate_clicks
        GROUP BY affiliate_id
      ) c ON c.affiliate_id = a.id
      LEFT JOIN (
        SELECT affiliate_id, json_agg(
          json_build_object(
            'id', id, 'amount_cents', amount_cents, 'commission_cents', commission_cents,
            'sale_date', sale_date, 'note', note, 'paid_at', paid_at
          ) ORDER BY sale_date DESC, id DESC
        ) AS sales
        FROM affiliate_sales
        GROUP BY affiliate_id
      ) sales_list ON sales_list.affiliate_id = a.id
      ORDER BY
        CASE a.status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
        a.created_at DESC
    `) as unknown as Array<{
      id: number;
      full_name: string;
      email: string;
      partner_type: string;
      message: string | null;
      referral_code: string;
      status: string;
      created_at: string;
      approved_at: string | null;
      payment_method: string | null;
      payment_full_name: string | null;
      payment_address: string | null;
      payment_iban: string | null;
      payment_bank_name: string | null;
      payment_swift: string | null;
      paypal_email: string | null;
      total_sales: number;
      total_revenue_cents: number;
      total_commission_cents: number;
      total_paid_cents: number;
      total_clicks: number;
      sales: Array<{
        id: number;
        amount_cents: number;
        commission_cents: number;
        sale_date: string;
        note: string | null;
        paid_at: string | null;
      }>;
    }>;

    const withLinks = affiliates.map((a) => ({
      ...a,
      referralLink: referralLink(a.referral_code),
      total_pending_cents: a.total_commission_cents - a.total_paid_cents,
    }));

    return NextResponse.json({ affiliates: withLinks });
  } catch (err) {
    console.error("admin affiliates list error", err);
    return NextResponse.json(
      { error: "Nu s-a putut încărca lista de afiliați. Verifică baza de date." },
      { status: 500 }
    );
  }
}
