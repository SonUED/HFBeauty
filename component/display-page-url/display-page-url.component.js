const displayPageUrlTemplate = document.createElement('template');

displayPageUrlTemplate.innerHTML = `
<link href="/components/display-page-url/display-page-url.style.css" rel="stylesheet" type="text/css">
<section class="display-page-url">
    <span> <a href="#">Home</a> </span>
    <span class="arrow"
    >&nbsp;<i class="fas fa-angle-right">&nbsp;</i></span
    >
    <span><a href="#">Lipstick</a></span>
</section>
`;

class DisplayPageUrl extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = displayPageUrlTemplate.innerHTML;
  }
}

customElements.define('display-page-url-element', DisplayPageUrl);
