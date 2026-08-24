#!/usr/bin/env node
/**
 * Eliberează un port TCP (Mac/Linux).
 * Usage: node scripts/free-port.mjs 3006
 */
import { execSync, spawnSync } from "child_process";

const port = process.argv[2];
if (!port) {
  console.error("Usage: node scripts/free-port.mjs <port>");
  process.exit(1);
}

try {
  const pids = execSync(`lsof -t -iTCP:${port} -sTCP:LISTEN 2>/dev/null`, {
    encoding: "utf8",
  })
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (pids.length === 0) {
    console.log(`Port ${port} — deja liber.`);
    process.exit(0);
  }

  for (const pid of pids) {
    try {
      process.kill(Number(pid), "SIGTERM");
      console.log(`Oprit proces ${pid} pe portul ${port}`);
    } catch {
      try {
        process.kill(Number(pid), "SIGKILL");
      } catch {
        /* ignore */
      }
    }
  }

  spawnSync("sleep", ["1"]);

  const still = execSync(`lsof -t -iTCP:${port} -sTCP:LISTEN 2>/dev/null`, {
    encoding: "utf8",
  }).trim();

  if (still) {
    console.warn(
      `⚠ Portul ${port} încă ocupat. Închide manual din Activity Monitor → node.`
    );
    process.exit(1);
  }

  console.log(`✓ Port ${port} liber.`);
} catch {
  console.log(`Port ${port} — deja liber.`);
}
