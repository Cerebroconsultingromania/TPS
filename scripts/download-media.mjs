#!/usr/bin/env node
/**
 * Downloads tennis-only images to public/images/
 * Run: node scripts/download-media.mjs
 */
import { mkdir, writeFile } from "fs/promises";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "images");

const FILES = {
  "hero-parallax.jpg":
    "https://images.pexels.com/photos/5739494/pexels-photo-5739494.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "court-blue.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tennis_court_at_the_Indian_Wells_Masters.jpg/1920px-Tennis_court_at_the_Indian_Wells_Masters.jpg",
  "junior-girl.jpg":
    "https://images.pexels.com/photos/8224492/pexels-photo-8224492.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "junior-match.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Taylor_Townsend_tennis.jpg/1280px-Taylor_Townsend_tennis.jpg",
  "junior-group.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Children%27s_tennis_group%2C_Anguilla_%287457275146%29.jpg/1280px-Children%27s_tennis_group%2C_Anguilla_%287457275146%29.jpg",
  "racket-court.jpg":
    "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1200&q=80",
  "tennis-action.jpg":
    "https://images.pexels.com/photos/3666119/pexels-photo-3666119.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "coach-juniors.jpg":
    "https://images.pexels.com/photos/6284875/pexels-photo-6284875.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

async function download(name, url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "TPDS-Media-Setup/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const dest = path.join(OUT, name);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log("✓", name);
}

/** Fallback SVG — blue court parallax if download fails */
async function writeFallbackSvg() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E40AF"/>
      <stop offset="50%" style="stop-color:#1A56DB"/>
      <stop offset="100%" style="stop-color:#2563EB"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#g)"/>
  <rect x="360" y="120" width="1200" height="840" fill="none" stroke="white" stroke-width="8" opacity="0.35"/>
  <line x1="960" y1="120" x2="960" y2="960" stroke="white" stroke-width="4" opacity="0.25"/>
  <line x1="360" y1="540" x2="1560" y2="540" stroke="white" stroke-width="4" opacity="0.25"/>
  <text x="960" y="1000" text-anchor="middle" fill="white" opacity="0.2" font-family="sans-serif" font-size="48">TENNIS COURT</text>
</svg>`;
  await writeFile(path.join(OUT, "hero-parallax-fallback.svg"), svg);
  console.log("✓ hero-parallax-fallback.svg (fallback)");
}

async function main() {
  await mkdir(OUT, { recursive: true });
  let ok = 0;
  for (const [name, url] of Object.entries(FILES)) {
    try {
      await download(name, url);
      ok++;
    } catch (e) {
      console.warn("✗", name, e.message);
    }
  }
  await writeFallbackSvg();
  console.log(`\nDone: ${ok}/${Object.keys(FILES).length} images downloaded → public/images/`);
}

main();
