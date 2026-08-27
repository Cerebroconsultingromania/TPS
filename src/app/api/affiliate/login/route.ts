import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { verifyPassword, setAffiliateSession } from "@/lib/affiliate";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Introdu email și parolă." }, { status: 400 });
  }

  try {
    await ensureSchema();
    const db = sql();
    const rows = (await db`SELECT * FROM affiliates WHERE email = ${email}`) as unknown as Array<{
      id: number;
      password_hash: string;
      password_salt: string;
      status: string;
    }>;
    const affiliate = rows[0];

    if (!affiliate || !verifyPassword(password, affiliate.password_hash, affiliate.password_salt)) {
      return NextResponse.json({ error: "Email sau parolă incorectă." }, { status: 401 });
    }

    if (affiliate.status === "pending") {
      return NextResponse.json(
        { error: "Aplicația ta este încă în așteptare de aprobare." },
        { status: 403 }
      );
    }
    if (affiliate.status === "rejected") {
      return NextResponse.json(
        { error: "Aplicația ta nu a fost aprobată. Contactează-ne pentru detalii." },
        { status: 403 }
      );
    }

    await setAffiliateSession(affiliate.id, affiliate.password_hash);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("affiliate login error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
