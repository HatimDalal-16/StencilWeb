import { Component, h } from '@stencil/core';

@Component({
  tag: 'tester-page',
  styleUrl: 'tester-page.css',
  shadow: true,
})
export class TesterPage {
  render() {
    return (
      <div>
        <h2>hello</h2>
      </div>
    );
  }
}
