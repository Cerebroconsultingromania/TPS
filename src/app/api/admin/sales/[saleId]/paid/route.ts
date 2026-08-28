import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ saleId: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { saleId } = await params;
  const id = Number(saleId);
  if (!id) {
    return NextResponse.json({ error: "Vânzare invalidă." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const paid = body.paid !== false;

  try {
    await ensureSchema();
    const db = sql();
    if (paid) {
      await db`UPDATE affiliate_sales SET paid_at = now() WHERE id = ${id}`;
    } else {
      await db`UPDATE affiliate_sales SET paid_at = NULL WHERE id = ${id}`;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin mark sale paid error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
