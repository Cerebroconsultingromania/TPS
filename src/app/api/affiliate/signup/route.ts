import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { hashPassword, generateReferralCode } from "@/lib/affiliate";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const partnerType = typeof body.partnerType === "string" ? body.partnerType : "coach";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!fullName || !email || !email.includes("@") || password.length < 8) {
    return NextResponse.json(
      { error: "Completează numele, un email valid și o parolă de minim 8 caractere." },
      { status: 400 }
    );
  }

  try {
    await ensureSchema();
    const db = sql();

    const existing = (await db`SELECT id FROM affiliates WHERE email = ${email}`) as unknown as Array<{
      id: number;
    }>;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Există deja o aplicație cu acest email." },
        { status: 409 }
      );
    }

    const { hash, salt } = hashPassword(password);

    let referralCode = generateReferralCode(fullName);
    for (let attempt = 0; attempt < 5; attempt++) {
      const clash = (await db`SELECT id FROM affiliates WHERE referral_code = ${referralCode}`) as unknown as Array<{
        id: number;
      }>;
      if (clash.length === 0) break;
      referralCode = generateReferralCode(fullName);
    }

    await db`
      INSERT INTO affiliates (full_name, email, partner_type, message, password_hash, password_salt, referral_code, status)
      VALUES (${fullName}, ${email}, ${partnerType}, ${message}, ${hash}, ${salt}, ${referralCode}, 'pending')
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("affiliate signup error", err);
    return NextResponse.json(
      { error: "A apărut o eroare la server. Încearcă din nou în câteva minute." },
      { status: 500 }
    );
  }
}
