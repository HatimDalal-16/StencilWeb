# Storybook for `my-button` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Storybook (`@storybook/web-components-vite`) into the project so `my-button` has a live dev sandbox and auto-generated documentation with Controls.

**Architecture:** Storybook runs as a separate dev server (port 6006) alongside Stencil's watch server (port 3333). `preview.ts` imports the Stencil `dist-custom-elements` build so `my-button` self-registers before any story renders. A `concurrently` script (`npm run dev`) starts both servers in one terminal.

**Tech Stack:** Storybook 8, `@storybook/web-components-vite`, `@storybook/addon-docs`, `concurrently`, Stencil 4, Tailwind CSS 4.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `.storybook/main.ts` | Storybook config: framework, addons, stories glob |
| Create | `.storybook/preview.ts` | Import built component bundle; global Storybook parameters |
| Create | `src/components/Button/my-button.stories.ts` | All button stories (variants, sizes, disabled) |
| Modify | `package.json` | Add `storybook`, `build-storybook`, `dev` scripts |

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json` (devDependencies — updated by npm automatically)

- [ ] **Step 1: Install Storybook packages and concurrently**

Run in the project root:

```bash
npm install --save-dev storybook @storybook/web-components-vite @storybook/addon-docs concurrently
```

Expected output: packages added to `node_modules/` and `package-lock.json` updated. No errors.

- [ ] **Step 2: Verify installations**

```bash
npx storybook --version
```

Expected: prints a version like `8.x.x`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install storybook and concurrently dependencies"
```

---

## Task 2: Create `.storybook/main.ts`

**Files:**
- Create: `.storybook/main.ts`

- [ ] **Step 1: Create the file**

Create `.storybook/main.ts` with this exact content:

```ts
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/main.ts
git commit -m "chore: add storybook main config"
```

---

## Task 3: Create `.storybook/preview.ts`

**Files:**
- Create: `.storybook/preview.ts`

- [ ] **Step 1: Do an initial Stencil build so `dist/components/` exists**

```bash
npm run build
```

Expected: `dist/components/my-button.js` is created (and other dist files). No errors.

- [ ] **Step 2: Create the file**

Create `.storybook/preview.ts` with this exact content:

```ts
import '../dist/components/my-button.js';
import type { Preview } from '@storybook/web-components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> **Note:** `dist/components/my-button.js` is the Stencil `dist-custom-elements` output with `auto-define-custom-elements: true` — importing it registers `<my-button>` globally before any story renders.

- [ ] **Step 3: Commit**

```bash
git add .storybook/preview.ts
git commit -m "chore: add storybook preview config with my-button import"
```

---

## Task 4: Add npm Scripts

**Files:**
- Modify: `package.json` (the `"scripts"` section)

- [ ] **Step 1: Add the three new scripts**

In `package.json`, update the `"scripts"` block to add `storybook`, `build-storybook`, and `dev`:

```json
"scripts": {
  "build": "stencil build",
  "start": "stencil build --dev --watch --serve",
  "test": "stencil-test",
  "test:watch": "stencil-test --watch",
  "generate": "stencil generate",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "dev": "concurrently \"npm run start\" \"npm run storybook\""
}
```

- [ ] **Step 2: Verify the script runs (dry-run check)**

```bash
npm run storybook -- --help
```

Expected: prints Storybook CLI help. No "command not found" errors.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add storybook and dev npm scripts"
```

---

## Task 5: Write `my-button.stories.ts`

**Files:**
- Create: `src/components/Button/my-button.stories.ts`

- [ ] **Step 1: Create the stories file**

Create `src/components/Button/my-button.stories.ts` with this exact content:

```ts
import type { Meta, StoryObj } from '@storybook/web-components';

type ButtonArgs = {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) =>
    `<my-button variant="${args.variant}" size="${args.size}" ${args.disabled ? 'disabled' : ''}>Click me</my-button>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and shows reduced opacity',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Button/my-button.stories.ts
git commit -m "feat: add my-button stories (variants, sizes, disabled)"
```

---

## Task 6: Verify the Full Setup

**Files:** none (verification only)

- [ ] **Step 1: Run Storybook in standalone mode**

```bash
npm run storybook
```

Expected: Storybook opens at `http://localhost:6006`. You should see:
- A `Components/Button` entry in the sidebar
- An `Autodocs` page with the Controls table showing `variant`, `size`, and `disabled`
- Seven stories: Primary, Secondary, Danger, Small, Medium, Large, Disabled
- The button renders correctly styled in each story

- [ ] **Step 2: Verify Controls work**

In any story, open the Controls panel at the bottom. Change `variant` to `danger` — the button should update in real time.

- [ ] **Step 3: Verify the `dev` script**

Stop Storybook (Ctrl+C), then run:

```bash
npm run dev
```

Expected: both Stencil (port 3333) and Storybook (port 6006) start concurrently in the same terminal. No port conflicts.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: storybook integration complete for my-button"
```

---

## Dev Workflow (for reference)

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Stencil watch + Storybook together |
| `npm run storybook` | Start Storybook only (needs existing dist/) |
| `npm run build-storybook` | Build static Storybook to `storybook-static/` |
| `npm run build` | Rebuild dist/ after component changes |
