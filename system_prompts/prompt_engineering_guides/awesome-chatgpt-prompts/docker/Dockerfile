# prompts.chat Docker Image
# Multi-stage build for a production-ready Next.js application
#
# Usage with Docker Compose:
#   docker compose up -d
#
# Usage standalone (bring your own PostgreSQL):
#   docker build -f docker/Dockerfile -t prompts.chat .
#   docker run -p 4444:3000 -e DATABASE_URL="postgresql://..." prompts.chat

# ---- Stage 1: Base ----
FROM node:24-bookworm-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---- Stage 2: Dependencies ----
FROM base AS deps

# Copy dependency manifests and Prisma schema (postinstall runs prisma generate)
COPY package.json package-lock.json ./
COPY prisma/schema.prisma prisma/schema.prisma
COPY prisma.config.ts tsconfig.json ./

# Dummy DATABASE_URL for prisma generate (no actual connection is made)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm ci

# ---- Stage 3: Builder ----
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm run build

# ---- Stage 4: Runner ----
FROM node:24-bookworm-slim AS runner

LABEL org.opencontainers.image.source="https://github.com/f/prompts.chat"
LABEL org.opencontainers.image.description="prompts.chat - Self-hosted AI prompt library"
LABEL org.opencontainers.image.licenses="MIT"

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy Prisma schema, migrations, and config for runtime migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json

# Install only Prisma CLI and its dependencies for runtime migrations
RUN npm install --no-save prisma@6.19 dotenv

# Copy entrypoint script
COPY --chown=nextjs:nodejs docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

USER nextjs

ENTRYPOINT ["./entrypoint.sh"]
