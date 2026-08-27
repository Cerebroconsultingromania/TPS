import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const affiliateId = Number(id);
  const body = await request.json().catch(() => ({}));
  const status = body.status;

  if (!affiliateId || !["approved", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  try {
    await ensureSchema();
    const db = sql();

    if (status === "approved") {
      await db`
        UPDATE affiliates SET status = ${status}, approved_at = now() WHERE id = ${affiliateId}
      `;
    } else {
      await db`
        UPDATE affiliates SET status = ${status} WHERE id = ${affiliateId}
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin affiliate status update error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
