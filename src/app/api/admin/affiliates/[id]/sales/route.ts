import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";
import { PRODUCT_PRICE_CENTS, COMMISSION_CENTS } from "@/lib/affiliate";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const affiliateId = Number(id);
  if (!affiliateId) {
    return NextResponse.json({ error: "Afiliat invalid." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const amountCents =
    typeof body.amountCents === "number" && body.amountCents > 0
      ? Math.round(body.amountCents)
      : PRODUCT_PRICE_CENTS;
  const commissionCents =
    typeof body.commissionCents === "number" && body.commissionCents >= 0
      ? Math.round(body.commissionCents)
      : COMMISSION_CENTS;
  const saleDate = typeof body.saleDate === "string" && body.saleDate ? body.saleDate : null;
  const note = typeof body.note === "string" ? body.note.trim() : null;

  try {
    await ensureSchema();
    const db = sql();

    const exists = (await db`SELECT id FROM affiliates WHERE id = ${affiliateId}`) as unknown as Array<{
      id: number;
    }>;
    if (exists.length === 0) {
      return NextResponse.json({ error: "Afiliatul nu există." }, { status: 404 });
    }

    if (saleDate) {
      await db`
        INSERT INTO affiliate_sales (affiliate_id, amount_cents, commission_cents, sale_date, note)
        VALUES (${affiliateId}, ${amountCents}, ${commissionCents}, ${saleDate}, ${note})
      `;
    } else {
      await db`
        INSERT INTO affiliate_sales (affiliate_id, amount_cents, commission_cents, note)
        VALUES (${affiliateId}, ${amountCents}, ${commissionCents}, ${note})
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin add sale error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
