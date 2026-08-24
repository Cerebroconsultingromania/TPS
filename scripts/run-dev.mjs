#!/usr/bin/env node
/**
 * Pornește site-ul în mod development pe 3006.
 * - Eliberează automat portul dacă e ocupat
 * - Reîncarcă singur la modificări (fără build/restart manual)
 */
import { spawn, execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const PORT = process.env.PORT || "3006";
const HOST = "127.0.0.1";

console.log("");
console.log("  TPDS — Tennis Performance Development System");
console.log("  ─────────────────────────────────────────────");
console.log(`  Pornesc server development pe http://${HOST}:${PORT}`);
console.log("  Lasă acest terminal DESCHIS. Nu e nevoie de restart.");
console.log("  Oprești cu Ctrl+C când ai terminat.");
console.log("");

try {
  execSync(`node scripts/free-port.mjs ${PORT}`, { cwd: root, stdio: "inherit" });
} catch {
  process.exit(1);
}

const env = {
  ...process.env,
  WATCHPACK_POLLING: "true",
};

const child = spawn(
  "npx",
  ["next", "dev", "-H", HOST, "-p", PORT],
  { cwd: root, env, stdio: "inherit", shell: true }
);

child.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => {
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});
