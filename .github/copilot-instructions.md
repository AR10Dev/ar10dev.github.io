# Copilot Instructions

## Project Overview
Personal portfolio/site built with Astro + TypeScript, bundled with Bun, linted with Biome.

## Tech Stack
- Framework: Astro 6 (SSG, file-based routing)
- UI layer: `.astro` components + SolidJS for interactive islands (`src/components/solid/`)
- UI primitives: `src/components/ui/` — reuse before creating new
- Language: TypeScript (strict, version 6)
- Package Manager: Bun — always `bun add`, `bun run`, `Bun.*` APIs
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`) + `@tailwindcss/typography`
- Spellcheck: cspell — new domain words go in `project-words.txt`
- Schema validation: Zod (via `astro/zod`) — already imported in content collections
- Astro integrations already registered in `astro.config.ts`: SolidJS, MDX, Sitemap, PWA, Partytown, RSS, rehype-d2. Do NOT add duplicates.

## Project Structure
- `src/components/`        — Astro page-level components
- `src/components/solid/`  — SolidJS interactive island components
- `src/components/ui/`     — UI primitives: FeatureCard, FormField (check here first)
- `src/layouts/`           — Page layout wrappers
- `src/pages/`             — File-based routing
- `src/content/`           — Content collection data (JSON + md/mdx)
- `src/data/`              — Static non-collection data
- `src/styles/`            — Global CSS (excluded from Biome)
- `src/lib/`               — Shared utilities
- `src/scripts/`           — Client-side scripts
- `src/types/`             — Shared TypeScript types

## Placement Rules
- New shared types → `src/types/`
- SolidJS component-local types → `src/components/solid/types.ts`
- New utilities → `src/lib/`
- New interactive components → `src/components/solid/` (SolidJS `.tsx`)
- New static components → `src/components/` or `src/components/ui/` if reusable
- New pages → `src/pages/` (Astro file-based routing)

## Code Style
- Formatter: Biome 2 (NOT Prettier, NOT ESLint)
- Indent: 2 spaces, double quotes for TS/JS strings
- No unused imports or variables (Biome enforced) — EXCEPT `.astro` files (rules are OFF there)
- CSS files excluded from Biome — style freely
- Auto-fix: `bun run lint:fix`

## SolidJS Islands
- Mount with `client:load` or `client:visible` in `.astro` files: `<Navbar client:load />`
- Use `createSignal`, `createEffect`, `createMemo` — NOT React hooks
- Component prop types go in `src/components/solid/types.ts`

## Content Collections (`src/content.config.ts`)

### `site` — JSON in `src/content/site/`
brandTitle, metaDescription, kicker, heroLead, githubUrl, responseTime,
timezone, location, availability, contactEmail, bookingUrl

### `services` — JSON in `src/content/services/`
slug, title, metaTitle, metaDescription, heroTitle, heroSubtitle, introduction,
benefits[]{title,description}, services[]{name,description,icon}, technologies[],
cta{title,description,buttonText,buttonLink},
faqs?[]{question,answer}, parentService?, relatedServices?[], relatedBlogPosts?[]

### `portfolio` — JSON in `src/content/portfolio/`
order(int), title, category, summary, description, challenge, solution,
impact, timeframe, stack[], proofUrl, proofLabel

### `blog` — .md/.mdx in `src/content/blog/`
title, description, publishDate, updatedDate?, author(default:"Avaab Razzaq"),
image?{src,alt}, tags[], category(enum: AI|Marketing|Development|Growth|Analytics|Tutorial),
draft(bool), featured(bool), readingTime?, relatedService?,
howTo?{totalTime?,estimatedCost?,steps[]{name,text}}

## Commands

### Development
- Dev:     `bun run dev`
- Build:   `bun run build`
- Check:   `bun run check`
- Preview: `bun run preview`

### For use during AI-assisted implementation (errors/warnings only)
- Lint:    `bun run agent:lint`
- Check:   `bun run agent:check`
- Build:   `bun run agent:build`
- Spell:   `bun run agent:spell`

Always use `agent:*` commands when verifying code — never the full verbose versions.

After making any code changes, always run `bun run agent:verify` to confirm
no errors before considering the task complete.

## Commit Conventions
Conventional commits scoped to area: `feat(blog): add reading time display`
Prefixes: `feat:` `fix:` `chore:` `docs:` `refactor:`

## Available MCP Tools
Use these proactively during implementation — don't wait to be asked.

### `astro-docs`
Query official Astro documentation. Use FIRST whenever working with content collections,
routing, layouts, integrations, or any Astro API. Never guess Astro APIs — look them up here.

### `context7`
Fetch up-to-date library docs for any package in `package.json`.
Use for SolidJS signals, Zod schemas, Biome config, Tailwind v4, or Bun APIs.
Prefer this over training-data knowledge for library-specific syntax.

### `typescript-lsp`
TypeScript Language Server. Use to check types before finalizing a component's props
interface, validate imports, or find type errors without a full build.

### `filesystem`
Read/write files in `/workspaces`. Always read existing components before writing new
ones — check patterns first. Verify a file exists before importing it.

### `bun-runtime`
Execute Bun scripts. Use to run `bun run lint:fix` after generating code and
`bun run build` to verify no build errors before finishing a task.

### `tailwindcss`
Tailwind utility lookup. Use when adding or auditing CSS classes to ensure they are
valid for Tailwind v4.

### `sequential-thinking`
Use for any task involving 3+ interdependent steps — e.g., adding a new content
collection (schema → content file → component → page). Forces step-by-step reasoning.

### `memory`
Persist architectural decisions across sessions. When a pattern or decision is made,
write it to memory so future sessions stay consistent.

### `github`
Read issues, PRs, and repo state. Use when implementing a feature tied to an open issue
or checking if work is already in progress on a PR.

### `playwright`
Browser automation. Use after building a new page or component to screenshot and verify
it renders correctly before marking a task done.

### `fetch`
Fetch external URLs. Use to retrieve third-party API specs or check live URLs referenced
in content collections.

### `time`
Get current date/time. Use when generating blog post `publishDate` fields or any content
requiring a timestamp.

## Do NOT
- Use npm or yarn — Bun only
- Use React or Vue — SolidJS for islands, Astro for everything else
- Use ESLint or Prettier — Biome only
- Use `any` TypeScript type without an explanatory comment
- Add `console.log` without `// TODO: remove`
- Modify `bun.lock` manually
- Create Zod schemas for content outside `src/content.config.ts`
- Inline styles — use Tailwind classes or Astro scoped `<style>` blocks
- Add integrations to `astro.config.ts` without checking if they are already registered
