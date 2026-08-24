"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdminMediaEditor } from "@/components/admin/AdminMediaEditor";
import { AdminAnalyticsDashboard } from "@/components/admin/AdminAnalyticsDashboard";
import { LogOut, ExternalLink, ImageIcon, BarChart3 } from "lucide-react";

type Tab = "media" | "analytics";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("media");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-surface-alt font-sans">
      <header className="sticky top-0 z-50 border-b border-surface-muted bg-white/95 shadow-soft backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-court">
              TPDS Admin
            </p>
            <h1 className="font-display text-lg font-bold text-ink lg:text-xl">
              Panou Administrator
            </h1>
          </div>

          <nav className="flex rounded-lg border border-surface-muted bg-surface-alt p-1">
            <button
              type="button"
              onClick={() => setTab("media")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === "media"
                  ? "bg-white text-court shadow-soft"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Media
            </button>
            <button
              type="button"
              onClick={() => setTab("analytics")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === "analytics"
                  ? "bg-white text-court shadow-soft"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Analitice
            </button>
          </nav>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank">
                <ExternalLink className="mr-1 h-4 w-4" />
                Vezi site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {tab === "media" ? <AdminMediaEditor embedded /> : <AdminAnalyticsDashboard />}
    </div>
  );
}
