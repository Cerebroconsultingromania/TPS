import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function DELETE(
  _request: Request,
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

  try {
    await ensureSchema();
    const db = sql();
    await db`DELETE FROM affiliates WHERE id = ${affiliateId}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete affiliate error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
