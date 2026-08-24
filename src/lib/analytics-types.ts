export type AnalyticsEventType =
  | "page_view"
  | "click"
  | "section_time"
  | "scroll_depth"
  | "pointer";

export type AnalyticsEvent = {
  type: AnalyticsEventType;
  path: string;
  sessionId: string;
  ts: number;
  section?: string;
  durationMs?: number;
  depth?: number;
  label?: string;
  href?: string;
  /** 0–100 viewport percent */
  x?: number;
  y?: number;
};

export type AnalyticsStore = {
  updatedAt: string;
  totals: {
    pageViews: number;
    sessions: number;
    clicks: number;
    sectionViews: number;
  };
  daily: Record<string, { views: number; sessions: number; clicks: number }>;
  pages: Record<string, { views: number; avgTimeMs: number; totalTimeMs: number }>;
  sections: Record<
    string,
    { impressions: number; totalTimeMs: number; avgTimeMs: number }
  >;
  clicks: Record<string, number>;
  outbound: Record<string, number>;
  scrollDepth: Record<string, number>;
  heatmap: number[][];
  recentSessions: { id: string; firstSeen: string; lastPath: string; events: number }[];
};

export const HEATMAP_COLS = 24;
export const HEATMAP_ROWS = 14;

export function emptyAnalyticsStore(): AnalyticsStore {
  return {
    updatedAt: new Date().toISOString(),
    totals: { pageViews: 0, sessions: 0, clicks: 0, sectionViews: 0 },
    daily: {},
    pages: {},
    sections: {},
    clicks: {},
    outbound: {},
    scrollDepth: { "25": 0, "50": 0, "75": 0, "100": 0 },
    heatmap: Array.from({ length: HEATMAP_ROWS }, () =>
      Array.from({ length: HEATMAP_COLS }, () => 0)
    ),
    recentSessions: [],
  };
}
