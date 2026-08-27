import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function DELETE(
  _request: Request,
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

  try {
    await ensureSchema();
    const db = sql();
    await db`DELETE FROM affiliate_sales WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete sale error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
