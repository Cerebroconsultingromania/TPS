#!/usr/bin/env node
/** Generates local SVG tennis placeholders in public/images/ */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

function svgHeroParallax() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="45%" stop-color="#1A56DB"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="25%" r="50%">
      <stop offset="0%" stop-color="#CCFF00" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#CCFF00" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#sky)"/>
  <rect width="1920" height="1080" fill="url(#glow)"/>
  <g opacity="0.4" stroke="#fff" fill="none" stroke-width="6">
    <rect x="280" y="80" width="1360" height="920" rx="8"/>
    <line x1="960" y1="80" x2="960" y2="1000"/>
    <line x1="280" y1="540" x2="1640" y2="540"/>
    <rect x="760" y="80" width="400" height="200" stroke-width="4"/>
    <rect x="760" y="800" width="400" height="200" stroke-width="4"/>
  </g>
  <ellipse cx="520" cy="320" rx="18" ry="18" fill="#CCFF00" opacity="0.9"/>
  <text x="960" y="1040" text-anchor="middle" fill="#fff" opacity="0.25" font-family="system-ui,sans-serif" font-size="32" letter-spacing="8">BLUE COURT · PARALLAX</text>
</svg>`;
}

function svgCard(title, color1, color2) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="620" cy="140" r="28" fill="#CCFF00" opacity="0.85"/>
  <rect x="120" y="380" width="360" height="8" rx="4" fill="#fff" opacity="0.35" transform="rotate(-25 300 384)"/>
  <ellipse cx="480" cy="420" rx="22" ry="22" fill="#CCFF00"/>
  <text x="40" y="560" fill="#fff" font-family="system-ui,sans-serif" font-size="28" font-weight="700">${title}</text>
</svg>`;
}

const FILES = {
  "hero-parallax.svg": svgHeroParallax(),
  "court-blue.svg": svgHeroParallax(),
  "junior-girl.svg": svgCard("JUNIOR TENNIS", "#1A56DB", "#1E40AF"),
  "junior-match.svg": svgCard("MATCH PLAY", "#2563EB", "#1D4ED8"),
  "junior-group.svg": svgCard("JUNIOR ACADEMY", "#1E40AF", "#1A56DB"),
  "racket-court.svg": svgCard("ON COURT", "#3B82F6", "#1A56DB"),
  "tennis-action.svg": svgCard("COURT SPEED", "#1D4ED8", "#2563EB"),
  "coach-juniors.svg": svgCard("COACH + JUNIORS", "#1A56DB", "#312E81"),
};

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const [name, content] of Object.entries(FILES)) {
    await writeFile(path.join(OUT, name), content);
    console.log("✓", name);
  }
}

main();
