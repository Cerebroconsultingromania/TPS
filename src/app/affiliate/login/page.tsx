"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AffiliateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/affiliate/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Nu s-a putut face autentificarea.");
      return;
    }
    router.push("/affiliate/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-court-gradient px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-8 backdrop-blur-md"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tennis-brand">
          Partner Portal
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">
          Autentificare Afiliat
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Intră cu emailul și parola alese la înscriere.
        </p>

        <label className="mt-8 block text-sm font-medium text-white/80">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-tennis-brand"
            autoComplete="email"
          />
        </label>

        <label className="mt-5 block text-sm font-medium text-white/80">
          Parolă
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-tennis-brand"
            autoComplete="current-password"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-tennis-brand text-ink hover:bg-tennis-light"
        >
          {loading ? "Se verifică…" : "Intră în cont"}
        </Button>

        <p className="mt-6 text-center text-sm text-white/60">
          Nu ești încă afiliat?{" "}
          <Link href="/affiliate#apply" className="font-semibold text-tennis-brand underline">
            Aplică aici
          </Link>
        </p>
      </form>
    </div>
  );
}
