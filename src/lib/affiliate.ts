import { randomBytes, scryptSync, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import { sql, ensureSchema } from "@/lib/db";

export const PRODUCT_PRICE_CENTS = 8900;
export const COMMISSION_CENTS = 3000;
export const COMMISSION_PERCENT = Math.round(
  (COMMISSION_CENTS / PRODUCT_PRICE_CENTS) * 1000
) / 10; // 33.7

const SESSION_COOKIE = "tpds_affiliate";

export type Affiliate = {
  id: number;
  full_name: string;
  email: string;
  partner_type: string;
  message: string | null;
  referral_code: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  approved_at: string | null;
};

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const candidate = scryptSync(password, salt, 64).toString("hex");
  try {
    return timingSafeEqual(Buffer.from(candidate), Buffer.from(hash));
  } catch {
    return false;
  }
}

function sessionSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "tpds-admin-2026";
}

function sessionToken(affiliateId: number, passwordHash: string): string {
  return createHash("sha256")
    .update(`${affiliateId}:${passwordHash}:${sessionSecret()}:affiliate-session`)
    .digest("hex");
}

export async function setAffiliateSession(affiliateId: number, passwordHash: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, `${affiliateId}.${sessionToken(affiliateId, passwordHash)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAffiliateSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentAffiliate(): Promise<Affiliate | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [idStr, token] = raw.split(".");
  const id = Number(idStr);
  if (!id || !token) return null;

  await ensureSchema();
  const db = sql();
  const rows = (await db`SELECT * FROM affiliates WHERE id = ${id}`) as unknown as Array<
    Affiliate & { password_hash: string }
  >;
  const affiliate = rows[0];
  if (!affiliate) return null;

  const expected = sessionToken(id, affiliate.password_hash);
  try {
    if (!timingSafeEqual(Buffer.from(token), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  const { password_hash: _ph, ...rest } = affiliate;
  void _ph;
  return rest as Affiliate;
}

export function generateReferralCode(fullName: string): string {
  const base = fullName
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 10) || "partner";
  const suffix = randomBytes(3).toString("hex");
  return `${base}-${suffix}`;
}

const RESERVED_CODES = new Set([
  "admin", "login", "logout", "signup", "api", "dashboard", "affiliate",
  "affiliates", "system", "about", "blog", "video-library", "go", "www",
]);

export function normalizeReferralCode(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateReferralCode(code: string): string | null {
  if (code.length < 3) return "Link-ul trebuie să aibă minim 3 caractere.";
  if (code.length > 40) return "Link-ul poate avea maxim 40 de caractere.";
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]{3}$/.test(code)) {
    return "Folosește doar litere mici, cifre și cratime (nu la început/sfârșit).";
  }
  if (RESERVED_CODES.has(code)) return "Acest text este rezervat, alege altul.";
  return null;
}

export function referralLink(code: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://tps-cerebro4.vercel.app";
  return `${base.replace(/\/$/, "")}/api/go/${code}`;
}
