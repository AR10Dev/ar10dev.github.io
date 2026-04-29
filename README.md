# ar10dev.github.io

[![CI](https://github.com/AR10Dev/ar10dev.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/AR10Dev/ar10dev.github.io/actions/workflows/ci.yml)

**[avaabrazzaq.com](https://avaabrazzaq.com)** — Personal site of Avaab Razzaq, AI Growth Engineer based in Miami, FL. Built with Astro, SolidJS, and Tailwind CSS. Offering AI automation, full-stack development, and technical SEO services.

This site deploys to Cloudflare Workers with Wrangler.

## Requirements

- Bun
- D2 CLI (for diagram rendering)
- Wrangler CLI

## Setup

```bash
# Install D2 CLI (required for diagram rendering)
bun run setup:d2

# Install dependencies
bun install

# Preview Cloudflare deployment locally
bun run preview:cloudflare

# Deploy to Cloudflare Workers
bun run deploy:cloudflare
```

## Scripts

```bash
bun run dev       # Start development server
bun run build     # Build for production
bun run preview   # Preview production build
bun run preview:cloudflare # Build and preview with Wrangler
bun run deploy:cloudflare  # Build and deploy to Cloudflare Workers
bun run lint      # Lint codebase
bun run format    # Format codebase
bun run setup:d2  # Install D2 diagram CLI
```
