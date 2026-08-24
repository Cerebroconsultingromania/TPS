import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { PageImages, SiteMedia, StarAthleteImages } from "@/lib/media-types";
import defaultMedia from "../../data/site-media.json";

const MEDIA_PATH = path.join(process.cwd(), "data", "site-media.json");

export const defaultSiteMedia = defaultMedia as SiteMedia;

export function normalizeSiteMedia(raw: SiteMedia): SiteMedia {
  const pages: PageImages = raw.pages ?? {
    about: {
      hero: raw.author,
      portrait: raw.author,
    },
    system: { hero: raw.systemPageHero ?? raw.hero.main },
    blog: { hero: raw.hero.main },
    videoLibrary: { hero: raw.hero.main },
    affiliate: { hero: raw.parallaxBand ?? raw.hero.main },
  };

  const star: StarAthleteImages = raw.star ?? {
    portraitBlue: "/images/brand/star-trophy-blue.png",
    portraitWinner: "/images/brand/star-trophy-winner.png",
    goldTrophy: "/images/brand/star-gold-trophy.png",
    duo: "/images/brand/star-duo.png",
  };

  return {
    ...raw,
    pages,
    star,
    systemPageHero: pages.system.hero,
  };
}

export async function getSiteMedia(): Promise<SiteMedia> {
  try {
    const raw = await readFile(MEDIA_PATH, "utf-8");
    return normalizeSiteMedia(JSON.parse(raw) as SiteMedia);
  } catch {
    return normalizeSiteMedia(defaultSiteMedia);
  }
}

export async function saveSiteMedia(media: SiteMedia): Promise<void> {
  const normalized = normalizeSiteMedia({
    ...media,
    systemPageHero: media.pages.system.hero,
    author: media.author,
  });
  await writeFile(MEDIA_PATH, `${JSON.stringify(normalized, null, 2)}\n`, "utf-8");
}

export function getBlogImage(media: SiteMedia, slug: string): string {
  return media.blog.find((b) => b.slug === slug)?.image ?? media.hero.main;
}

export function getVideoCategoryMedia(
  media: SiteMedia,
  id: string
): { image: string; videoUrl: string } {
  const cat = media.videoCategories.find((c) => c.id === id);
  return {
    image: cat?.image ?? media.hero.main,
    videoUrl: cat?.videoUrl ?? "",
  };
}
