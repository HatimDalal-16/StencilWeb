import { Component, Element, Method, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: { delegatesFocus: true },
})
export class MyButton {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, mutable: true }) palette: 'primary' | 'secondary' = 'primary';
  @Prop({ reflect: true, mutable: true }) variant: 'solid' | 'soft' | 'link' | 'outline' = 'solid';
  @Prop({ reflect: true, mutable: true }) size: 'xs' | 'sm' | 'base' | 'lg' = 'base';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() block: boolean = false;
  @Prop() isIcon: boolean = false;
  // Maps to aria-label attribute — required for icon-only buttons
  @Prop() ariaLabel: string;

  // ─── Lifecycle ───────────────────────────────────────────────

  componentWillLoad() {
    this.validatePalette(this.palette);
    this.validateVariant(this.variant);
    this.validateSize(this.size);
  }

  // ─── Validators ──────────────────────────────────────────────

  @Watch('palette')
  validatePalette(newValue: string) {
    const valid = ['primary', 'secondary'];
    if (!valid.includes(newValue)) {
      console.warn(`<my-button> invalid palette: "${newValue}". Defaulting to "primary". Expected: ${valid.join(', ')}`);
      this.palette = 'primary';
    }
  }

  @Watch('variant')
  validateVariant(newValue: string) {
    const valid = ['solid', 'soft', 'link', 'outline'];
    if (!valid.includes(newValue)) {
      console.warn(`<my-button> invalid variant: "${newValue}". Defaulting to "solid". Expected: ${valid.join(', ')}`);
      this.variant = 'solid';
    }
  }

  @Watch('size')
  validateSize(newValue: string) {
    const valid = ['xs', 'sm', 'base', 'lg'];
    if (!valid.includes(newValue)) {
      console.warn(`<my-button> invalid size: "${newValue}". Defaulting to "base". Expected: ${valid.join(', ')}`);
      this.size = 'base';
    }
  }

  // ─── Methods ─────────────────────────────────────────────────

  @Method()
  async setFocus() {
    this.el.shadowRoot?.querySelector('button')?.focus();
  }

  // ─── Render ──────────────────────────────────────────────────

  render() {
    return (
      <button
        type={this.type}
        class={{
          'btn': true,
          [`btn--${this.palette}`]: true,
          [`btn--${this.variant}`]: true,
          [`btn--${this.size}`]: true,
          'btn--block': this.block,
          'btn--icon': this.isIcon,
          'btn--loading': this.loading,
        }}
        disabled={this.disabled}
        aria-disabled={this.disabled || this.loading}
        aria-busy={this.loading || undefined}
        aria-label={this.ariaLabel || undefined}
      >
        {this.loading && <span class="btn__spinner" aria-hidden="true" />}
        <slot />
      </button>
    );
  }
}
