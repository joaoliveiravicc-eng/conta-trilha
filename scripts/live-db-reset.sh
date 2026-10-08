#!/usr/bin/env bash
# Recria um banco LOCAL de testes do ContaTrilha Live: shim do Supabase + 0001 + 0002.
# Recusa qualquer host que não seja local, para nunca tocar em projeto remoto.
set -euo pipefail
HOST="${LIVE_PGHOST:-127.0.0.1}"; PORT="${LIVE_PGPORT:-54329}"; USER_="${LIVE_PGUSER:-postgres}"; DB="${LIVE_PGDATABASE:-contalive_test}"
case "$HOST" in 127.0.0.1|localhost|::1) ;; *) echo "recusado: host '$HOST' não é local" >&2; exit 2;; esac
case "$DB" in *_test|*_dev|*_demo) ;; *) echo "recusado: o banco deve terminar em _test, _dev ou _demo" >&2; exit 2;; esac
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
P=(psql -X -q -v ON_ERROR_STOP=1 -h "$HOST" -p "$PORT" -U "$USER_")
"${P[@]}" -d postgres -c "drop database if exists $DB with (force)" -c "create database $DB"
for f in "$ROOT/supabase/dev/00_supabase_shim.sql" "$ROOT/supabase/migrations/0001_progress.sql" "${LIVE_MIGRATION_0002:-$ROOT/supabase/migrations/0002_live_rooms.sql}"; do
  "${P[@]}" -d "$DB" -f "$f"
done
echo "ok: $DB pronto em $HOST:$PORT"
