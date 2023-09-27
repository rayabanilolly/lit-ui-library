import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement("basic")
export class Basic extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  label = "Button Label";

  render() {
    return html`<button>Hello, ${this.label}!</button>`;
  }
}
