
var order = [
    {
      maDH: 0,
      tenTaiKhoan: "nva",
      nguoiNhan: "Nguyen van a",
      diaChi: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
      SDT: "0123456789",
      ngayDat: "23/05/2020",
      trangThai: "wait for take",
    },
    {
      maDH: 1,
      tenTaiKhoan: "nva",
      nguoiNhan: "Nguyen van a",
      diaChi: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
      SDT: "0123456789",
      ngayDat: "23/05/2020",
      trangThai: "wait for accept",
    },
    {
      maDH: 2,
      tenTaiKhoan: "nva",
      nguoiNhan: "Nguyen van a",
      diaChi: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
      SDT: "0123456789",
      ngayDat: "23/05/2020",
      trangThai: "wait for accept",
    },
  ];

var trangThaies = ['wait for accept', 'wait for take', 'deliver','received']
// localStorage.setItem("order", JSON.stringify(order));

function showOder(mess) {
    document.querySelector(".table-order").innerHTML = ""
    // order = getOrderFromStorage();
    switch (mess) {
        case "all": 
            document.querySelector(".apply").style.display = "none";
            document.querySelector(".reject").style.display = "none";

            order.map(item => { 
                var row = '<tr>' + 
                        '<td>' +item.maDH+ '</td>'+
                        '<td>' +item.tenTaiKhoan+ '</td>'+
                        '<td>' +item.nguoiNhan+ '</td>'+
                        '<td>' +item.diaChi+ '</td>'+
                        '<td>' +item.SDT+ '</td>'+
                        '<td>' +item.ngayDat+ '</td>'+
                        '<td>' +item.trangThai+ '</td>'+
                    '</tr>'
                document.querySelector(".table-order").innerHTML += row;
            })
            break;
        case "wait for accept": 
            document.querySelector(".apply").style.display = " table-cell";
            document.querySelector(".reject").style.display = " table-cell";

            order.map(item => { 
                if (item.trangThai === "wait for accept"){
                    var row = '<tr>' + 
                        '<td>' +item.maDH+ '</td>'+
                        '<td>' +item.tenTaiKhoan+ '</td>'+
                        '<td>' +item.nguoiNhan+ '</td>'+
                        '<td>' +item.diaChi+ '</td>'+
                        '<td>' +item.SDT+ '</td>'+
                        '<td>' +item.ngayDat+ '</td>'+
                        '<td>' +item.trangThai+ '</td>'+
                        '<td><input class="btn btn-success" type="button" value="OK" onclick="apply(' + item.maDH + ')"></td>'+
                        '<td><input class="btn btn-danger" type="button" value="Hủy" onclick="reject(' + item.maDH + ')"></td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "wait for take": 
            document.querySelector(".apply").style.display = " table-cell";
            document.querySelector(".reject").style.display = "none";

            order.map(item => { 
                if (item.trangThai === "wait for take"){
                    var row = '<tr>' + 
                        '<td>' +item.maDH+ '</td>'+
                        '<td>' +item.tenTaiKhoan+ '</td>'+
                        '<td>' +item.nguoiNhan+ '</td>'+
                        '<td>' +item.diaChi+ '</td>'+
                        '<td>' +item.SDT+ '</td>'+
                        '<td>' +item.ngayDat+ '</td>'+
                        '<td>' +item.trangThai+ '</td>'+
                        '<td><input class="btn btn-success" type="button" value="OK" onclick="apply(' + item.maDH + ')"></td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "deliver": 
            document.querySelector(".apply").style.display = " table-cell";
            document.querySelector(".reject").style.display = "none";
                
            order.map(item => { 
                if (item.trangThai === "deliver"){
                    var row = '<tr>' + 
                        '<td>' +item.maDH+ '</td>'+
                        '<td>' +item.tenTaiKhoan+ '</td>'+
                        '<td>' +item.nguoiNhan+ '</td>'+
                        '<td>' +item.diaChi+ '</td>'+
                        '<td>' +item.SDT+ '</td>'+
                        '<td>' +item.ngayDat+ '</td>'+
                        '<td>' +item.trangThai+ '</td>'+
                        '<td><input class="btn btn-success" type="button" value="OK" onclick="apply(' + item.maDH + ')"></td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "received": 
            document.querySelector(".apply").style.display = "none";
            document.querySelector(".reject").style.display = "none";
                
            order.map(item => { 
                if (item.trangThai === "received"){
                    var row = '<tr>' + 
                        '<td>' +item.maDH+ '</td>'+
                        '<td>' +item.tenTaiKhoan+ '</td>'+
                        '<td>' +item.nguoiNhan+ '</td>'+
                        '<td>' +item.diaChi+ '</td>'+
                        '<td>' +item.SDT+ '</td>'+
                        '<td>' +item.ngayDat+ '</td>'+
                        '<td>' +item.trangThai+ '</td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        default:
            document.querySelector(".apply").style.display = "none";
            document.querySelector(".reject").style.display = "none";

            order.map(item => { 
                var row = '<tr>' + 
                        '<td>' +item.maDH+ '</td>'+
                        '<td>' +item.tenTaiKhoan+ '</td>'+
                        '<td>' +item.nguoiNhan+ '</td>'+
                        '<td>' +item.diaChi+ '</td>'+
                        '<td>' +item.SDT+ '</td>'+
                        '<td>' +item.ngayDat+ '</td>'+
                        '<td>' +item.trangThai+ '</td>'+
                    '</tr>'
                document.querySelector(".table-order").innerHTML += row;
            })
            break;  
    }
}

function apply(id){
    console.log(order);
    order.map(item => {
        if (item.maDH === id) {
            item.trangThai = trangThaies[trangThaies.indexOf(item.trangThai)+1]
            showOder(trangThaies[trangThaies.indexOf(item.trangThai)-1]);
        }
    });
    console.log(order);
    saveOrderToStorage();
   
}

function reject(id){
    order = getOrderFromStorage();
    order.map(item => {
        if (item.maDH === id) {
            item.trangThai = "canceled"
            showOder(trangThaies[trangThaies.indexOf(item.trangThai)-1]);
        }
    });
    saveOrderToStorage();
}

function getOrderFromStorage(){
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
  
