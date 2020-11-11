const productDetailTemplate = document.createElement('template');

productDetailTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="/component/product-detail/product-detail.style.css">
<div class="product-detail product-quick-view">
	<div class="row">
		<div class="col-lg-6">
			<div class="card-top">
				<div class="card-label"><strong>-15%</strong></div>
				<img
					id="product-img"
					src="#"
					class="img-fluid"
					alt="product-img"
				/>
			</div>
		</div>
		<div class="col-lg-6">
			<div class="card-body">
				<h5 class="card-title" id="product-name"></h5>
				<div class="product-detail__reviews">
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
				</div>
				<div class="product-detail__brand">
					<span class="strong-text-700">Brand:</span> <span id="product-brand"></span> 
				</div>
				<div class="product-detail__code">
					<span class="strong-text-700">Product Code:</span> <span id="product-code"></span>  
				</div>
				<div class="product-detail__cate">
					<span class="strong-text-700">Category:</span> <span id="product-cate"></span>  
				</div>
				<div class="price-box">
					<span class="old-price">
						<del class="text-muted">Rs. <span id="product-old-price"></span></del>
					</span>
					&nbsp;
					<span class="new-price">Rs. <span id="product-price"></span></span>
				</div>
				<div class="product-detail__des">
					<p id="product-des">
					</p>
				</div>
				<div class="quantity">
					<p class="quantity__title strong-text-700">Quantity:</p>

					<div class="quantity__group">
						<button class="quantity__minus">
							<i class="fas fa-minus"></i>
						</button>
						<input class="quantity__content" type="number" value="0" />
						<button class="quantity__plus">
							<i class="fas fa-plus"></i>
						</button>
					</div>

					<p class="quantity__subtotal">
						Subtotal: <span class="strong-text-700">Rs. 718.00</span>
					</p>
				</div>
				<a href="#" class="btn btn-primary add-to-cart-btn">ADD TO CART</a>
				<slot name="buy-it-now-btn"></slot>
				<div class="product-detail__seen">
					<i class="fas fa-eye"></i>
					100 customers are viewing this product
				</div>
			</div>
		</div>
	</div>
</div>`;

class Product extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = productDetailTemplate.innerHTML;
  }
}

customElements.define('product-detail-element', Product);
