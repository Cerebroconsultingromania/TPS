#!/usr/bin/env bash
# Oprește ORICE server pe portul 3006 (Mac) — versiune agresivă
set +e

PORT=3006
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo ""
echo "  TPDS — Oprire server pe portul $PORT"
echo "  ─────────────────────────────────────"

stop_pids() {
  local pids
  pids=$(lsof -t -iTCP:$PORT -sTCP:LISTEN 2>/dev/null)
  if [ -n "$pids" ]; then
    echo "  Procese pe port $PORT: $pids"
    kill $pids 2>/dev/null
    sleep 1
    kill -9 $pids 2>/dev/null
    sleep 1
  fi
}

stop_pids

# Oprește și după nume de proces (dacă portul nu răspunde la lsof)
pkill -f "next start -H 127.0.0.1 -p $PORT" 2>/dev/null
pkill -f "next dev -H 127.0.0.1 -p $PORT" 2>/dev/null
pkill -f "next dev.*-p $PORT" 2>/dev/null
pkill -f "run-dev.mjs" 2>/dev/null

sleep 1
stop_pids

if lsof -t -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo ""
  echo "  ⚠ Portul $PORT încă e ocupat."
  echo "  Rulează manual în Terminal:"
  echo "    sudo lsof -i :$PORT"
  echo "    sudo kill -9 \$(sudo lsof -t -i :$PORT)"
  echo ""
  echo "  Sau: Activity Monitor → caută 'node' → Force Quit"
  echo ""
  read -p "  Apasă Enter pentru a închide..."
  exit 1
fi

echo "  ✓ Port $PORT liber. Poți porni din nou cu: npm run site"
echo ""
read -p "  Apasă Enter pentru a închide..."
