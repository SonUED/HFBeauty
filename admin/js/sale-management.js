var gCategories = gCategories || [];
var gProducts = gCategories || [];
var gSales = gCategories || [];
var detailSale = null;
class Sale {
  id = "";
  salename = "";
  description = "";
  discount = 0;
  beginDate = "";
  endDate = "";
  products = [];
  constructor() {
    let len = gSales.length;
    if (len > 0) {
      let id = gSales[gSales.length - 1].id;
      id = "KM" + (parseInt(id.slice(2, id.length)) + 1);
      this.id = id;
    } else {
      this.id = "KM1";
    }
  }
}

function loadSaleTable(sales) {
  let tblBody = document.querySelector("#tblBody");
  tblBody.innerHTML = "";

  sales.forEach((sale) => {
    tblBody.innerHTML += getRowBySale(sale);
  });
}

function getRowBySale(sale) {
  let row = `
    <tr>
      <td>${sale.id}</td>
      <td>${sale.salename}</td>
      <td>${sale.discount}%</td>
      <td>${sale.beginDate}</td>
      <td>${sale.endDate}</td>
      <td>${sale.description}</td>
      <td>
        <button class="btn btn-success" onclick="showForm('${sale.id}')">Sửa</button>
        <button class="btn btn-danger" onclick="deleteSale('${sale.id}')">Xoá</button>
      </td>
   </tr>
    `;
  return row;
}

function loadCategoryTab() {
  let tab = document.querySelector("#cateTab");
  let content = document.querySelector("#contentTab");

  tab.innerHTML = "";
  content.innerHTML = "";
  gCategories.forEach((cate) => {
    tab.innerHTML += getTabButtonByCate(cate);
    content.innerHTML += createContentTabByCate(cate);
  });

  document.getElementById("tabDM1").click();
}

function createContentTabByCate(cate) {
  let contentBox = "";
  contentBox += `
    <div id=${cate.maDM} class="tabcontent col-md-10">
      <div class="form-check form-check-inline col-md-5">
        <input
          class="form-check-input"
          type="checkbox"
          id="selectAll${cate.maDM}"
          value="${cate.maDM}"
          onClick="clickSelectAll(this)"
        />
        
        <label class="form-check-label" for="selectAll${cate.maDM}"
          >Chọn tất cả</label
        >
      </div>
      <input
        type="text"
        class="col-md-5"
        id="productSearch"
        name="productSearch"
        placeholder="Tìm kiếm sản phẩm"
      />
      ${createCheckboxListByCate(cate)}
    </div>
  `;
  return contentBox;
}

function createCheckboxListByCate(cate) {
  let products = gProducts.filter((product) => product.maDM === cate.maDM);
  let checkedProducts = detailSale.products;

  let checkboxes = "";
  products.forEach((product) => {
    let check;
    if (checkedProducts.includes(product.maSP)) {
      check = "checked='checked'";
    }
    checkboxes += `
      <div class="form-check form-check-inline col-md-5">
        <input
          class="form-check-input"
          type="checkbox"
          id="${product.maSP}"
          value="${product.maDM}"
          name="product"
          ${check}
        />
      
        <label class="form-check-label" for="${product.maSP}"
          >${product.tenSP}</label
        >
      </div>
    `;
  });
  return checkboxes;
}

function getTabButtonByCate(cate) {
  let tabButton = `
    <button 
      type="button"
      class="tablinks"
      onclick="openCate(event, '${cate.maDM}')"
      id=tab${cate.maDM}
    >
      ${cate.tenDM}
    </button>
  `;
  return tabButton;
}

function clickSelectAll(checkbox) {
  // Get all of product checkboxs
  let pChecks = document.querySelectorAll('[name="product"]');

  let cate = checkbox.value;
  pChecks.forEach((pCheck) => {
    if (pCheck.value == cate) pCheck.checked = checkbox.checked;
  });
}

/**
 * @return {Array<string>} List of id of checked products.
 */
function getSelectedProducts() {
  let products = document.querySelectorAll('[name="product"]:checked');
  let ids = [...products].map((product) => product.id);
  return ids;
}

function clickFinish() {
  let salename = frm.salename.value;
  let description = frm.description.value;
  let discount = frm.discount.value;
  let beginDate = frm.beginDate.value;
  let endDate = frm.endDate.value;

  detailSale = {
    id: detailSale.id,
    salename: salename,
    description: description,
    discount: discount,
    beginDate: beginDate,
    endDate: endDate,
    products: getSelectedProducts(),
  };

  let isExist = gSales.findIndex((sale) => sale.id == detailSale.id);
  if (isExist === -1) {
    gSales.push(detailSale);
    alert("Thêm dữ liệu thành công!");
  } else {
    gSales[isExist] = detailSale;
    alert("Sửa đổi dữ liệu thành công!");
  }
  saveSalesToStorage();
  loadSaleTable(gSales);
  toggleForm();
}

/**
 * @typedef {Object} sale
 * @return {Array<String>}
 */
function getProductsName(sale) {
  let ids = sale.products;
  let productsName = gProducts
    .filter((product) => ids.includes(product.maSP))
    .map((product) => product.tenSP);
  return productsName;
}

function clickCancel() {
  toggleForm();
}

function editSale(id) {
  alert(id);
}

function deleteSale(id) {
  gSales = gSales.filter((sale) => sale.id != id);
  saveSalesToStorage();
  loadSaleTable(gSales);
}

function getSalesFromStorage() {
  let salesString = localStorage.getItem("sales");
  gSales = JSON.parse(salesString) || [];
}

function saveSalesToStorage() {
  let salesString = JSON.stringify(gSales);
  localStorage.setItem("sales", salesString);
}

async function loadData() {
  getSalesFromStorage();
  let data = await fetchData("../../data/categories.json");
  gCategories = data.categories || [];
  data = await fetchData("../../data/products.json");
  gProducts = data.products || [];

  loadSaleTable(gSales);
}

function fetchData(link) {
  let data = fetch(link)
    .then((response) => response.json())
    .then((data) => data);
  return data;
}

function openCate(evt, category) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(category).style.display = "block";
  evt.currentTarget.className += " active";
}

function showForm(id) {
  toggleForm();
  let btnAdd = document.getElementById("btnAdd");
  let article = document.getElementsByClassName("title-article")[0];
  detailSale = getSaleByID(id) || new Sale();

  setFormField();
  loadCategoryTab();

  if (id == null) {
    btnAdd.textContent = "Thêm";
    article.textContent = "TẠO MỚI KHUYẾN MÃI";
  } else {
    btnAdd.textContent = "Cập nhật";
    article.textContent = "CẬP NHẬT KHUYẾN MÃI";
  }
}

function setFormField() {
  frm.salename.value = detailSale.salename;
  frm.description.value = detailSale.description;
  frm.discount.value = detailSale.discount;
  frm.beginDate.value = detailSale.beginDate;
  frm.endDate.value = detailSale.endDate;
}

function getSaleByID(id) {
  let sale = gSales.find((sale) => sale.id == id);
  return sale;
}

function toggleForm() {
  console.log("Hello");
  let frm = document.querySelector(".input-frm");
  let sales = document.querySelector(".show-sales");
  console.log(sales);
  frm.classList.toggle("d-none");
  sales.classList.toggle("d-none");
}

function searching(inputText) {
  inputText = inputText.toLowerCase().trim();
  inputText = inputText.replace(/\s\s+/g, " ");
  console.log(inputText);
  if (inputText == "") {
    loadSaleTable(gSales);
    return;
  }

  let keywords = inputText.split(" ");
  let sSales = gSales.filter((eachSale) => {
    return Object.keys(eachSale).some((key) => {
      return keywords.reduce(
        (acc, word) =>
          acc && eachSale[key].toString().toLowerCase().includes(word),
        true
      );
    });
  });
  loadSaleTable(sSales);
}
