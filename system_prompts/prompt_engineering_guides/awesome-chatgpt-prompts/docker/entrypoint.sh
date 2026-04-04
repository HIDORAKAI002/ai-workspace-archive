#!/bin/sh
set -e

# Generate AUTH_SECRET if not provided
if [ -z "$AUTH_SECRET" ]; then
  AUTH_SECRET=$(openssl rand -base64 32)
  export AUTH_SECRET
  echo "[prompts.chat] AUTH_SECRET not set -- generated a random value."
  echo "[prompts.chat] Set AUTH_SECRET explicitly for production to persist sessions across restarts."
fi

# Wait for PostgreSQL to be ready
echo "[prompts.chat] Waiting for database..."
MAX_RETRIES=30
RETRY_COUNT=0
until node -e "
  const net = require('net');
  const url = new URL(process.env.DATABASE_URL);
  const sock = net.createConnection({ host: url.hostname, port: url.port || 5432 });
  sock.setTimeout(2000);
  sock.on('connect', () => { sock.setTimeout(0); sock.destroy(); process.exit(0); });
  sock.on('timeout', () => { sock.destroy(); process.exit(1); });
  sock.on('error', () => process.exit(1));
" 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
    echo "[prompts.chat] ERROR: Database not reachable after ${MAX_RETRIES} attempts."
    exit 1
  fi
  echo "[prompts.chat] Database not ready (attempt ${RETRY_COUNT}/${MAX_RETRIES}), retrying in 2s..."
  sleep 2
done

# Run database migrations
echo "[prompts.chat] Running database migrations..."
npx prisma migrate deploy
echo "[prompts.chat] Migrations applied successfully."

# Start the application
echo "[prompts.chat] Starting application on port ${PORT:-3000}..."
exec node server.js
