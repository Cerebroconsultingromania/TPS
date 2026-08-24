"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MediaPicker } from "@/components/admin/MediaPicker";
import type { SiteMedia } from "@/lib/media-types";
import {
  Save,
  LogOut,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  Loader2,
} from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Hero homepage" },
  { id: "parallax", label: "Parallax teren albastru" },
  { id: "gallery", label: "Galerie hero" },
  { id: "sections", label: "Secțiuni homepage" },
  { id: "video", label: "Video library" },
  { id: "star", label: "Star athlete" },
  { id: "author", label: "Autor" },
  { id: "site-pages", label: "Pagini site" },
  { id: "blog", label: "Blog" },
] as const;

const SITE_PAGES = [
  { key: "about" as const, route: "/about", label: "Despre (About)" },
  { key: "system" as const, route: "/system", label: "System" },
  { key: "blog" as const, route: "/blog", label: "Blog" },
  { key: "videoLibrary" as const, route: "/video-library", label: "Video Library" },
  { key: "affiliate" as const, route: "/affiliate", label: "Affiliate" },
];

function Panel({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-surface-muted bg-white p-6 shadow-soft lg:p-8"
    >
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function AdminMediaEditor({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const [media, setMedia] = useState<SiteMedia | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState<string>("hero");

  async function load() {
    const res = await fetch("/api/admin/media");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    setMedia(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!media) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [media]);

  async function save() {
    if (!media) return;
    setSaving(true);
    setStatus("");
    const payload = {
      ...media,
      systemPageHero: media.pages.system.hero,
      author: media.author,
    };
    const res = await fetch("/api/admin/media", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setStatus(res.ok ? "✓ Salvat! Reîncarcă site-ul public (Cmd+Shift+R)." : "Eroare la salvare.");
    if (res.ok) router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (!media) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-court" />
      </div>
    );
  }

  const setHero = (key: keyof SiteMedia["hero"], value: string) =>
    setMedia({ ...media, hero: { ...media.hero, [key]: value } });

  const setPageHero = (page: keyof SiteMedia["pages"], value: string) => {
    const pages = {
      ...media.pages,
      [page]: { ...media.pages[page], hero: value },
    };
    setMedia({
      ...media,
      pages,
      ...(page === "system" ? { systemPageHero: value } : {}),
    });
  };

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={load}>
        <RefreshCw className="mr-1 h-4 w-4" />
        Reîncarcă
      </Button>
      {!embedded && (
        <>
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
        </>
      )}
      <Button size="sm" onClick={save} disabled={saving} className="bg-court hover:bg-court-dark">
        <Save className="mr-1 h-4 w-4" />
        {saving ? "Salvez…" : "Salvează tot"}
      </Button>
    </div>
  );

  return (
    <div className={embedded ? "" : "min-h-screen bg-surface-alt font-sans"}>
      {!embedded && (
        <header className="sticky top-0 z-50 border-b border-surface-muted bg-white/95 shadow-soft backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-court">
                TPDS Admin
              </p>
              <h1 className="font-display text-lg font-bold text-ink lg:text-xl">
                Media Manager
              </h1>
            </div>
            {toolbar}
          </div>
          {status && (
            <p className="border-t border-surface-muted bg-court-soft px-4 py-2 text-center text-sm text-court lg:px-8">
              {status}
            </p>
          )}
        </header>
      )}

      {embedded && (
        <div className="border-b border-surface-muted bg-white px-4 py-3 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-muted">
              Browse / Upload pentru toate imaginile site-ului
            </p>
            {toolbar}
          </div>
          {status && (
            <p className="mx-auto mt-2 max-w-7xl text-center text-sm text-court">{status}</p>
          )}
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1 rounded-xl border border-surface-muted bg-white p-3 shadow-soft">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ink-muted">
              Secțiuni
            </p>
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === id
                    ? "bg-court-soft font-semibold text-court"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                }`}
              >
                {label}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-8">
          <Panel
            id="hero"
            title="Hero — fotografii tenis juniori"
            description="Fundal principal + cadre laterale. Folosește Browse pentru poze de pe calculator."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <MediaPicker
                label="Imagine principală hero"
                value={media.hero.main}
                onChange={(v) => setHero("main", v)}
                hint="Antrenament junior pe teren"
              />
              {(
                [
                  ["leftTop", "Cadru stânga sus"],
                  ["leftBottom", "Cadru stânga jos"],
                  ["rightTop", "Cadru dreapta sus"],
                  ["rightBottom", "Cadru dreapta jos"],
                ] as const
              ).map(([key, label]) => (
                <MediaPicker
                  key={key}
                  label={label}
                  value={media.hero[key]}
                  onChange={(v) => setHero(key, v)}
                  aspect="square"
                />
              ))}
            </div>
          </Panel>

          <Panel
            id="parallax"
            title="Bandă parallax — teren albastru"
            description="Singura secțiune full-width cu teren albastru aerian (sub hero)."
          >
            <div className="max-w-xl">
              <MediaPicker
                label="Imagine parallax albastru"
                value={media.parallaxBand}
                onChange={(v) => setMedia({ ...media, parallaxBand: v })}
              />
            </div>
          </Panel>

          <Panel id="gallery" title="Galerie hero (jos)" description="4 categorii vizibile sub hero.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {media.gallery.map((item, i) => (
                <MediaPicker
                  key={item.label}
                  label={item.label}
                  value={item.src}
                  onChange={(v) => {
                    const gallery = [...media.gallery];
                    gallery[i] = { ...gallery[i], src: v };
                    setMedia({ ...media, gallery });
                  }}
                  aspect="video"
                />
              ))}
            </div>
          </Panel>

          <Panel id="sections" title="Secțiuni homepage" description="Problem, Solution, Programs, Manual.">
            {(
              [
                ["problem", "Problem (3 imagini)"],
                ["solution", "Solution (5 imagini)"],
                ["programs", "Programs (3 imagini)"],
              ] as const
            ).map(([key, title]) => (
              <div key={key} className="mb-8 last:mb-0">
                <h3 className="mb-3 text-sm font-bold text-court">{title}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {media[key].map((src, i) => (
                    <MediaPicker
                      key={`${key}-${i}`}
                      label={`Imagine ${i + 1}`}
                      value={src}
                      onChange={(v) => {
                        const arr = [...media[key]];
                        arr[i] = v;
                        setMedia({ ...media, [key]: arr });
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 className="mb-3 text-sm font-bold text-court">Manual (5 imagini)</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  Object.entries(media.manual) as [keyof SiteMedia["manual"], string][]
                ).map(([key, src]) => (
                  <MediaPicker
                    key={key}
                    label={key}
                    value={src}
                    onChange={(v) =>
                      setMedia({ ...media, manual: { ...media.manual, [key]: v } })
                    }
                  />
                ))}
              </div>
            </div>
          </Panel>

          <Panel id="video" title="Video Library" description="Imagine + URL video opțional per categorie.">
            <div className="grid gap-6 lg:grid-cols-2">
              {media.videoCategories.map((cat, i) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-surface-muted bg-surface-alt/50 p-4"
                >
                  <p className="mb-3 font-display text-sm font-bold capitalize text-court">
                    {cat.id.replace(/-/g, " ")}
                  </p>
                  <MediaPicker
                    label="Imagine categorie"
                    value={cat.image}
                    onChange={(v) => {
                      const videoCategories = [...media.videoCategories];
                      videoCategories[i] = { ...videoCategories[i], image: v };
                      setMedia({ ...media, videoCategories });
                    }}
                  />
                  <label className="mt-3 block">
                    <span className="text-xs font-medium text-ink-muted">URL video (opțional)</span>
                    <input
                      value={cat.videoUrl}
                      onChange={(e) => {
                        const videoCategories = [...media.videoCategories];
                        videoCategories[i] = { ...videoCategories[i], videoUrl: e.target.value };
                        setMedia({ ...media, videoCategories });
                      }}
                      placeholder="YouTube, Vimeo sau .mp4"
                      className="mt-1 w-full rounded-lg border border-surface-muted px-3 py-2 text-sm outline-none focus:border-court"
                    />
                  </label>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            id="star"
            title="Star athlete — imagini exacte"
            description="Tânăra sportivă (starul sistemului). Păstrează fotografiile așa cum sunt."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {(
                [
                  ["portraitBlue", "Portret trofeu lemn (fundal albastru)"],
                  ["portraitWinner", "Portret Winner U14"],
                  ["goldTrophy", "Trofeu aur — Bradfield"],
                  ["duo", "Duo / momente turneu"],
                ] as const
              ).map(([key, label]) => (
                <MediaPicker
                  key={key}
                  label={label}
                  value={media.star[key]}
                  onChange={(v) =>
                    setMedia({
                      ...media,
                      star: { ...media.star, [key]: v },
                    })
                  }
                  aspect={key === "goldTrophy" || key === "duo" ? "video" : "portrait"}
                />
              ))}
            </div>
          </Panel>

          <Panel id="author" title="Autor (homepage + About)">
            <div className="max-w-md">
              <MediaPicker
                label="Foto autor"
                value={media.author}
                onChange={(v) =>
                  setMedia({
                    ...media,
                    author: v,
                    pages: {
                      ...media.pages,
                      about: { ...media.pages.about, portrait: v },
                    },
                  })
                }
                aspect="portrait"
                hint="Folosită pe homepage și pagina About"
              />
            </div>
          </Panel>

          <Panel
            id="site-pages"
            title="Hero pagini site"
            description="Imagine de fundal pentru fiecare pagină internă. Preview rapid:"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {SITE_PAGES.map(({ route, label }) => (
                <Link
                  key={route}
                  href={route}
                  target="_blank"
                  className="rounded-lg border border-surface-muted px-3 py-1.5 text-xs font-medium text-court hover:bg-court-soft"
                >
                  {label} →
                </Link>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {SITE_PAGES.map(({ key, label, route }) => (
                <div key={key} className="relative">
                  <MediaPicker
                    label={`Hero — ${label}`}
                    value={media.pages[key].hero}
                    onChange={(v) => setPageHero(key, v)}
                    hint={route}
                  />
                </div>
              ))}
              <MediaPicker
                label="About — portret (pagină Despre)"
                value={media.pages.about.portrait}
                onChange={(v) =>
                  setMedia({
                    ...media,
                    author: v,
                    pages: {
                      ...media.pages,
                      about: { ...media.pages.about, portrait: v },
                    },
                  })
                }
                aspect="portrait"
              />
            </div>
          </Panel>

          <Panel id="blog" title="Blog — imagini articole">
            <div className="grid gap-4 md:grid-cols-2">
              {media.blog.map((post, i) => (
                <MediaPicker
                  key={post.slug}
                  label={post.slug.replace(/-/g, " ")}
                  value={post.image}
                  onChange={(v) => {
                    const blog = [...media.blog];
                    blog[i] = { ...blog[i], image: v };
                    setMedia({ ...media, blog });
                  }}
                />
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
