var quality = 0;
var qualityInp;
const DISCOUNT = 50;
const CART_ARR = JSON.parse(localStorage.getItem("cartArr")) || [];
const SHIP_FEE = 30;
var totalSpanInBill = document.getElementById("totalFee");
var totalPre = document.getElementById("total");
var priceSpan = document.getElementById("price");
var soDonHang = JSON.parse(localStorage.getItem("soDonHang")) || 0;
const removeItemToCart = (maSP) => {
  console.log(maSP);
  CART_ARR.map((index, item) => {
    item.maSP == maSP ? CART_ARR.slice(index, 1) : " ";
  });
  console.log(CART_ARR);
};
const increase = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  qualityInp.value++;
  addToCart(maSP);
  total(priceSpan, 1);
  total(totalPre, 0.5);
};
const decrease = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  qualityInp.value * 1 == 0
    ? (qualityInp.value = 0)
    : (qualityInp.value = qualityInp.value * 1 - 1);
  addToCart(maSP);
  total(priceSpan, 1);
  total(totalPre, 0.5);
};
const total = (idInner, discount = 1, shipFee = 0) => {
  var totalCount = 0;
  CART_ARR.map((item) => {
    totalCount += Number(item.gia * item.quantity * discount);
  });
  idInner.innerHTML = Math.round(totalCount + shipFee) + ".00";
};
const addToCart = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  CART_ARR.map((item) => {
    item.quantity =
      item.maSP == maSP ? parseInt(qualityInp.value) : item.quantity;
  });
  localStorage.setItem("cartArr", JSON.stringify(CART_ARR));
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
                                <a href="#" class="btn btn-primary add-to-cart-btn" onclick="removeItemToCart('${maSP}')">REMOVE</a>
                            </div>
                            
                        </div>
                    </div>
                </div>`;
};
const checkoutRow = (item) => {
  const row = `<div class="item">
              <span><img src="${item.anh}" alt="img" /></span>
              <span class="name">${item.tenSP}</span>
              <span class="quantity">${item.quantity} sp</span>
              <span class="sub_total">${Number(
                item.quantity * item.gia
              )}.00 VNĐ</span>
            </div>`;
  return row;
};
const checkoutModalDisplay = () => {
  document.getElementById("modals").style.display = "block";
  document.getElementById("shipFee").innerHTML = SHIP_FEE;
  CART_ARR.map((item) => {
    const row = checkoutRow(item);
    document.getElementById("item-wrapper").innerHTML += row;
  });
  total(totalSpanInBill, 0.5, SHIP_FEE);
};
const displayCart = () => {
  CART_ARR.length > 0
    ? CART_ARR.map((cartItem) => {
        const row = createNewRow(cartItem, DISCOUNT);
        document.getElementById("products").innerHTML += row;
      })
    : (document.getElementById("noti").innerHTML = "Không có sản phẩm nào !");
  total(priceSpan);
  total(totalPre, 0.5);
};
const closeModal = () => {
  document.getElementById("modals").style.display = "none";
};
const order = (event) => {
  event.preventDefault();
  var soDonHang = JSON.parse(localStorage.getItem("soDonHang")) || 0;
  const order = JSON.parse(localStorage.getItem("order"));
  var currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
  var maDH = "DH" + soDonHang + 1;
  var date = new Date();
  const newOrder = {
    ...currentCustomer,
    maDH: maDH,
    ngayDatHang: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
  };
  order.push(newOrder);
  const chiTietDonHang = { ...CART_ARR, maDH: maDH };
  localStorage.setItem("order", JSON.stringify(order));
  localStorage.setItem("chiTietDonHang", JSON.stringify(chiTietDonHang));
  document.getElementById("modals").style.display = "none";
  localStorage.setItem("cartArr", JSON.stringify([]));
};
displayCart();
