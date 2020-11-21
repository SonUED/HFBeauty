var currentCustomer = {
  tenTaiKhoan: "nva",
  tenKH: "Nguyen Van A",
  ngaySinh: "1/1/1999",
  anhDaiDien:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
  mail: "nva@gmail.com",
  soDienThoai: "0123456789",
  diaChi: "1 Hoa Lien Hoa Vang",
};

var order = [
  {
    maDH: 0,
    tenTaiKhoan: "nva",
    nguoiNhan: "Nguyen van a",
    diaChi: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
    SDT: "0123456789",
    ngayDat: "23/05/2020",
    trangThai: "received",
  },
  {
    maDH: 1,
    tenTaiKhoan: "nva",
    nguoiNhan: "Nguyen van a",
    diaChi: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
    SDT: "0123456789",
    ngayDat: "23/05/2020",
    trangThai: "received",
  },
  {
    maDH: 2,
    tenTaiKhoan: "nva",
    nguoiNhan: "Nguyen van a",
    diaChi: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
    SDT: "0123456789",
    ngayDat: "23/05/2020",
    trangThai: "received",
  },
];

var detailOrder = [
  {
    maDH: 0,
    maSP: "SP1",
    soLuong: 1,
  },
  {
    maDH: 1,
    maSP: "SP1",
    soLuong: 1,
  },
  {
    maDH: 2,
    maSP: "SP3",
    soLuong: 1,
  },
  {
    maDH: 1,
    maSP: "SP2",
    soLuong: 1,
  },
];

var products = [
  {
    maSP: "SP1",
    tenSP: "Son kem đỏ Nivea 1",
    maDM: "DM2",
    gia: 21,
    soLuong: 7,
    hanSuDung: "2 năm kể từ ngày sản xuất.",
    ngaySanXuat: "Xem trên bao bì sản phẩm.",
    thuongHieu: "Nivea",
    moTa:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam laboriosam fugiat eum nihil deserunt odio velit iure repellendus hic suscipit eius voluptas repudiandae enim ex consectetur assumenda commodi, nisi alias.",
    ngayNhap: "2020-10-27T13:29:31.665Z",
    anh:
      "https://product.hstatic.net/200000135107/product/nars_63ec89ba528741d29bd3b7b1fedbbe6e_55624ac18ab04f268bfb6d2bc5f66a05_master.jpg",
  },
  {
    maSP: "SP2",
    tenSP: "Son kem đỏ Nivea 2",
    maDM: "DM2",
    gia: 21,
    soLuong: 7,
    hanSuDung: "2 năm kể từ ngày sản xuất.",
    ngaySanXuat: "Xem trên bao bì sản phẩm.",
    thuongHieu: "Nivea",
    moTa:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam laboriosam fugiat eum nihil deserunt odio velit iure repellendus hic suscipit eius voluptas repudiandae enim ex consectetur assumenda commodi, nisi alias.",
    ngayNhap: "2020-10-27T13:29:31.665Z",
    anh:
      "https://product.hstatic.net/200000135107/product/nars_63ec89ba528741d29bd3b7b1fedbbe6e_55624ac18ab04f268bfb6d2bc5f66a05_master.jpg",
  },
  {
    maSP: "SP3",
    tenSP: "Son kem đỏ Nivea 3",
    maDM: "DM2",
    gia: 21,
    soLuong: 7,
    hanSuDung: "2 năm kể từ ngày sản xuất.",
    ngaySanXuat: "Xem trên bao bì sản phẩm.",
    thuongHieu: "Nivea",
    moTa:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam laboriosam fugiat eum nihil deserunt odio velit iure repellendus hic suscipit eius voluptas repudiandae enim ex consectetur assumenda commodi, nisi alias.",
    ngayNhap: "2020-10-27T13:29:31.665Z",
    anh:
      "https://product.hstatic.net/200000135107/product/nars_63ec89ba528741d29bd3b7b1fedbbe6e_55624ac18ab04f268bfb6d2bc5f66a05_master.jpg",
  },
];

localStorage.setItem("currentCustomer", JSON.stringify(currentCustomer));
localStorage.setItem("order", JSON.stringify(order));
localStorage.setItem("detailOrder", JSON.stringify(detailOrder));
localStorage.setItem("products", JSON.stringify(products));

var judge = [];
var myDetailOrder = [];
var myOrder = [];
var trangThai = ['all','wait-for-accept', 'wait-for-take', 'deliver','received', 'canceled'];


function show(mess) {
  document.querySelector(".table-order").innerHTML = "";

  getDataFromStorage();
  getMyDetailOrder(mess);
  showDataTable(mess);
}
function getOrderFromStorage() {
  let orderString = localStorage.getItem("order");
  order = JSON.parse(orderString) || [];
}

function saveOrderToStorage() {
  let orderString = JSON.stringify(order);
  localStorage.setItem("order", orderString);
}
function showDataTable(mess) {
  borderBottom(mess);

  var btnCancel = "";
  var btnJudge = "";
  var colth = 3;
  var coltt = 3;

  myDetailOrder.map((item) => {
    if (mess === "wait-for-accept") {
      colth = 3;
      coltt = 2;

      btnCancel = ` <td>
            <button class="btn btn-danger" onclick="cancel(${item[0].maDH})">Hủy</button>
          </td>`;
    }
    if (mess === "received") {
      colth = 4;
      coltt = 4;
    }

    var sum = 0;
    var thead = `<tr>
        <th colspan="${colth}" class="table-head">Đơn hàng ${item[0].maDH}</th>
      </tr>`;
    document.querySelector(".table-order").innerHTML += thead;

    item.map((detail) => {
      if (mess === "received") {
        if (checkJudge(detail.maSP) === false) {
          btnJudge = `<td>
            <button class="open-button btn btn-primary" onclick="showFormJudge('${detail.maSP}')">Đánh giá</button>
          </td>`;
        } else {
          btnJudge = `<td>
            <p><b>Đã Đánh giá</b></p>
          </td>`;
        }
        
      }
      products.map((prd) => {
        if (prd.maSP === detail.maSP) {
          sum += detail.soLuong * prd.gia;
          var row = `<tr>
                <td><img src="${prd.anh}" alt=""></td>
                <td>
                <p>${prd.tenSP}</p>
                <small>Số lương: ${detail.soLuong}</small>
                </td>
                <td><b>${detail.soLuong * prd.gia}$</b></td>
                ${btnJudge}
            </tr>`;
          document.querySelector(".table-order").innerHTML += row;
        }
      });
    });
    var total = `<tr  class="total">
        <td colspan="${coltt}">Tổng tiền:<b>${sum}$</b></td>
        ${btnCancel}
      </tr>
      <br>`;
    document.querySelector(".table-order").innerHTML += total;
  });
}

function getMyDetailOrder(mess) {
  if (mess === "all") {
    myOrder = order.filter(
      (item) => item.tenTaiKhoan === currentCustomer.tenTaiKhoan
    );
  } else {
    myOrder = order.filter(
      (item) =>
        item.tenTaiKhoan === currentCustomer.tenTaiKhoan &&
        item.trangThai === mess
    );
  }

  myDetailOrder = myOrder.map((item) => {
    return detailOrder.filter((myOrder) => myOrder.maDH === item.maDH);
  });

  myDetailOrder = myDetailOrder.filter((item) => item.length > 0);
}

function cancel(maDH) {
  getOrderFromStorage();

  order.map((item) => {
    if (item.maDH === maDH) {
      item.trangThai = "canceled";
    }
  });
  console.log(order);

  saveOrderToStorage();
  show("wait-for-accept");
}

function showFormJudge(maSP) {
  var display = document.querySelector(".form-judge").style.display;
  document.querySelector("#maSP").value = maSP;

  clearForm();

  if (display === "block") {
    document.querySelector(".form-judge").style.display = "none";
  } else {
    document.querySelector(".form-judge").style.display = "block";
  }
}
function clearForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#star5").checked = true;
  document.querySelector("#content").value = "";
}

function sentJudge() {
  getJudgeFromStorage();
  var maSP = document.querySelector("#maSP").value;
  var title = document.querySelector("#title").value;
  var content = document.querySelector("#content").value;
  var rate;
  console.log(maSP);

  if (document.getElementById("star1").checked) {
    rate = document.getElementById("star1").value;
  }
  if (document.getElementById("star2").checked) {
    rate = document.getElementById("star2").value;
  }
  if (document.getElementById("star3").checked) {
    rate = document.getElementById("star3").value;
  }
  if (document.getElementById("star4").checked) {
    rate = document.getElementById("star4").value;
  }
  if (document.getElementById("star5").checked) {
    rate = document.getElementById("star5").value;
  }
  var jud = {
    tenTaiKhoan: currentCustomer.tenTaiKhoan,
    maSP: maSP,
    thoiGian: new Date(),
    tieuDe: title,
    noiDung: content,
    soSao: rate,
  };
  judge.push(jud);
  saveJudgeToStorage();
  showFormJudge();
  show("received");
}

function checkJudge(maSP) {
  getDataFromStorage();
  var check = [];
  judge.map((item) => {
    if (item.tenTaiKhoan === currentCustomer.tenTaiKhoan) {
      check.push(item.maSP);
    }
  });
  if (check.indexOf(maSP) < 0) {
    return false;
  } else {
    return true;
  }
}

function borderBottom(mess) {
  trangThai.map((item) => {
    if (item === mess) {
      document.querySelector("." + item).style.borderBottom = "3px solid orange";
    } else {
      document.querySelector("." + item).style.borderBottom = "0";
    }
  });
}

function getDataFromStorage() {
  let customerString = localStorage.getItem("currentCustomer");
  let orderString = localStorage.getItem("order");
  let detailOderString = localStorage.getItem("detailOrder");
  let productsString = localStorage.getItem("products");

  currentCustomer = JSON.parse(customerString) || [];
  order = JSON.parse(orderString) || [];
  detailOrder = JSON.parse(detailOderString) || [];
  products = JSON.parse(productsString) || [];
}

function getJudgeFromStorage() {
  let judgeString = localStorage.getItem("judge");
  judge = JSON.parse(judgeString) || [];
}

function saveOrderToStorage() {
  let orderString = JSON.stringify(order);
  localStorage.setItem("order", orderString);
}

function saveJudgeToStorage() {
  let judgeString = JSON.stringify(judge);
  localStorage.setItem("judge", judgeString);
}

