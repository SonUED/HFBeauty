var label = [];
var data = [];
var tab = ["order", "products", "revenue"];
var order = [];
var detailOrder = [];
var products = [];
var listData = [];
var nameOfDate = "";
function showChart(mess) {
  borderBottom(mess);
  filterSelection(mess);
}

function filterSelection(mess) {
  switch (mess) {
    case "order":
      nameOfDate = "ngayDat";
      break;
    case "products":
      nameOfDate = "ngayNhap";
      break;
    case "revenue":
      nameOfDate = "ngayDat";
      break;
  }

  var tab = document.querySelector(".revenue").style.borderBottom;
  var year = document.querySelector("#year").value;
  var month = document.querySelector("#month").value;
  label = [];
  data = [];

  console.log(tab);

  if (mess) {
    if (mess === "revenue") {
      detailOrder = JSON.parse(localStorage.getItem("detailOrder"));
      order = JSON.parse(localStorage.getItem("order"));
      products = JSON.parse(localStorage.getItem("products"));
    } else {
      listData = JSON.parse(localStorage.getItem(mess));
    }
  }
  if (tab !== "0px") {
    for (let i = 1; i < 32; i++) {
      var sum = 0;
      label.push(i);
      var temp = order.filter(
        (item) =>
          parseInt(item[nameOfDate].split("-")[2]) == i &&
          parseInt(item[nameOfDate].split("-")[0]) == year &&
          parseInt(item[nameOfDate].split("-")[1]) == month &&
          item.trangThai !== "canceled"
      );
      temp = temp.filter((item) =>
        detailOrder.filter((detail) => detail.maDH === item.maDH)
      );
      var detail = temp.map((order) =>
        detailOrder.filter((detail) => detail.maDH === order.maDH)
      );
      detail.map((detail) => {
        products.map((prd) => {
          detail.map((dt) =>  sum += prd.gia * dt.soLuong)
        });
      });
      data.push(sum);
    }
  }else {
    for (let i = 1; i < 32; i++) {
      label.push(i);
      var temp = listData.filter(
        (item) =>
          parseInt(item[nameOfDate].split("-")[2]) == i &&
          parseInt(item[nameOfDate].split("-")[0]) == year &&
          parseInt(item[nameOfDate].split("-")[1]) == month
      );
      data.push(temp.length);
    }
  }

  drawChart();
}
function borderBottom(mess) {
  tab.map((item) => {
    if (item === mess) {
      document.querySelector("." + item).style.borderBottom =
        "3px solid orange";
    } else {
      document.querySelector("." + item).style.borderBottom = "0";
    }
  });
}

function drawChart() {
  "use strict";

  feather.replace();

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    
    type: "line",
    data: {
      labels: label,
      datasets: [
        {
          data: data,
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderWidth: 4,
          pointBackgroundColor: "#007bff",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
}
function fetchOrderToLocalstorage() {
  fetch("../../data/order.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("order", JSON.stringify(data["order"]));
    });
}
