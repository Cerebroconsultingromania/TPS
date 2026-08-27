"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  Receipt,
  Plus,
  Loader2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type AffiliateRow = {
  id: number;
  full_name: string;
  email: string;
  partner_type: string;
  message: string | null;
  referral_code: string;
  referralLink: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  approved_at: string | null;
  total_sales: number;
  total_revenue_cents: number;
  total_commission_cents: number;
  total_clicks: number;
};

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-surface-muted bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
        </div>
        <div className="rounded-lg bg-court-soft p-2.5">
          <Icon className="h-5 w-5 text-court" />
        </div>
      </div>
    </div>
  );
}

export function AdminAffiliatesPanel() {
  const [affiliates, setAffiliates] = useState<AffiliateRow[] | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [saleFormFor, setSaleFormFor] = useState<number | null>(null);
  const [saleAmount, setSaleAmount] = useState("89");
  const [saleCommission, setSaleCommission] = useState("30");
  const [saleNote, setSaleNote] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/affiliates");
    if (res.ok) {
      const data = await res.json();
      setAffiliates(data.affiliates);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: number, status: "approved" | "rejected") {
    setBusyId(id);
    await fetch(`/api/admin/affiliates/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    setBusyId(null);
  }

  async function submitSale(id: number) {
    setBusyId(id);
    await fetch(`/api/admin/affiliates/${id}/sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountCents: Math.round(parseFloat(saleAmount || "0") * 100),
        commissionCents: Math.round(parseFloat(saleCommission || "0") * 100),
        note: saleNote,
      }),
    });
    setSaleFormFor(null);
    setSaleAmount("89");
    setSaleCommission("30");
    setSaleNote("");
    await load();
    setBusyId(null);
  }

  async function copyLink(link: string) {
    await navigator.clipboard.writeText(link);
  }

  if (!affiliates) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-court" />
      </div>
    );
  }

  const pending = affiliates.filter((a) => a.status === "pending");
  const approved = affiliates.filter((a) => a.status === "approved");
  const rejected = affiliates.filter((a) => a.status === "rejected");

  const totalCommissionOwed = approved.reduce((sum, a) => sum + a.total_commission_cents, 0);
  const totalRevenue = approved.reduce((sum, a) => sum + a.total_revenue_cents, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Clock} label="În așteptare" value={pending.length} />
        <StatCard icon={Users} label="Afiliați activi" value={approved.length} />
        <StatCard icon={Receipt} label="Venit generat (aprobați)" value={money(totalRevenue)} />
        <StatCard icon={DollarSign} label="Comisioane totale" value={money(totalCommissionOwed)} />
      </div>

      {pending.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-ink">
            Aplicații în așteptare ({pending.length})
          </h2>
          <div className="mt-4 space-y-3">
            {pending.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-surface-muted bg-white p-5 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{a.full_name}</p>
                    <p className="text-sm text-ink-muted">{a.email}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-court">
                      {a.partner_type}
                    </p>
                    {a.message && (
                      <p className="mt-2 max-w-xl text-sm text-ink-muted">{a.message}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={busyId === a.id}
                      onClick={() => setStatus(a.id, "approved")}
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Aprobă
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busyId === a.id}
                      onClick={() => setStatus(a.id, "rejected")}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Respinge
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-ink">
          Afiliați activi ({approved.length})
        </h2>
        <div className="mt-4 space-y-3">
          {approved.length === 0 && (
            <p className="text-sm text-ink-muted">Niciun afiliat aprobat încă.</p>
          )}
          {approved.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-surface-muted bg-white p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">{a.full_name}</p>
                  <p className="text-sm text-ink-muted">{a.email}</p>
                  <button
                    onClick={() => copyLink(a.referralLink)}
                    className="mt-1 flex items-center gap-1 text-xs text-court hover:underline"
                  >
                    <Copy className="h-3 w-3" />
                    {a.referral_code}
                  </button>
                </div>
                <div className="flex gap-6 text-right text-sm">
                  <div>
                    <p className="text-ink-muted">Vânzări</p>
                    <p className="font-semibold text-ink">{a.total_sales}</p>
                  </div>
                  <div>
                    <p className="text-ink-muted">Click-uri</p>
                    <p className="font-semibold text-ink">{a.total_clicks}</p>
                  </div>
                  <div>
                    <p className="text-ink-muted">Comision datorat</p>
                    <p className="font-semibold text-court">
                      {money(a.total_commission_cents)}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSaleFormFor(saleFormFor === a.id ? null : a.id)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Adaugă vânzare
                </Button>
              </div>

              {saleFormFor === a.id && (
                <div className="mt-4 flex flex-wrap items-end gap-3 rounded-lg bg-surface-alt p-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-muted">
                      Valoare vânzare ($)
                    </label>
                    <input
                      type="number"
                      value={saleAmount}
                      onChange={(e) => setSaleAmount(e.target.value)}
                      className="mt-1 w-28 rounded-md border border-surface-muted px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted">
                      Comision afiliat ($)
                    </label>
                    <input
                      type="number"
                      value={saleCommission}
                      onChange={(e) => setSaleCommission(e.target.value)}
                      className="mt-1 w-28 rounded-md border border-surface-muted px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-ink-muted">
                      Notă (opțional)
                    </label>
                    <input
                      type="text"
                      value={saleNote}
                      onChange={(e) => setSaleNote(e.target.value)}
                      placeholder="ex: client, referință comandă"
                      className="mt-1 w-full rounded-md border border-surface-muted px-3 py-2 text-sm"
                    />
                  </div>
                  <Button size="sm" disabled={busyId === a.id} onClick={() => submitSale(a.id)}>
                    Salvează
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {rejected.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-ink-muted">
            Respinse ({rejected.length})
          </h2>
          <div className="mt-4 space-y-2">
            {rejected.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-surface-muted bg-white px-4 py-3 text-sm"
              >
                <span className="text-ink-muted">
                  {a.full_name} · {a.email}
                </span>
                <Button size="sm" variant="outline" onClick={() => setStatus(a.id, "approved")}>
                  Aprobă totuși
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
