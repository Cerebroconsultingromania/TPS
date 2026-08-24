#!/usr/bin/env bash
cd "$(dirname "$0")"
chmod +x scripts/stop-3006.sh 2>/dev/null
bash scripts/stop-3006.sh
