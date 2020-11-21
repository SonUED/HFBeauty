var quality = 0;
var qualityInp;
const DISCOUNT = 50;
const CART_ARR = JSON.parse(localStorage.getItem("cartArr"));
var totalSpan = document.getElementById("total");
const increase = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  qualityInp.value++;
};
const decrease = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  qualityInp.value * 1 == 0
    ? (qualityInp.value = 0)
    : (qualityInp.value = qualityInp.value * 1 - 1);
};
const total = () => {
  var total = 0;
  const cartArr = JSON.parse(localStorage.getItem("cartArr"));
  cartArr.map((item) => {
    total += item.gia * item.quantity;
  });
  totalSpan.innerHTML = total + ".00";
};
const addToCart = (maSP) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
  qualityInp = document.getElementById(`quality${maSP}`);
  CART_ARR.map((item) => {
    item.quantity =
      item.maSP == maSP ? parseInt(qualityInp.value) : item.quantity;
  });
  localStorage.setItem("cartArr", JSON.stringify(CART_ARR));
  total();
};
const createNewRow = (cartItem, DISCOUNT) => {
  const {
    maSP,
    tenSP,
    maDM,
    gia,
    soLuong,
    hanSuDung,
    ngaySanXuat,
    thuongHieu,
    moTa,
    ngayNhap,
    quantity,
  } = cartItem;
  return `<div class="product-section row bg-white">
                    <div class="col-lg-4">
                        <div class="card-top">
                            <img src="../../img/Chambor_Rouge_Plum+_Lipstick.webp" class="img-fluid" alt="product-img" id="img" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card-body">
                            <input type="hidden" value="${maSP}"/>
                            <h5 class="card-title font-weight-bold" id="name${maSP}">${tenSP}</h5>
                            <div class="product-detail__brand">
                                <span class="strong-text-700">Brand:</span>${thuongHieu}
                            </div>
                            <div class="price-box">
                                <span class="old-price">
                                    <del class="text-muted">${gia}.000</del>
                                </span>
                                <div>
                                    <span class="sub-text">Discount :</span> <span id="discount">${DISCOUNT}%</span>
                                    <input type="hidden" id="discountInp" value="${DISCOUNT}">
                                </div>
                                <span class="new-price">Rs. <span id="price${maSP}">${
    (gia * DISCOUNT) / 100
  }</span></span>
                                <input type="hidden" id="priceInp" value="${
                                  (gia * DISCOUNT) / 100
                                }">
                            </div>
                            <div class="quantity">
                                <p class="quantity__title font-weight-bold">Quantity:</p>
                                <div class="quantity__group">
                                    <button class="quantity__minus" onclick="decrease('${maSP}')">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input class="quantity__content" id="quality${maSP}" type="number" value="${quantity}" />
                                    <button class="quantity__plus" onclick="increase('${maSP}')">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <a href="#" class="btn btn-primary add-to-cart-btn" onclick="removeItemToCart(${maSP})">REMOVE</a>
                                 <a href="#" class="btn btn-primary add-to-cart-btn" onclick="addToCart('${maSP}')">ADD TO CART</a>
                            </div>
                            
                        </div>
                    </div>
                </div>`;
};
const displayCart = () => {
  CART_ARR.map((cartItem) => {
    const row = createNewRow(cartItem, DISCOUNT);
    document.getElementById("products").innerHTML += row;
  });
};
displayCart();
