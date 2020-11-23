var label = [];
var data = [];
var tab = ["order", "products", "wait-for-take", "deliver", "received"];
var order = [];
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
  }

  var year = document.querySelector("#year").value;
  var month = document.querySelector("#month").value;
  label = [];
  data = [];

  if (mess) {
    listData = JSON.parse(localStorage.getItem(mess));
  }
  console.log(listData);

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
              beginAtZero: false,
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
// fetch("../../data/order.json")
//   .then((response) => response.json())
//   .then((data) => {
//     localStorage.setItem("order", JSON.stringify(data["order"]));
//   });
