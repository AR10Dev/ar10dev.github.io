# Agents

## Tech Stack
- **Framework**: Astro 6 (static output, file-based routing)
- **Package Manager**: Bun only (not npm/yarn)
- **UI**: `.astro` + SolidJS islands (`client:load`/`client:visible`), Tailwind CSS v4
- **Linter/Formatter**: Biome 2 (NOT ESLint/Prettier) — `bun run lint:fix`
- **Type checking**: `astro check` (runs TypeScript + Astro type checking)

## Verify Changes
```bash
bun run agent:verify   # lint + check + build (errors/warnings only)
```

Or run individually:
```bash
bun run agent:lint   # biome check
bun run agent:check   # astro check
bun run agent:build  # astro build
bun run agent:spell  # cspell
```

## Project Structure
- `src/components/solid/` — SolidJS islands (signals, NOT React hooks)
- `src/components/ui/` — Reusable UI primitives
- `src/layouts/` — Page layout wrappers
- `src/pages/` — File-based routing
- `src/content/` — Content collections (JSON + md/mdx)
- `src/data/` — Static non-collection data
- `src/lib/` — Shared utilities (see `constants.ts`)
- `src/styles/` — Global CSS (excluded from Biome)
- `src/scripts/` — Client-side scripts

## Placement Rules
- New shared types → `src/types/`
- SolidJS component types → `src/components/solid/types.ts`
- New utilities → `src/lib/`
- New interactive components → `src/components/solid/` (`.tsx`)
- New static components → `src/components/` or `src/components/ui/`

## Path Aliases (tsconfig.json)
`@components/*`, `@layouts/*`, `@lib/*`, `@assets/*`, `@solid-components/*`, `@scripts/*`, `@data/*`

## Integrations (in astro.config.ts)
SolidJS, MDX, Sitemap, PWA, Partytown, RSS, rehype-d2. **Do NOT add duplicates.**

## Content Collections (src/content.config.ts)
| Collection | Format | Base |
|---|---|---|
| `site` | JSON | `src/content/site/` |
| `services` | JSON | `src/content/services/` |
| `portfolio` | JSON | `src/content/portfolio/` |
| `blog` | .md/.mdx | `src/content/blog/` |

## Spelling
Add project-specific words to `project-words.txt` (not cspell.json).

## Dev Container
Post-create installs Bun + D2 CLI. VS Code extensions: `astro-build.astro-vscode`, `biomejs.biome`.

## D2 Diagrams
Site uses `@beoe/rehype-d2` for `.d2` fenced code blocks in MDX. D2 CLI required: `bun run setup:d2`.

## Commands
```bash
bun run dev       # Start dev server
bun run build    # Production build (runs check first)
bun run preview  # Preview production build
bun run lint:fix # Auto-fix lint issues
```

## Commit Style
Conventional commits scoped to area: `feat(blog): add reading time`

## Do Not
- Use npm/yarn — Bun only
- Use React/Vue — SolidJS for islands
- Use ESLint/Prettier — Biome only
- Inline styles — Tailwind or Astro `<style>` blocks
- Add `console.log` without `// TODO: remove`
- Use `any` without explanatory comment