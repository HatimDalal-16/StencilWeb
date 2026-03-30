import { Component, Element, Method, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: { delegatesFocus: true },
})
export class MyButton {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, mutable: true }) variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Prop({ reflect: true, mutable: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
  }

  @Watch('variant')
  validateVariant(newValue: string) {
    const valid = ['primary', 'secondary', 'danger'];
    if (!valid.includes(newValue)) {
      console.warn(`<my-button> invalid variant: "${newValue}". Defaulting to "primary". Expected: ${valid.join(', ')}`);
      this.variant = 'primary';
    }
  }

  @Watch('size')
  validateSize(newValue: string) {
    const valid = ['sm', 'md', 'lg'];
    if (!valid.includes(newValue)) {
      console.warn(`<my-button> invalid size: "${newValue}". Defaulting to "md". Expected: ${valid.join(', ')}`);
      this.size = 'md';
    }
  }

  @Method()
  async setFocus() {
    this.el.shadowRoot?.querySelector('button')?.focus();
  }

  render() {
    return (
      <button
        type={this.type}
        class={`btn btn--${this.variant} btn--${this.size}`}
        disabled={this.disabled}
      >
        <slot />
      </button>
    );
  }
}
