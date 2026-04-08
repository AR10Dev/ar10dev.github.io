# ar10dev.github.io

[![pages-build-deployment](https://github.com/AR10Dev/ar10dev.github.io/actions/workflows/pages-build-deployment.yml/badge.svg)](https://github.com/AR10Dev/ar10dev.github.io/actions/workflows/pages-build-deployment.yml)

## Requirements

- Bun
- D2 CLI (for diagram rendering)

## Setup

```bash
# Install D2 CLI (required for diagram rendering)
bun run setup:d2

# Install dependencies
bun install
```

## Scripts

```bash
bun run dev       # Start development server
bun run build     # Build for production
bun run preview   # Preview production build
bun run lint      # Lint codebase
bun run format    # Format codebase
bun run setup:d2  # Install D2 diagram CLI
```
