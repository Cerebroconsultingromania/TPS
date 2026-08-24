"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Parolă incorectă");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-court-gradient px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-8 backdrop-blur-md"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tennis-brand">
          TPDS Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">
          Login Administrator
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Acces privat pentru editarea imaginilor și video-urilor site-ului.
        </p>

        <label className="mt-8 block text-sm font-medium text-white/80">
          Parolă
          <input
            type="password"
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
          {loading ? "Se verifică…" : "Intră în panou"}
        </Button>
      </form>
    </div>
  );
}
