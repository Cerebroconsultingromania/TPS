"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalyticsStore } from "@/lib/analytics-types";
import { HEATMAP_COLS, HEATMAP_ROWS } from "@/lib/analytics-types";
import {
  BarChart3,
  MousePointerClick,
  Users,
  Eye,
  Timer,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Eye;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-surface-muted bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
          {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
        </div>
        <div className="rounded-lg bg-court-soft p-2.5">
          <Icon className="h-5 w-5 text-court" />
        </div>
      </div>
    </div>
  );
}

function formatMs(ms: number) {
  if (ms < 1000) return `${ms}ms`;
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function topEntries(map: Record<string, number>, limit = 8) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export function AdminAnalyticsDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsStore | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/analytics");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    setData(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-court" />
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayStats = data.daily[today];
  const maxHeat = Math.max(1, ...data.heatmap.flat());
  const maxSectionTime = Math.max(
    1,
    ...Object.values(data.sections).map((s) => s.totalTimeMs)
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Analitice site</h2>
          <p className="text-sm text-ink-muted">
            Vizitatori, timp pe secțiuni, click-uri și heatmap — similar Shopify Analytics.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="mr-1 h-4 w-4" />
          Reîncarcă date
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Eye}
          label="Vizualizări (total)"
          value={data.totals.pageViews}
          sub={`Azi: ${todayStats?.views ?? 0}`}
        />
        <StatCard
          icon={Users}
          label="Sesiuni (total)"
          value={data.totals.sessions}
          sub={`Azi: ${todayStats?.sessions ?? 0}`}
        />
        <StatCard
          icon={MousePointerClick}
          label="Click-uri (total)"
          value={data.totals.clicks}
          sub={`Azi: ${todayStats?.clicks ?? 0}`}
        />
        <StatCard
          icon={BarChart3}
          label="Secțiuni urmărite"
          value={Object.keys(data.sections).length}
          sub={`${data.totals.sectionViews} impresii secțiune`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-surface-muted bg-white p-6 shadow-soft">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <Timer className="h-5 w-5 text-court" />
            Timp pe secțiune (hot spots)
          </h3>
          <p className="mt-1 text-xs text-ink-muted">
            Cât stau vizitatorii pe fiecare zonă a homepage-ului.
          </p>
          <div className="mt-6 space-y-3">
            {Object.entries(data.sections)
              .sort((a, b) => b[1].totalTimeMs - a[1].totalTimeMs)
              .slice(0, 10)
              .map(([name, s]) => (
                <div key={name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium capitalize text-ink">
                      {name.replace(/-/g, " ")}
                    </span>
                    <span className="text-ink-muted">
                      {formatMs(s.avgTimeMs)} mediu · {s.impressions} viz
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-alt">
                    <div
                      className="h-full rounded-full bg-court transition-all"
                      style={{
                        width: `${Math.round((s.totalTimeMs / maxSectionTime) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            {Object.keys(data.sections).length === 0 && (
              <p className="text-sm text-ink-muted">
                Nu există date încă. Vizitează homepage-ul public câteva minute.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-surface-muted bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-ink">Top pagini</h3>
          <div className="mt-4 space-y-2">
            {topEntries(
              Object.fromEntries(
                Object.entries(data.pages).map(([p, v]) => [p, v.views])
              )
            ).map(([path, views]) => (
              <div
                key={path}
                className="flex items-center justify-between rounded-lg bg-surface-alt px-3 py-2 text-sm"
              >
                <span className="font-medium text-ink">{path}</span>
                <span className="text-ink-muted">
                  {views} viz ·{" "}
                  {formatMs(data.pages[path]?.avgTimeMs ?? 0)} mediu
                </span>
              </div>
            ))}
            {Object.keys(data.pages).length === 0 && (
              <p className="text-sm text-ink-muted">Nicio vizită înregistrată.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-surface-muted bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-ink">Top click-uri</h3>
          <p className="mt-1 text-xs text-ink-muted">Butoane și link-uri apăsate cel mai des.</p>
          <ul className="mt-4 space-y-2">
            {topEntries(data.clicks).map(([label, count]) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-lg border border-surface-muted px-3 py-2 text-sm"
              >
                <span className="line-clamp-1 text-ink">{label}</span>
                <span className="shrink-0 font-semibold text-court">{count}</span>
              </li>
            ))}
            {Object.keys(data.clicks).length === 0 && (
              <li className="text-sm text-ink-muted">Niciun click încă.</li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-surface-muted bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-ink">Scroll depth</h3>
          <p className="mt-1 text-xs text-ink-muted">
            Câți vizitatori ajung la 25%, 50%, 75%, 100% din pagină.
          </p>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {["25", "50", "75", "100"].map((d) => (
              <div key={d} className="rounded-lg bg-court-soft p-4 text-center">
                <p className="font-display text-2xl font-bold text-court">
                  {data.scrollDepth[d] ?? 0}
                </p>
                <p className="text-xs text-ink-muted">{d}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-surface-muted bg-white p-6 shadow-soft">
        <h3 className="font-display text-lg font-bold text-ink">
          Heatmap click-uri (mouse hot spots)
        </h3>
        <p className="mt-1 text-xs text-ink-muted">
          Zonele unde utilizatorii dau click cel mai des (viewport normalizat).
        </p>
        <div
          className="mt-6 overflow-hidden rounded-lg border border-surface-muted bg-surface-alt"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${HEATMAP_COLS}, 1fr)`,
            aspectRatio: `${HEATMAP_COLS}/${HEATMAP_ROWS}`,
          }}
        >
          {data.heatmap.flatMap((row, ri) =>
            row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                title={`${cell} click-uri`}
                style={{
                  backgroundColor: `rgba(26, 86, 219, ${cell / maxHeat})`,
                }}
              />
            ))
          )}
        </div>
      </div>

      <p className="text-center text-xs text-ink-muted">
        Ultima actualizare: {new Date(data.updatedAt).toLocaleString("ro-RO")}
      </p>
    </div>
  );
}
