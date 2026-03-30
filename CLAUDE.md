# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server with watch + hot reload (http://localhost:3333)
npm run build      # Production build
npm test           # Run all tests (unit + browser via Playwright)
npm run test:watch # Run tests in watch mode
npm run generate   # Scaffold a new Stencil component
```

## Architecture

This is a **Stencil-based web component design system** that outputs reusable custom elements. Components are distributed in three output formats defined in `stencil.config.ts`:
- `dist` — lazy-loaded collection (for apps using the loader)
- `dist-custom-elements` — standalone tree-shakeable ESM (auto-defines on import)
- `www` — local dev server output

**Tailwind CSS** is integrated via PostCSS (`@stencil-community/postcss` + `@tailwindcss/postcss`). The global stylesheet at `src/global/app.css` imports Tailwind for host-page styles. Individual component CSS files must also import Tailwind if they use utility classes (since Stencil uses Shadow DOM — styles don't leak in or out).

**Shadow DOM is enabled** on all components (`shadow: true`). This means:
- Tailwind must be imported inside each component's own CSS file for its classes to work
- Global styles in `app.css` do NOT apply inside component shadow roots

**Testing** uses Vitest with two projects configured in `vitest.config.ts`:
- `unit` — runs in Stencil's test environment
- `browser` — runs in Chrome headless via Playwright

Test files use the naming convention `*.unit.test.ts` (unit) or `*.e2e.ts` (browser/e2e).

## Adding Components

Use `npm run generate` to scaffold, then:
1. Add `@import 'tailwindcss';` to the component's CSS file if using Tailwind classes
2. Enable `shadow: true` in `@Component` decorator (default pattern)
3. Export props via `@Prop()` decorators — `components.d.ts` is auto-generated on build

## Key Files

- `stencil.config.ts` — build config, plugins, output targets
- `src/global/app.css` — global Tailwind import for the dev page
- `src/components.d.ts` — auto-generated; do not edit manually
- `src/index.html` — dev harness page for testing components locally
