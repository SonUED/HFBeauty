var qualityInp = document.getElementById("quality");
// const maSP = document.getElementById("maSP").value;
const subTotalSpan = document.getElementById("subtotal");
const products = JSON.parse(localStorage.getItem("products"));
<<<<<<< HEAD
const recentlyViewdArr = JSON.parse(localStorage.getItem("recentlyViewed"));
=======
>>>>>>> added cart func
var quality = 0;

var cartArr = [];
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
const existCartItem = (maSPToAdd) => {
  var founnd = cartArr.filter((cartItem) => {
    return cartItem.maSP === maSPToAdd;
  });
  return founnd;
};
const addToCart = (maSPToAdd) => {
  qualityInp == null ? (quality = 1) : (quality = qualityInp.value);
  const productToAdd = findProductFromId(maSPToAdd)[0];
  if (existCartItem(maSPToAdd).length > 0) {
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
