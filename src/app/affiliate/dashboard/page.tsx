"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  LogOut,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Receipt,
  Pencil,
  X,
  Landmark,
  Wallet,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Sale = {
  id: number;
  amount_cents: number;
  commission_cents: number;
  sale_date: string;
  note: string | null;
  paid_at: string | null;
};

type PaymentInfo = {
  paymentMethod: "bank" | "paypal" | null;
  paymentFullName: string | null;
  paymentAddress: string | null;
  paymentIban: string | null;
  paymentBankName: string | null;
  paymentSwift: string | null;
  paypalEmail: string | null;
};

type MeResponse = {
  affiliate: {
    fullName: string;
    email: string;
    referralCode: string;
    referralLink: string;
    memberSince: string;
  };
  paymentInfo: PaymentInfo;
  stats: {
    totalSales: number;
    totalEarnedCents: number;
    totalRevenueCents: number;
    totalPaidCents: number;
    totalPendingCents: number;
    clicks: number;
  };
  sales: Sale[];
};

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

const emptyPaymentForm = {
  paymentMethod: "bank" as "bank" | "paypal",
  paymentFullName: "",
  paymentAddress: "",
  paymentIban: "",
  paymentBankName: "",
  paymentSwift: "",
  paypalEmail: "",
};

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [editingLink, setEditingLink] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");
  const [savingLink, setSavingLink] = useState(false);

  const [editingPayment, setEditingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState(emptyPaymentForm);
  const [paymentError, setPaymentError] = useState("");
  const [savingPayment, setSavingPayment] = useState(false);

  useEffect(() => {
    fetch("/api/affiliate/me")
      .then(async (res) => {
        if (!res.ok) {
          router.replace("/affiliate/login");
          return null;
        }
        return res.json();
      })
      .then((json: MeResponse | null) => {
        if (json) {
          setData(json);
          if (!json.paymentInfo.paymentMethod) setEditingPayment(true);
        }
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

  function startEditingLink() {
    if (!data) return;
    setLinkInput(data.affiliate.referralCode);
    setLinkError("");
    setEditingLink(true);
  }

  async function saveLink() {
    setSavingLink(true);
    setLinkError("");
    const res = await fetch("/api/affiliate/referral-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: linkInput }),
    });
    const json = await res.json().catch(() => ({}));
    setSavingLink(false);

    if (!res.ok) {
      setLinkError(json.error || "Nu s-a putut salva. Încearcă din nou.");
      return;
    }

    setData((d) =>
      d
        ? {
            ...d,
            affiliate: { ...d.affiliate, referralCode: json.referralCode, referralLink: json.referralLink },
          }
        : d
    );
    setEditingLink(false);
  }

  function startEditingPayment() {
    if (!data) return;
    const p = data.paymentInfo;
    setPaymentForm({
      paymentMethod: p.paymentMethod === "paypal" ? "paypal" : "bank",
      paymentFullName: p.paymentFullName || data.affiliate.fullName,
      paymentAddress: p.paymentAddress || "",
      paymentIban: p.paymentIban || "",
      paymentBankName: p.paymentBankName || "",
      paymentSwift: p.paymentSwift || "",
      paypalEmail: p.paypalEmail || data.affiliate.email,
    });
    setPaymentError("");
    setEditingPayment(true);
  }

  async function savePayment() {
    setSavingPayment(true);
    setPaymentError("");
    const res = await fetch("/api/affiliate/payment-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentForm),
    });
    const json = await res.json().catch(() => ({}));
    setSavingPayment(false);

    if (!res.ok) {
      setPaymentError(json.error || "Nu s-a putut salva. Încearcă din nou.");
      return;
    }

    setData((d) =>
      d
        ? {
            ...d,
            paymentInfo: {
              paymentMethod: paymentForm.paymentMethod,
              paymentFullName: paymentForm.paymentFullName,
              paymentAddress: paymentForm.paymentAddress,
              paymentIban: paymentForm.paymentMethod === "bank" ? paymentForm.paymentIban : null,
              paymentBankName: paymentForm.paymentMethod === "bank" ? paymentForm.paymentBankName : null,
              paymentSwift: paymentForm.paymentMethod === "bank" ? paymentForm.paymentSwift : null,
              paypalEmail: paymentForm.paymentMethod === "paypal" ? paymentForm.paypalEmail : null,
            },
          }
        : d
    );
    setEditingPayment(false);
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-alt">
        <p className="text-ink-muted">Se încarcă…</p>
      </div>
    );
  }

  const { affiliate, paymentInfo, stats, sales } = data;

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
            {editingLink ? (
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="whitespace-nowrap font-mono text-sm text-ink-muted">
                    {affiliate.referralLink.slice(
                      0,
                      affiliate.referralLink.length - affiliate.referralCode.length
                    )}
                  </span>
                  <input
                    type="text"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="flex-1 rounded-md border border-surface-muted px-3 py-2 font-mono text-sm text-ink focus:border-court focus:outline-none"
                    placeholder="numele-tau"
                    autoFocus
                  />
                </div>
                {linkError && <p className="mt-2 text-sm text-red-600">{linkError}</p>}
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={saveLink} disabled={savingLink}>
                    {savingLink ? "Se salvează…" : "Salvează"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingLink(false)}
                    disabled={savingLink}
                  >
                    <X className="mr-1 h-4 w-4" /> Renunță
                  </Button>
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  Doar litere mici, cifre și cratime. Dacă ai distribuit deja link-ul vechi, acela
                  va înceta să funcționeze.
                </p>
              </div>
            ) : (
              <>
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
                  <Button variant="outline" onClick={startEditingLink} className="shrink-0">
                    <Pencil className="mr-2 h-4 w-4" /> Editează
                  </Button>
                </div>
                <p className="mt-3 text-sm text-ink-muted">
                  Codul tău unic: <span className="font-semibold text-ink">{affiliate.referralCode}</span>
                  {" · "}Câștigi <span className="font-semibold text-ink">$30 (33.7%)</span> din fiecare
                  vânzare de $89 generată prin acest link.
                </p>
              </>
            )}
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
            icon={<Check className="h-5 w-5" />}
            label="Deja plătit"
            value={money(stats.totalPaidCents)}
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="În așteptare"
            value={money(stats.totalPendingCents)}
          />
          <StatCard
            icon={<MousePointerClick className="h-5 w-5" />}
            label="Click-uri pe link"
            value={String(stats.clicks)}
          />
        </div>

        {/* Payment info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Datele tale de plată</CardTitle>
          </CardHeader>
          <CardContent>
            {editingPayment ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentForm((f) => ({ ...f, paymentMethod: "bank" }))}
                    className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium ${
                      paymentForm.paymentMethod === "bank"
                        ? "border-court bg-court-soft text-court"
                        : "border-surface-muted text-ink-muted"
                    }`}
                  >
                    <Landmark className="h-4 w-4" /> Transfer bancar
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentForm((f) => ({ ...f, paymentMethod: "paypal" }))}
                    className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium ${
                      paymentForm.paymentMethod === "paypal"
                        ? "border-court bg-court-soft text-court"
                        : "border-surface-muted text-ink-muted"
                    }`}
                  >
                    <Wallet className="h-4 w-4" /> PayPal
                  </button>
                </div>

                <Field
                  label="Numele complet al titularului"
                  value={paymentForm.paymentFullName}
                  onChange={(v) => setPaymentForm((f) => ({ ...f, paymentFullName: v }))}
                  placeholder="Ion Popescu"
                />
                <Field
                  label="Adresă completă"
                  value={paymentForm.paymentAddress}
                  onChange={(v) => setPaymentForm((f) => ({ ...f, paymentAddress: v }))}
                  placeholder="Str. Exemplu nr. 1, București, România"
                />

                {paymentForm.paymentMethod === "bank" ? (
                  <>
                    <Field
                      label="IBAN"
                      value={paymentForm.paymentIban}
                      onChange={(v) => setPaymentForm((f) => ({ ...f, paymentIban: v }))}
                      placeholder="RO49AAAA1B31007593840000"
                      mono
                    />
                    <Field
                      label="Numele băncii"
                      value={paymentForm.paymentBankName}
                      onChange={(v) => setPaymentForm((f) => ({ ...f, paymentBankName: v }))}
                      placeholder="Banca Transilvania"
                    />
                    <Field
                      label="SWIFT / BIC (opțional, pentru plăți internaționale)"
                      value={paymentForm.paymentSwift}
                      onChange={(v) => setPaymentForm((f) => ({ ...f, paymentSwift: v }))}
                      placeholder="BTRLRO22"
                      mono
                    />
                  </>
                ) : (
                  <Field
                    label="Email PayPal"
                    value={paymentForm.paypalEmail}
                    onChange={(v) => setPaymentForm((f) => ({ ...f, paypalEmail: v }))}
                    placeholder="tu@email.com"
                    type="email"
                  />
                )}

                {paymentError && <p className="text-sm text-red-600">{paymentError}</p>}

                <div className="flex gap-2">
                  <Button size="sm" onClick={savePayment} disabled={savingPayment}>
                    {savingPayment ? "Se salvează…" : "Salvează datele"}
                  </Button>
                  {paymentInfo.paymentMethod && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingPayment(false)}
                      disabled={savingPayment}
                    >
                      <X className="mr-1 h-4 w-4" /> Renunță
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      {paymentInfo.paymentMethod === "paypal" ? (
                        <Wallet className="h-4 w-4 text-court" />
                      ) : (
                        <Landmark className="h-4 w-4 text-court" />
                      )}
                      {paymentInfo.paymentMethod === "paypal" ? "PayPal" : "Transfer bancar"}
                    </p>
                    <p className="text-ink-muted">{paymentInfo.paymentFullName}</p>
                    <p className="text-ink-muted">{paymentInfo.paymentAddress}</p>
                    {paymentInfo.paymentMethod === "paypal" ? (
                      <p className="text-ink-muted">{paymentInfo.paypalEmail}</p>
                    ) : (
                      <>
                        <p className="font-mono text-ink-muted">{paymentInfo.paymentIban}</p>
                        <p className="text-ink-muted">
                          {paymentInfo.paymentBankName}
                          {paymentInfo.paymentSwift ? ` · ${paymentInfo.paymentSwift}` : ""}
                        </p>
                      </>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={startEditingPayment} className="shrink-0">
                    <Pencil className="mr-2 h-4 w-4" /> Editează
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                      <th className="py-2 pr-4">Status</th>
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
                        <td className="py-3 pr-4">
                          {sale.paid_at ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-tennis-muted px-2 py-0.5 text-xs font-semibold text-tennis-dark">
                              <Check className="h-3 w-3" /> Plătit
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">
                              <Clock className="h-3 w-3" /> În așteptare
                            </span>
                          )}
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  mono,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border border-surface-muted px-3 py-2 text-sm text-ink focus:border-court focus:outline-none ${
          mono ? "font-mono" : ""
        }`}
      />
    </label>
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
