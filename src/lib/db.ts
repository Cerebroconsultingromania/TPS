import { neon } from "@neondatabase/serverless";

function connectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.STORAGE_URL ||
    process.env.STORAGE_DATABASE_URL ||
    process.env.STORAGE_POSTGRES_URL;
  if (!url) {
    throw new Error(
      "No database connection string found. Set DATABASE_URL (or connect a Postgres database to this Vercel project) in your environment variables."
    );
  }
  return url;
}

let cached: ReturnType<typeof neon> | null = null;

export function sql() {
  if (!cached) {
    cached = neon(connectionString());
  }
  return cached;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = sql();
      await db`
        CREATE TABLE IF NOT EXISTS affiliates (
          id SERIAL PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          partner_type TEXT NOT NULL DEFAULT 'coach',
          message TEXT,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          referral_code TEXT NOT NULL UNIQUE,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          approved_at TIMESTAMPTZ
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS affiliate_sales (
          id SERIAL PRIMARY KEY,
          affiliate_id INTEGER NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
          amount_cents INTEGER NOT NULL DEFAULT 8900,
          commission_cents INTEGER NOT NULL DEFAULT 3000,
          sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
          note TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS affiliate_clicks (
          id SERIAL PRIMARY KEY,
          affiliate_id INTEGER NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return schemaReady;
}
