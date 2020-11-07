var gCategories = [
  {
    maDM: "DM001",
    tenDM: "Son môi",
    mota: "Son tô môi cho phụ nữ",
    anh:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMBSJqT3LWBxOdcd6AMAnbkDmDfDib55q6yw&usqp=CAU",
  },
  {
    maDM: "DM002",
    tenDM: "Phấn",
    mota: "Phấn má cho phụ nữ",
    anh:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMBSJqT3LWBxOdcd6AMAnbkDmDfDib55q6yw&usqp=CAU",
  },
  {
    maDM: "DM003",
    tenDM: "Nước hoa",
    mota: "Nước hoa cho phụ nữ",
    anh:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMBSJqT3LWBxOdcd6AMAnbkDmDfDib55q6yw&usqp=CAU",
  },
];

var gSales = [];

function loadSaleTable() {
  let tblBody = document.querySelector("#tblBody");
  let no = 0;
  tblBody.innerHTML = "";

  gSales.forEach((sale) => {
    tblBody.innerHTML += `
    <tr>
      <td>${sale.id}</td>
      <td>${sale.salename}</td>
      <td>${sale.discount}</td>
      <td>${sale.beginDate}</td>
      <td>${sale.endDate}</td>
      <td>${sale.description}</td>
      <td>${getCategoryName(sale)}</td>
      <td>
        <button class="btn btn-success" onclick="editSale(${
          sale.id
        })">Sửa</button>
        <button class="btn btn-danger" onclick="deleteSale(${
          sale.id
        })">Xoá</button>
      </td>
   </tr>
    `;
  });
}

// function getCate

function loadFormCategories() {
  let e = document.querySelector("#cateSelecting");
  gCategories.forEach((cate) => {
    e.innerHTML += `
    <div class="form-check form-check-inline col-md-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="${cate.maDM}"
        value="${cate.maDM}"
        name="category"
      />
      <label class="form-check-label" for="${cate.maDM}"
        >${cate.tenDM}</label
      >
    </div>
    `;
  });
}

function clickAdd() {
  let id = gSales.length;
  let salename = frm.salename.value;
  let description = frm.description.value;
  let discount = frm.discount.value;
  let beginDate = frm.beginDate.value;
  let endDate = frm.endDate.value;

  let newSale = {
    id: id,
    salename: salename,
    description: description,
    discount: discount,
    beginDate: beginDate,
    endDate: endDate,
    categories: getSelectedCategories(),
  };
  gSales.push(newSale);
  saveSalesToStorage();
  loadSaleTable();
  console.log(newSale);
}

function getCategoryName(sale) {
  let ids = sale.categories;
  let cateNames = gCategories
    .filter((cate) => ids.includes(cate.maDM))
    .map((cate) => cate.tenDM);
  return cateNames;
}

function getSelectedCategories() {
  let categories = document.querySelectorAll('[name="category"]:checked');
  // console.log(categories);
  let ids = [...categories].map((cate) => cate.value);
  return ids;
}

function clickCancel() {
  alert("This is cancel");
}

function editSale(id) {
  alert(id);
}

function deleteSale(id) {
  gSales = gSales.filter((sale) => sale.id != id);
  saveSalesToStorage();
  loadSaleTable();
}

function getSalesFromStorage() {
  let salesString = localStorage.getItem("sales");
  gSales = JSON.parse(salesString) || [];
}

function saveSalesToStorage() {
  let salesString = JSON.stringify(gSales);
  localStorage.setItem("sales", salesString);
}

function loadData() {
  getSalesFromStorage();

  loadSaleTable();
  loadFormCategories();
}
