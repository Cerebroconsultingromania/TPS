import { NextResponse } from "next/server";
import { verifyAdminPassword, setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Parolă incorectă" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
