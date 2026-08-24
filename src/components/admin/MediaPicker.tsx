"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Loader2 } from "lucide-react";

export function MediaPicker({
  label,
  value,
  onChange,
  hint,
  aspect = "video",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  aspect?: "video" | "square" | "portrait";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[3/4]"
        : "aspect-video";

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload eșuat");
        onChange(data.url);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload eșuat");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  return (
    <div className="overflow-hidden rounded-xl border border-surface-muted bg-white shadow-soft transition-shadow hover:shadow-card">
      <div className={`relative ${aspectClass} bg-surface-alt`}>
        {value ? (
          <Image src={value} alt={label} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-ink-light">
            <ImageIcon className="h-10 w-10 opacity-40" />
            <span className="text-xs">Nicio imagine</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Loader2 className="h-8 w-8 animate-spin text-court" />
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-sm font-semibold text-ink">{label}</p>
          {hint && <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
        />

        <Button
          type="button"
          size="sm"
          className="bg-court text-white hover:bg-court-dark"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-4 w-4" />
          {uploading ? "Se încarcă…" : "Browse / Upload"}
        </Button>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sau lipește URL /images/..."
          className="w-full rounded-lg border border-surface-muted px-3 py-2 text-xs text-ink outline-none focus:border-court focus:ring-1 focus:ring-court/30"
        />

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
