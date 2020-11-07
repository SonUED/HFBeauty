const sectionBrandTemplate = document.createElement('template');

sectionBrandTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="/components/section-brand/section-brand.style.css">

<section class="brand">
    <div class="container">
    <div class="brand__block">
        <div class="row">
        <div class="col-20">
            <div class="brand__item">
            <a href="#"
                ><img src="../img/Brand-Loreal_200x.jpg" alt=""
            /></a>
            </div>
        </div>
        <div class="col-20">
            <div class="brand__item">
            <a href="#"
                ><img src="../img/Brand-Nivea_200x.webp" alt=""
            /></a>
            </div>
        </div>
        <div class="col-20">
            <div class="brand__item">
            <a href="#"
                ><img src="../img/Brand-Schwarzkopf_200x.webp" alt=""
            /></a>
            </div>
        </div>
        <div class="col-20">
            <div class="brand__item">
            <a href="#"
                ><img src="../img/Brand-Suave_200x.webp" alt=""
            /></a>
            </div>
        </div>
        <div class="col-20">
            <div class="brand__item">
            <a href="#"
                ><img src="../img/Brand-Tresemme_200x.webp" alt=""
            /></a>
            </div>
        </div>
        </div>
    </div>
    </div>
</section>
`;

class SectionBrand extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = sectionBrandTemplate.innerHTML;
  }
}

customElements.define('section-brand-element', SectionBrand);
