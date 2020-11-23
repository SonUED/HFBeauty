const recentlyViewedProductsTemplate = document.createElement('template');

recentlyViewedProductsTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="/component/recently-viewd-products/recently-viewed-product.style.css">
<section class="recently-viewed-products">
    <div class="recently-viewed-products__title">
    <h3>RECENTLY VIEWED PRODUCTS</h3>
    </div>
    <div class="recently-viewed-products__product">
    <div class="row">
        <div class="col-20 collection__item">
        <div class="card text-center">
            <div class="card-top">
            <div class="card-label"><strong>-15%</strong></div>
            <div class="card-quick-view-btn"><span>QUICK VIEW</span></div>
            <img
                src="../../img/Chambor_Rouge_Plum+_Lipstick.webp"
                class="card-img-top"
                alt="..."
            />
            </div>
            <div class="card-body">
            <h6 class="card-subtitle">Chambor</h6>
            <h5 class="card-title">Chambor Rouge Plum+ Lipstick</h5>
            <div class="price-box">
                <span class="old-price">
                <del class="text-muted">Rs. 845.00</del>
                </span>
                &nbsp;
                <span class="new-price">Rs. 718.00</span>
            </div>

            <a href="#" class="btn btn-primary add-to-cart-btn" onclick="addToCart('SP2')">ADD TO CART</a>
            </div>
        </div>
        </div>
    </div>
    </div>
</section>
`;

class RecentlyViewedProducts extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = recentlyViewedProductsTemplate.innerHTML;
	}
}

customElements.define(
	'recently-viewed-products-element',
	RecentlyViewedProducts
);
