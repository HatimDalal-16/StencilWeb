import type { Meta, StoryObj } from '@storybook/web-components';

type ButtonArgs = {
  palette: 'primary' | 'secondary';
  variant: 'solid' | 'soft' | 'link' | 'outline';
  size: 'xs' | 'sm' | 'base' | 'lg';
  disabled: boolean;
  loading: boolean;
  block: boolean;
  isIcon: boolean;
  ariaLabel: string;
  label: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const btn = (args: Partial<ButtonArgs>) => {
  const a = { palette: 'primary', variant: 'solid', size: 'base', label: 'Button', ...args } as ButtonArgs;
  const attrs = [
    `palette="${a.palette}"`,
    `variant="${a.variant}"`,
    `size="${a.size}"`,
    a.disabled  ? 'disabled'  : '',
    a.loading   ? 'loading'   : '',
    a.block     ? 'block'     : '',
    a.isIcon    ? 'is-icon'   : '',
    a.ariaLabel ? `aria-label="${a.ariaLabel}"` : '',
  ].filter(Boolean).join(' ');

  return `<my-button ${attrs}>${a.label}</my-button>`;
};

const row = (label: string, buttons: string) =>
  `<div style="display:flex;flex-direction:column;gap:8px">
    <span style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em">${label}</span>
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">${buttons}</div>
  </div>`;

const section = (title: string, content: string) =>
  `<div style="display:flex;flex-direction:column;gap:20px;padding:24px;font-family:sans-serif">
    <h3 style="margin:0;font-size:13px;font-weight:700;color:#374151;border-bottom:1px solid #e5e7eb;padding-bottom:8px">${title}</h3>
    ${content}
  </div>`;

// Phosphor icon shorthand — weight="bold" makes icons match button font-weight
const ph = (name: string) => `<ph-${name} weight="bold"></ph-${name}>`;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],

  render: (args) => btn({
    ...args,
    label: args.isIcon ? ph('arrow-right') : args.label,
  }),

  argTypes: {
    palette: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color palette — primary (gold) or secondary (dark grey)',
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'link', 'outline'],
      description: 'Visual treatment of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
      description: 'Physical size',
    },
    label: {
      control: 'text',
      description: 'Slot content (button text)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button — blocks interaction and dims appearance',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner — blocks clicks without full disabled styling',
    },
    block: {
      control: 'boolean',
      description: 'Stretches button to full container width',
    },
    isIcon: {
      control: 'boolean',
      description: 'Square icon-only button — removes padding, fixes width = height',
    },
    ariaLabel: {
      control: 'text',
      description: 'Required when isIcon is true — describes button for screen readers',
    },
  },

  args: {
    palette: 'primary',
    variant: 'solid',
    size: 'base',
    label: 'Button',
    disabled: false,
    loading: false,
    block: false,
    isIcon: false,
    ariaLabel: '',
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// ─── Playground ───────────────────────────────────────────────────────────────
// Fully interactive — use the Controls panel to explore every combination

export const Playground: Story = {};

// ─── Palette × Variant ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Palette x Variant',
  render: () => section('All palette x variant combinations', [
    row('Primary', [
      btn({ palette: 'primary', variant: 'solid',   label: 'Solid' }),
      btn({ palette: 'primary', variant: 'soft',    label: 'Soft' }),
      btn({ palette: 'primary', variant: 'link',    label: 'Link' }),
      btn({ palette: 'primary', variant: 'outline', label: 'Outline' }),
    ].join('')),
    row('Secondary', [
      btn({ palette: 'secondary', variant: 'solid',   label: 'Solid' }),
      btn({ palette: 'secondary', variant: 'soft',    label: 'Soft' }),
      btn({ palette: 'secondary', variant: 'link',    label: 'Link' }),
      btn({ palette: 'secondary', variant: 'outline', label: 'Outline' }),
    ].join('')),
  ].join('')),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => section('Sizes', [
    row('Primary · Solid', [
      btn({ size: 'xs',   label: 'Extra Small' }),
      btn({ size: 'sm',   label: 'Small' }),
      btn({ size: 'base', label: 'Base' }),
      btn({ size: 'lg',   label: 'Large' }),
    ].join('')),
    row('Secondary · Solid', [
      btn({ palette: 'secondary', size: 'xs',   label: 'Extra Small' }),
      btn({ palette: 'secondary', size: 'sm',   label: 'Small' }),
      btn({ palette: 'secondary', size: 'base', label: 'Base' }),
      btn({ palette: 'secondary', size: 'lg',   label: 'Large' }),
    ].join('')),
  ].join('')),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => section('States — disabled and loading', [
    row('Disabled · Primary', [
      btn({ palette: 'primary', variant: 'solid',   disabled: true, label: 'Solid' }),
      btn({ palette: 'primary', variant: 'soft',    disabled: true, label: 'Soft' }),
      btn({ palette: 'primary', variant: 'link',    disabled: true, label: 'Link' }),
      btn({ palette: 'primary', variant: 'outline', disabled: true, label: 'Outline' }),
    ].join('')),
    row('Disabled · Secondary', [
      btn({ palette: 'secondary', variant: 'solid',   disabled: true, label: 'Solid' }),
      btn({ palette: 'secondary', variant: 'soft',    disabled: true, label: 'Soft' }),
      btn({ palette: 'secondary', variant: 'link',    disabled: true, label: 'Link' }),
      btn({ palette: 'secondary', variant: 'outline', disabled: true, label: 'Outline' }),
    ].join('')),
    row('Loading · Primary', [
      btn({ palette: 'primary', variant: 'solid',   loading: true, label: 'Solid' }),
      btn({ palette: 'primary', variant: 'soft',    loading: true, label: 'Soft' }),
      btn({ palette: 'primary', variant: 'link',    loading: true, label: 'Link' }),
      btn({ palette: 'primary', variant: 'outline', loading: true, label: 'Outline' }),
    ].join('')),
    row('Loading · Secondary', [
      btn({ palette: 'secondary', variant: 'solid',   loading: true, label: 'Solid' }),
      btn({ palette: 'secondary', variant: 'soft',    loading: true, label: 'Soft' }),
      btn({ palette: 'secondary', variant: 'link',    loading: true, label: 'Link' }),
      btn({ palette: 'secondary', variant: 'outline', loading: true, label: 'Outline' }),
    ].join('')),
  ].join('')),
};

// ─── Block ────────────────────────────────────────────────────────────────────

export const Block: Story = {
  render: () => section('Block — full width', [
    row('All variants stretch to container width', `
      <div style="width:100%;display:flex;flex-direction:column;gap:8px">
        ${btn({ palette: 'primary',   variant: 'solid',   block: true, label: 'Primary Solid' })}
        ${btn({ palette: 'primary',   variant: 'outline', block: true, label: 'Primary Outline' })}
        ${btn({ palette: 'secondary', variant: 'solid',   block: true, label: 'Secondary Solid' })}
        ${btn({ palette: 'secondary', variant: 'soft',    block: true, label: 'Secondary Soft' })}
      </div>
    `),
  ].join('')),
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => section('Icon only — isIcon with Phosphor icons', [
    row('Primary · All variants', [
      btn({ palette: 'primary', variant: 'solid',   isIcon: true, ariaLabel: 'Add',    label: ph('plus') }),
      btn({ palette: 'primary', variant: 'soft',    isIcon: true, ariaLabel: 'Edit',   label: ph('pencil-simple') }),
      btn({ palette: 'primary', variant: 'link',    isIcon: true, ariaLabel: 'Share',  label: ph('share-network') }),
      btn({ palette: 'primary', variant: 'outline', isIcon: true, ariaLabel: 'Delete', label: ph('trash') }),
    ].join('')),
    row('Secondary · All variants', [
      btn({ palette: 'secondary', variant: 'solid',   isIcon: true, ariaLabel: 'Search',   label: ph('magnifying-glass') }),
      btn({ palette: 'secondary', variant: 'soft',    isIcon: true, ariaLabel: 'Filter',   label: ph('funnel') }),
      btn({ palette: 'secondary', variant: 'link',    isIcon: true, ariaLabel: 'Settings', label: ph('gear') }),
      btn({ palette: 'secondary', variant: 'outline', isIcon: true, ariaLabel: 'Close',    label: ph('x') }),
    ].join('')),
    row('Sizes · Primary Solid', [
      btn({ variant: 'solid', isIcon: true, size: 'xs',   ariaLabel: 'Star xs',   label: ph('star') }),
      btn({ variant: 'solid', isIcon: true, size: 'sm',   ariaLabel: 'Star sm',   label: ph('star') }),
      btn({ variant: 'solid', isIcon: true, size: 'base', ariaLabel: 'Star base', label: ph('star') }),
      btn({ variant: 'solid', isIcon: true, size: 'lg',   ariaLabel: 'Star lg',   label: ph('star') }),
    ].join('')),
  ].join('')),
};

// ─── With Icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => section('Icon + text — inline via slot', [
    row('Leading icon', [
      btn({ palette: 'primary',   variant: 'solid',   label: ph('paper-plane-tilt') + ' Send' }),
      btn({ palette: 'primary',   variant: 'soft',    label: ph('download-simple') + ' Download' }),
      btn({ palette: 'secondary', variant: 'solid',   label: ph('sign-in') + ' Sign in' }),
      btn({ palette: 'secondary', variant: 'outline', label: ph('plus') + ' Add item' }),
    ].join('')),
    row('Trailing icon', [
      btn({ palette: 'primary',   variant: 'solid',   label: 'Continue ' + ph('arrow-right') }),
      btn({ palette: 'primary',   variant: 'outline', label: 'Learn more ' + ph('arrow-up-right') }),
      btn({ palette: 'secondary', variant: 'soft',    label: 'Options ' + ph('caret-down') }),
      btn({ palette: 'secondary', variant: 'link',    label: 'Open link ' + ph('arrow-square-out') }),
    ].join('')),
  ].join('')),
};
