// fetch("../../data/order.json")
//   .then((response) => response.json())
//   .then((data) => {
//     localStorage.setItem("order", JSON.stringify(data["order"]));
//   });

var order = [];

var trangThai = [
  "all",
  "wait-for-accept",
  "wait-for-take",
  "deliver",
  "received",
];

function showOder(mess) {
//   getOrderFromStorage();
  document.querySelector(".table-order").innerHTML = "";
  borderBottom(mess);
  var btnApply = "";
  var btnReject = "";
  document.querySelector(".apply").style.display = "none";
  document.querySelector(".reject").style.display = "none";

  order.map((item) => {
    if (mess === "wait-for-accept") {
      document.querySelector(".apply").style.display = "table-cell";
      document.querySelector(".reject").style.display = "table-cell";
      btnApply = `<td><input class="btn btn-success" type="button" value="OK" onclick="apply('${item.maDH}')"></td>`;
      btnReject = `<td><input class="btn btn-danger" type="button" value="Hủy" onclick="reject('${item.maDH}')"></td>`;
    }
    if (mess === "wait-for-take" || mess === "deliver") {
      document.querySelector(".apply").style.display = "table-cell";
      btnApply = `<td><input class="btn btn-success" type="button" value="OK" onclick="apply('${item.maDH}')"></td>`;
    }
    if (mess === item.trangThai || mess === "all") {
      var row = `<tr>
            <td> ${item.maDH} </td>
            <td> ${item.tenTaiKhoan} </td>
            <td> ${item.tenNguoiNhan} </td>
            <td> ${item.diaChi} </td>
            <td> ${item.SDT}</td>
            <td> ${item.ngayDat} </td>
            <td><b>${item.trangThai}</b> </td>
            ${btnApply}
            ${btnReject}
        </tr>`;
      document.querySelector(".table-order").innerHTML += row;
    }
  });
}

function apply(id) {

    order.map(item => {
        if (item.maDH === id) {

            item.trangThai = trangThai[trangThai.indexOf(item.trangThai)+1]

            showOder(trangThai[trangThai.indexOf(item.trangThai)-1]);
            console.log(order);

        }
    });
    console.log(order);


  saveOrderToStorage();
}

function reject(id) {
  getOrderFromStorage();
  order.map((item) => {
    if (item.maDH === id) {
      item.trangThai = "canceled";
      showOder("wait-for-accept");
    
    }
  });
  saveOrderToStorage();
}

function borderBottom(mess) {
  trangThai.map((item) => {
    if (item === mess) {
      document.querySelector("." + item).style.borderBottom =
        "3px solid orange";
    } else {
      document.querySelector("." + item).style.borderBottom = "0";
    }
  });
}

function getOrderFromStorage() {
  let orderString = localStorage.getItem("order");
  order = JSON.parse(orderString) || [];
}

function saveOrderToStorage() {
  let orderString = JSON.stringify(order);
  localStorage.setItem("order", orderString);
}

function loadData() {
  getOrderFromStorage();
  showOder("all");
}
