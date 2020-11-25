const products = JSON.parse(localStorage.getItem("products"));
const detailProductCode = localStorage.getItem("detailProductCode");
var qualityInp = document.getElementById("quality");
const subTotalSpan = document.getElementById("subtotal");
var quality = 0;

const addBuyItNowBtn = () => {
  const slotBuy = document.querySelector('slot[name="buy-it-now-btn"]');

  const buyItNowBtn = document.createElement("span");

  buyItNowBtn.innerHTML =
    '<a href="#" class="btn btn-primary buy-it-now-btn">BUY IT NOW</a>';

  slotBuy.parentElement.replaceChild(buyItNowBtn, slotBuy);
};
addBuyItNowBtn();

let displayProduct = (product) => {
  const imgE = document.querySelector("product-detail-element #product-img");
  const nameE = document.querySelector("product-detail-element #product-name");
  const brandE = document.querySelector(
    "product-detail-element #product-brand"
  );
  const codeE = document.querySelector("product-detail-element #product-code");
  const priceE = document.querySelector(
    "product-detail-element #product-price"
  );
  const oldPriceE = document.querySelector(
    "product-detail-element #product-old-price"
  );
  const desE = document.querySelector("product-detail-element #product-des");
  const cateE = document.querySelector("product-detail-element #product-cate");

  imgE.src = product.anh;
  nameE.textContent = product.tenSP;
  brandE.textContent = product.thuongHieu;
  codeE.textContent = product.maSP;
  oldPriceE.textContent = product.gia;
  priceE.textContent = ((parseInt(product.gia) / 100) * 85).toFixed(2);
  desE.textContent = product.moTa;

  const categories = JSON.parse(localStorage.getItem("categories"));

  for (let index = 0; index < categories.length; index++) {
    if (categories[index].maDM === product.maDM) {
      cateE.textContent = categories[index].tenDM;
      break;
    }
  }
};

const getProduct = () => {
  const product = products.find((product) => product.maSP == detailProductCode);
  displayProduct(product);
};

const increase = () => {
  qualityInp.value = ++quality;
  subTotalSpan.innerHTML = quality * 100;
};
const decrease = () => {
  quality == 0
    ? (quality = 0)
    : ((qualityInp.value = --quality),
      (subTotalSpan.innerHTML = quality * 100));
};
const findProductFromId = (maSPToAdd) => {
  return products.filter((product) => {
    return product.maSP == maSPToAdd;
  });
};
const existCartItemInDetail = (maSPToAdd) => {
  var founnd = cartArr.filter((cartItem) => {
    return cartItem.maSP === maSPToAdd;
  });
  return founnd;
};
const addToCartInDetail = (maSPToAdd) => {
  qualityInp == null ? (quality = 1) : (quality = qualityInp.value);
  const productToAdd = findProductFromId(maSPToAdd)[0];
  if (existCartItemInDetail(maSPToAdd).length > 0) {
    cartArr = cartArr.map((cartItem) =>
      cartItem.maSP == productToAdd.maSP
        ? {
            ...productToAdd,
            quantity: Number(cartItem.quantity) + Number(quality),
          }
        : cartItem
    );
  } else {
    cartArr = [...cartArr, { ...productToAdd, quantity: quality }];
  }
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
};

document.getElementById("addToCart").addEventListener("click", () => {
  addToCartInDetail(detailProductCode);
});
