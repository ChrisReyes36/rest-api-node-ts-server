# ─────────────────────────────────────────
# Stage 1: deps — instala SOLO producción
# ─────────────────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production && \
  yarn cache clean

# ─────────────────────────────────────────
# Stage 2: build — compila TypeScript
# ─────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

# Instala TODAS las deps (incluyendo devDependencies para compilar)
RUN yarn install --frozen-lockfile && \
  yarn cache clean

COPY src ./src

RUN yarn build

# ─────────────────────────────────────────
# Stage 3: runner — imagen final mínima
# ─────────────────────────────────────────
FROM node:22-alpine AS runner

# Seguridad: no correr como root
RUN addgroup --system --gid 1001 nodejs && \
  adduser  --system --uid 1001 appuser

WORKDIR /app

# Solo los artefactos necesarios para producción
COPY --from=deps  --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=appuser:nodejs /app/dist         ./dist

ENV NODE_ENV=production \
  APP_PORT=4000

USER appuser

EXPOSE 4000

# Healthcheck interno del contenedor
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${APP_PORT}/api/v1/products || exit 1

CMD ["node", "dist/index.js"]