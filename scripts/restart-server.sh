#!/bin/bash
# Restart Tennis Performance System dev server on port 3000
set -e

export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
PROJECT="$HOME/Desktop/tennis-performance-system"

echo "Stopping processes on ports 3000-3003..."
for port in 3000 3001 3002 3003; do
  lsof -ti :$port 2>/dev/null | xargs kill -9 2>/dev/null || true
done
sleep 2

cd "$PROJECT"

echo "Building..."
rm -rf .next
npm run build

echo "Starting production server on http://127.0.0.1:3000 ..."
npx next start -H 127.0.0.1 -p 3000
