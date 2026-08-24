"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AnalyticsEvent } from "@/lib/analytics-types";

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("tpds_sid");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem("tpds_sid", id);
  }
  return id;
}

function flush(events: AnalyticsEvent[]) {
  if (!events.length) return;
  const payload = JSON.stringify({ events });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics/collect",
      new Blob([payload], { type: "application/json" })
    );
  } else {
    fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const queue = useRef<AnalyticsEvent[]>([]);
  const scrollMarks = useRef<Set<number>>(new Set());
  const sectionTimers = useRef<Map<string, { start: number; visible: boolean }>>(
    new Map()
  );

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const sessionId = getSessionId();
    queue.current.push({
      type: "page_view",
      path: pathname,
      sessionId,
      ts: Date.now(),
    });

    scrollMarks.current = new Set();

    const flushInterval = setInterval(() => {
      if (queue.current.length) {
        flush([...queue.current]);
        queue.current = [];
      }
    }, 4000);

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const link = t.closest("a,button,[role='button']") as HTMLElement | null;
      const label =
        link?.getAttribute("data-analytics-label") ||
        link?.textContent?.trim().slice(0, 80) ||
        t.textContent?.trim().slice(0, 40) ||
        "click";
      const href = (link as HTMLAnchorElement | null)?.href;
      queue.current.push({
        type: "click",
        path: pathname,
        sessionId,
        ts: Date.now(),
        label,
        href: href?.startsWith(window.location.origin) ? undefined : href,
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = Math.round((window.scrollY / h) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          queue.current.push({
            type: "scroll_depth",
            path: pathname,
            sessionId,
            ts: Date.now(),
            depth: mark,
          });
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        for (const entry of entries) {
          const section = (entry.target as HTMLElement).dataset.analyticsSection;
          if (!section) continue;
          const state = sectionTimers.current.get(section) ?? {
            start: now,
            visible: false,
          };
          if (entry.isIntersecting && !state.visible) {
            state.visible = true;
            state.start = now;
          } else if (!entry.isIntersecting && state.visible) {
            state.visible = false;
            const durationMs = now - state.start;
            if (durationMs > 800) {
              queue.current.push({
                type: "section_time",
                path: pathname,
                sessionId,
                ts: now,
                section,
                durationMs,
              });
            }
          }
          sectionTimers.current.set(section, state);
        }
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll("[data-analytics-section]").forEach((el) => {
      observer.observe(el);
    });

    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onHide = () => {
      const now = Date.now();
      sectionTimers.current.forEach((state, section) => {
        if (state.visible) {
          const durationMs = now - state.start;
          if (durationMs > 800) {
            queue.current.push({
              type: "section_time",
              path: pathname,
              sessionId,
              ts: now,
              section,
              durationMs,
            });
          }
        }
      });
      flush([...queue.current]);
      queue.current = [];
    };

    window.addEventListener("pagehide", onHide);

    return () => {
      clearInterval(flushInterval);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onHide);
      observer.disconnect();
      onHide();
    };
  }, [pathname]);

  return null;
}
