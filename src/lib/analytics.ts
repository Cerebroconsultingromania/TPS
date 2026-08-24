import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { AnalyticsEvent, AnalyticsStore } from "@/lib/analytics-types";
import {
  emptyAnalyticsStore,
  HEATMAP_COLS,
  HEATMAP_ROWS,
} from "@/lib/analytics-types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "analytics.json");

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function bumpHeatmap(store: AnalyticsStore, x?: number, y?: number) {
  if (x == null || y == null) return;
  const col = Math.min(HEATMAP_COLS - 1, Math.max(0, Math.floor((x / 100) * HEATMAP_COLS)));
  const row = Math.min(HEATMAP_ROWS - 1, Math.max(0, Math.floor((y / 100) * HEATMAP_ROWS)));
  store.heatmap[row][col] += 1;
}

function ensureDaily(store: AnalyticsStore, day: string) {
  if (!store.daily[day]) {
    store.daily[day] = { views: 0, sessions: 0, clicks: 0 };
  }
  return store.daily[day];
}

export async function getAnalyticsStore(): Promise<AnalyticsStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as AnalyticsStore;
    if (!parsed.heatmap?.length) return emptyAnalyticsStore();
    return parsed;
  } catch {
    return emptyAnalyticsStore();
  }
}

export async function recordAnalyticsEvents(events: AnalyticsEvent[]): Promise<void> {
  if (!events.length) return;

  await mkdir(DATA_DIR, { recursive: true });
  const store = await getAnalyticsStore();
  const day = todayKey();
  const daily = ensureDaily(store, day);

  for (const ev of events) {
    const page = store.pages[ev.path] ?? {
      views: 0,
      totalTimeMs: 0,
      avgTimeMs: 0,
    };

    let existing = store.recentSessions.find((s) => s.id === ev.sessionId.slice(0, 8));
    if (!existing) {
      existing = {
        id: ev.sessionId.slice(0, 8),
        firstSeen: new Date(ev.ts).toISOString(),
        lastPath: ev.path,
        events: 0,
      };
      store.recentSessions.unshift(existing);
      if (ev.type === "page_view") {
        store.totals.sessions += 1;
        daily.sessions += 1;
      }
    }
    existing.events += 1;
    existing.lastPath = ev.path;

    switch (ev.type) {
      case "page_view": {
        store.totals.pageViews += 1;
        daily.views += 1;
        page.views += 1;
        break;
      }
      case "section_time": {
        if (!ev.section || !ev.durationMs) break;
        store.totals.sectionViews += 1;
        const sec = store.sections[ev.section] ?? {
          impressions: 0,
          totalTimeMs: 0,
          avgTimeMs: 0,
        };
        sec.impressions += 1;
        sec.totalTimeMs += ev.durationMs;
        sec.avgTimeMs = Math.round(sec.totalTimeMs / sec.impressions);
        store.sections[ev.section] = sec;
        page.totalTimeMs += ev.durationMs;
        page.avgTimeMs = page.views
          ? Math.round(page.totalTimeMs / page.views)
          : page.totalTimeMs;
        break;
      }
      case "click": {
        store.totals.clicks += 1;
        daily.clicks += 1;
        const key = ev.label || ev.href || "unknown";
        store.clicks[key] = (store.clicks[key] ?? 0) + 1;
        if (ev.href?.startsWith("http")) {
          store.outbound[ev.href] = (store.outbound[ev.href] ?? 0) + 1;
        }
        bumpHeatmap(store, ev.x, ev.y);
        break;
      }
      case "pointer": {
        bumpHeatmap(store, ev.x, ev.y);
        break;
      }
      case "scroll_depth": {
        if (ev.depth == null) break;
        const k = String(ev.depth);
        store.scrollDepth[k] = (store.scrollDepth[k] ?? 0) + 1;
        break;
      }
    }

    store.pages[ev.path] = page;
  }

  store.recentSessions = store.recentSessions.slice(0, 50);
  store.updatedAt = new Date().toISOString();

  await writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf-8");
}
