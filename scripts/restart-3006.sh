#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

bash scripts/stop-3006.sh
echo "Build..."
npm run build
echo "Pornire pe http://127.0.0.1:3006 ..."
npm run start:3006
