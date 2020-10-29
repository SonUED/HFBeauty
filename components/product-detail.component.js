const productDetailTemplate = document.createElement('template');

productDetailTemplate.innerHTML = ``;

class Product extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const template = productDetailTemplate.content;
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.cloneNode(true));
	}
}

customElements.define('product-detail-element', Product);
