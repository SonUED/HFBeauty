const recentlyViewedProductsTemplate = document.createElement("template");
var recentlyViewdArr = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
var cartArr = JSON.parse(localStorage.getItem("cartArr"));

recentlyViewedProductsTemplate.innerHTML = `
<section class="recently-viewed-products">
<link rel="stylesheet" type="text/css" href="/component/recently-viewd-products/recently-viewed-product.style.css">
<section class="recently-viewed-products">
    <div class="recently-viewed-products__title">
    <h3>RECENTLY VIEWED PRODUCTS</h3>
    </div>
    <div class="recently-viewed-products__product">
    <div class="row" id="recently">
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
const createNewCardItem = (product) => {
  const row = `<div class="col-20 collection__item">
           <div class="card text-center">
            <div class="card-top">
            <div class="card-label"><strong>-15%</strong></div>
            <div class="card-quick-view-btn"><span>QUICK VIEW</span></div>
            <img
                src="${product.anh}"
                class="card-img-top"
                alt="..."
            />
            </div>
            <div class="card-body">
            <h6 class="card-subtitle">${product.thuongHieu}</h6>
            <h5 class="card-title">${product.tenSP}</h5>
            <div class="price-box">
                <span class="old-price">
                <del class="text-muted">Rs. 845.00</del>  
                </span>
                &nbsp;
                <span class="new-price">Rs. ${product.gia}.00</span>
            </div>

            <a href="#" class="btn btn-primary" onclick="addToCartInRecent('${product.maSP}')">ADD TO CART</a>
            </div>
        </div>
        </div>`;
  return row;
};

customElements.define(
  "recently-viewed-products-element",
  RecentlyViewedProducts
);
const displayRecent = () => {
  console.log("recentt");
  recentlyViewdArr.map((item) => {
    var row = createNewCardItem(item);
    document.getElementById("recently").innerHTML += row;
  });
};
// ADD TO CART
const findProduct = (maSPToAdd) => {
  return products.filter((product) => {
    return product.maSP == maSPToAdd;
  });
};
const existCartItem = (maSPToAdd) => {
  var founnd = cartArr.filter((cartItem) => {
    return cartItem.maSP === maSPToAdd;
  });
  return founnd;
};
const addToCartInRecent = (maSPToAdd) => {
  const productToAdd = findProduct(maSPToAdd)[0];
  if (existCartItem(maSPToAdd).length > 0) {
    cartArr = cartArr.map((cartItem) =>
      cartItem.maSP == productToAdd.maSP
        ? {
            ...productToAdd,
            quantity: Number(cartItem.quantity) + 1,
          }
        : cartItem
    );
  } else {
    cartArr = [...cartArr, { ...productToAdd, quantity: 1 }];
  }
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
};
displayRecent();
