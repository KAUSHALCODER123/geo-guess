# FlagForge — Production Deployment & DevOps Guide

This guide provides complete instructions for deploying, configuring, and maintaining **FlagForge** in production across Vercel, Docker containers, and automated GitHub Actions CI/CD workflows.

---

## 1. Vercel Deployment (Recommended)

FlagForge is optimized out-of-the-box for zero-config deployment on Vercel, leveraging Next.js 15 App Router, React 19 Server Components, and Edge OpenGraph image generation.

### Step-by-Step Setup

1. **Connect Repository**: Import the `flagforge` repository via the [Vercel Dashboard](https://vercel.com/new).
2. **Framework Preset**: Select **Next.js** (Vercel automatically detects Next.js 15+).
3. **Build & Development Settings**:
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install --frozen-lockfile`
   - **Node.js Version**: `20.x` or `22.x`
4. **Environment Variables**: Configure the production environment variables outlined below.
5. **Deploy**: Trigger deployment.

---

## 2. Environment Variables & Runtime Settings

| Variable Name | Required | Default / Example | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | `https://flagforge.app` | Canonical URL for sitemaps, OpenGraph metadata, and social previews |
| `NODE_ENV` | Automatic | `production` | Enables production optimizations and disables debug traces |
| `NEXT_PUBLIC_ENABLE_PWA` | No | `true` | Toggles service worker registration and install prompt |
| `NEXT_TELEMETRY_DISABLED` | No | `1` | Disables telemetry reporting in CI and container builds |

---

## 3. Security Headers & CSP Configuration

FlagForge enforces strict security headers defined in `next.config.ts`:

- **Content-Security-Policy (CSP)**:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (eval permitted for WebAssembly/math libraries)
  - `style-src 'self' 'unsafe-inline'` (styled-components / Tailwind CSS variables)
  - `img-src 'self' blob: data: https://flagcdn.com https://upload.wikimedia.org https://commons.wikimedia.org`
  - `connect-src 'self' https://restcountries.com https://en.wikipedia.org https://api.open-meteo.com`
  - `frame-ancestors 'none'` (clickjacking prevention)
- **X-Frame-Options**: `DENY`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=()`

---

## 4. Containerized Deployment (Docker)

For self-hosted Kubernetes, AWS ECS, or Fly.io deployments, use the multi-stage production Dockerfile.

### 4.1 Production `Dockerfile`

```dockerfile
# Stage 1: Base dependencies
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 3: Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN pnpm run build

# Stage 4: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root security user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
```

### 4.2 `docker-compose.yml`

```yaml
version: "3.8"

services:
  flagforge:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: flagforge-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://flagforge.app
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/"]
      interval: 30s
      timeout: 5s
      retries: 3
```

To run:
```bash
docker compose up -d --build
```

---

## 5. Automated CI/CD Pipeline (GitHub Actions)

Located at `.github/workflows/ci.yml`, the pipeline validates every pull request and push to `main`.

```yaml
name: FlagForge CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality-gate:
    name: Lint, Types & Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js & pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Code Quality (Lint)
        run: pnpm run lint

      - name: Typecheck
        run: pnpm run typecheck

      - name: Unit & Component Tests
        run: pnpm run test:coverage

      - name: Build Application
        run: pnpm run build

  e2e-matrix:
    name: Playwright E2E & Accessibility Matrix
    needs: quality-gate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js & pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Run E2E Tests (Explorer, Quiz, Compare, Axe WCAG 2.2 AA)
        run: pnpm exec playwright test --project=chromium

      - name: Upload Playwright Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

---

## 6. Build Optimization & Caching Strategy

1. **Static Site Generation (SSG)**:
   - 30 high-volume national pages (`/country/usa`, `/country/fra`, `/country/jpn`, etc.) are pre-rendered at build time with `generateStaticParams()`.
   - Remaining countries render dynamically with Incremental Static Regeneration (ISR) and TanStack Query persistence.
2. **Next.js Asset Optimization**:
   - `next/font`: Preloads Inter and Plus Jakarta Sans with zero layout shift and CSS `font-display: swap`.
   - `next/image`: WebP/AVIF conversions with automatic device-width srcset and blur placeholders.
3. **Progressive Web App & Service Worker**:
   - `/public/sw.js` implements Stale-While-Revalidate for APIs and Cache-First for FlagCDN SVG flags.
   - Core shell pre-cached on initial installation.
