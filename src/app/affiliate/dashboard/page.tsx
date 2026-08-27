"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, LogOut, TrendingUp, DollarSign, MousePointerClick, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Sale = {
  id: number;
  amount_cents: number;
  commission_cents: number;
  sale_date: string;
  note: string | null;
};

type MeResponse = {
  affiliate: {
    fullName: string;
    email: string;
    referralCode: string;
    referralLink: string;
    memberSince: string;
  };
  stats: {
    totalSales: number;
    totalEarnedCents: number;
    totalRevenueCents: number;
    clicks: number;
  };
  sales: Sale[];
};

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/affiliate/me")
      .then(async (res) => {
        if (!res.ok) {
          router.replace("/affiliate/login");
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json) setData(json);
        setLoading(false);
      });
  }, [router]);

  async function logout() {
    await fetch("/api/affiliate/logout", { method: "POST" });
    router.push("/affiliate/login");
  }

  async function copyLink() {
    if (!data) return;
    await navigator.clipboard.writeText(data.affiliate.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-alt">
        <p className="text-ink-muted">Se încarcă…</p>
      </div>
    );
  }

  const { affiliate, stats, sales } = data;

  return (
    <div className="min-h-screen bg-surface-alt font-sans">
      <header className="border-b border-surface-muted bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-court">
              Partner Portal
            </p>
            <h1 className="font-display text-2xl font-bold text-ink">
              Bine ai venit, {affiliate.fullName.split(" ")[0]}
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="mr-1 h-4 w-4" />
            Ieși din cont
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Referral link */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Link-ul tău de afiliere</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 truncate rounded-md border border-surface-muted bg-surface-alt px-4 py-3 font-mono text-sm text-ink">
                {affiliate.referralLink}
              </div>
              <Button onClick={copyLink} className="shrink-0">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copiat
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copiază link-ul
                  </>
                )}
              </Button>
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              Codul tău unic: <span className="font-semibold text-ink">{affiliate.referralCode}</span>
              {" · "}Câștigi <span className="font-semibold text-ink">$30 (33.7%)</span> din fiecare
              vânzare de $89 generată prin acest link.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<DollarSign className="h-5 w-5" />}
            label="Total câștigat"
            value={money(stats.totalEarnedCents)}
          />
          <StatCard
            icon={<Receipt className="h-5 w-5" />}
            label="Vânzări"
            value={String(stats.totalSales)}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Venit generat"
            value={money(stats.totalRevenueCents)}
          />
          <StatCard
            icon={<MousePointerClick className="h-5 w-5" />}
            label="Click-uri pe link"
            value={String(stats.clicks)}
          />
        </div>

        {/* Sales table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Vânzările tale</CardTitle>
          </CardHeader>
          <CardContent>
            {sales.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-muted">
                Nu ai încă vânzări înregistrate. Distribuie link-ul tău și revino aici pentru a-ți
                urmări comisioanele.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-muted text-left text-xs uppercase tracking-wide text-ink-muted">
                      <th className="py-2 pr-4">Data</th>
                      <th className="py-2 pr-4">Valoare vânzare</th>
                      <th className="py-2 pr-4">Comisionul tău</th>
                      <th className="py-2">Notă</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className="border-b border-surface-muted last:border-0">
                        <td className="py-3 pr-4 text-ink">
                          {new Date(sale.sale_date).toLocaleDateString("ro-RO")}
                        </td>
                        <td className="py-3 pr-4 text-ink-muted">{money(sale.amount_cents)}</td>
                        <td className="py-3 pr-4 font-semibold text-court">
                          {money(sale.commission_cents)}
                        </td>
                        <td className="py-3 text-ink-muted">{sale.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-court">{icon}</div>
        <p className="mt-3 font-display text-2xl font-bold text-ink">{value}</p>
        <p className="text-xs text-ink-muted">{label}</p>
      </CardContent>
    </Card>
  );
}
