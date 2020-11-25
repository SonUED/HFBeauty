var quality = 0;
var qualityInp;
var CART_ARR = JSON.parse(localStorage.getItem("cartArr")) || [];
var currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
var totalSpanInBill = document.getElementById("totalFee");
var totalPre = document.getElementById("total");
var priceSpan = document.getElementById("price");
var soDonHang = JSON.parse(localStorage.getItem("soDonHang")) || 0;
const removeItemToCart = (maSP) => {
  CART_ARR.map((item, index) => {
    item.maSP == maSP ? CART_ARR.splice(index, 1) : " ";
  });
  localStorage.setItem("cartArr", JSON.stringify(CART_ARR));
  location.reload();
};
function getSaleIDByProductID(productID) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  todayProductSale = sales.filter((sale) => {
    let beginDate = new Date(sale.beginDate);
    let endDate = new Date(sale.endDate);
    let curDate = new Date();
    let currenDate = new Date(
      curDate.getFullYear() +
        "-" +
        (curDate.getMonth() + 1) +
        "-" +
        curDate.getDate()
    );

    if (
      beginDate <= currenDate &&
      currenDate <= endDate &&
      sale.products.includes(productID)
    )
      return true;
    return false;
  });

  if (!todayProductSale) return null;

  let maxSale = -1;
  let selectID = null;

  let sortedSale = todayProductSale.sort((s1, s2) => {
    parseInt(s2.discount) - parseInt(s1.discount);
  });
  return sortedSale[0];
}

const increase = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  qualityInp.value++;
  addToCart(maSP);
  total(priceSpan);
  total(totalPre);
};
const decrease = (maSP) => {
  qualityInp = document.getElementById(`quality${maSP}`);
  qualityInp.value * 1 == 0
    ? (qualityInp.value = 0)
    : (qualityInp.value = qualityInp.value * 1 - 1);
  addToCart(maSP);
  total(priceSpan);
  total(totalPre);
};
const total = (idInner) => {
  var totalCount = 0;
  CART_ARR.map((item) => {
    var discount =
      getSaleIDByProductID(item.maSP) == undefined
        ? 1
        : getSaleIDByProductID(item.maSP).discount;
    totalCount += Number((item.gia * item.quantity * discount) / 100);
  });
  idInner.innerHTML = Math.round(totalCount) + ".00";
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
                                    <span class="sub-text">Discount :</span> <span id="discount">${
                                      getSaleIDByProductID(maSP) == undefined
                                        ? 1
                                        : getSaleIDByProductID(maSP).discount
                                    }%</span>
                                    <input type="hidden" id="discountInp" value="getSaleIDByProductID('${maSP}')">
                                </div>
                                <span class="new-price">Rs. <span id="price${maSP}">${
    getSaleIDByProductID(maSP) == undefined
      ? gia * 1
      : (gia * getSaleIDByProductID(maSP).discount) / 100
  }</span></span>
                                <input type="hidden" id="priceInp" value="${
                                  gia / 100
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
  CART_ARR.map((item) => {
    const row = checkoutRow(item);
    document.getElementById("item-wrapper").innerHTML += row;
  });
  total(totalSpanInBill);
};
const displayCart = () => {
  currentCustomer == null
    ? (window.location.href = "../html/login.html")
    : CART_ARR.length > 0
    ? CART_ARR.map((cartItem) => {
        const row = createNewRow(cartItem);
        document.getElementById("products").innerHTML += row;
      })
    : (document.getElementById("noti").innerHTML = "Không có sản phẩm nào !");
  total(priceSpan);
  total(totalPre);
};
const closeModal = () => {
  document.getElementById("modals").style.display = "none";
};
const order = (event) => {
  event.preventDefault();
  var soDonHang = JSON.parse(localStorage.getItem("soDonHang")) || 0;
  const order = JSON.parse(localStorage.getItem("order")) || [];
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
