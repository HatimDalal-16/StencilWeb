# Storybook for `my-button` — Design Spec

**Date:** 2026-03-30

## Goal

Add Storybook to the `buttondesignsystem` project to serve as both a development sandbox and a shareable documentation reference for the `my-button` web component.

## Framework & Tooling

- **Storybook framework:** `@storybook/web-components` with Vite builder
- **Story format:** CSF (Component Story Format) in TypeScript (`.stories.ts`)
- **Addons:** Controls + Docs only (lean setup)

## Project Structure

```
.storybook/
  main.ts          # framework, addons, stories glob config
  preview.ts       # global decorators, parameters, component import
src/
  components/
    Button/
      my-button.stories.ts   # all button stories
docs/
  superpowers/
    specs/
      2026-03-30-storybook-design.md
```

New npm scripts in `package.json`:

```json
"storybook": "storybook dev -p 6007",
"build-storybook": "storybook build",
"dev": "concurrently \"npm run start\" \"npm run storybook\""
```

`concurrently` added as a dev dependency.

## Stories

File: `src/components/Button/my-button.stories.ts`

- **Meta** — registers `my-button`, defines `argTypes` for `variant`, `size`, and `disabled` with appropriate controls (select/boolean)
- **Default — Primary** — variant=primary, size=md, disabled=false
- **Secondary** — variant=secondary
- **Danger** — variant=danger
- **Small** — size=sm
- **Medium** — size=md
- **Large** — size=lg
- **Disabled** — disabled=true

Each story renders `<my-button>` via an HTML template string with slot text "Click me". The Controls panel allows live prop tweaking on any story.

## Stencil Integration

- Storybook imports from the `dist-custom-elements` output target (auto-defines components on import)
- `preview.ts` imports the bundle so `my-button` is registered before any story renders
- Dev workflow uses `concurrently` to run Stencil watch (`npm start`, port 3333) and Storybook dev server (`npm run storybook`, port 6007) in parallel via `npm run dev`
- Stencil rebuilds on component changes; Storybook hot-reloads automatically

## What's Not Included

- No MDX stories
- No Actions addon (no event handling stories for now)
- No Viewport or Backgrounds addons
- No React/Vue wrappers
