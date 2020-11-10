var order = [
    {
        IdOrder: 0,
        IdCustomer: 111,
        receiver: "Nguyen van a",
        address: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
        phone: "0123456789",
        date: "23/05/2020",
        status:"wait for accept"
    },
    {
        IdOrder: 1,
        IdCustomer: 111,
        receiver: "Nguyen van a",
        address: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
        phone: "0123456789",
        date: "23/05/2020",
        status:"wait for take"

    },
    {
        IdOrder: 2,
        IdCustomer: 111,
        receiver: "Nguyen van a",
        address: "2 Âu Cơ, Hòa Khánh Nam - Liên Chiểu - Đà Nẵng",
        phone: "0123456789",
        date: "23/05/2020",
        status:"deliver"
    },
]

var statuses = ['wait for accept', 'wait for take', 'deliver','received']

function showOder(mess) {
    document.querySelector(".table-order").innerHTML = ""
    // order = getOrderFromStorage();
    switch (mess) {
        case "all": 
            document.querySelector(".apply").style.display = "none";
            document.querySelector(".reject").style.display = "none";

            order.map(item => { 
                var row = '<tr>' + 
                        '<td>' +item.IdOrder+ '</td>'+
                        '<td>' +item.IdCustomer+ '</td>'+
                        '<td>' +item.receiver+ '</td>'+
                        '<td>' +item.address+ '</td>'+
                        '<td>' +item.phone+ '</td>'+
                        '<td>' +item.date+ '</td>'+
                        '<td>' +item.status+ '</td>'+
                    '</tr>'
                document.querySelector(".table-order").innerHTML += row;
            })
            break;
        case "wait for accept": 
            document.querySelector(".apply").style.display = " table-cell";
            document.querySelector(".reject").style.display = " table-cell";


            order.map(item => { 
                if (item.status === "wait for accept"){
                    var row = '<tr>' + 
                        '<td>' +item.IdOrder+ '</td>'+
                        '<td>' +item.IdCustomer+ '</td>'+
                        '<td>' +item.receiver+ '</td>'+
                        '<td>' +item.address+ '</td>'+
                        '<td>' +item.phone+ '</td>'+
                        '<td>' +item.date+ '</td>'+
                        '<td>' +item.status+ '</td>'+
                        '<td><input class="btn btn-success" type="button" value="OK" onclick="apply(' + item.IdOrder + ')"></td>'+
                        '<td><input class="btn btn-danger" type="button" value="Hủy" onclick="reject(' + item.IdOrder + ')"></td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "wait for take": 
            document.querySelector(".apply").style.display = " table-cell";
            document.querySelector(".reject").style.display = "none";

            order.map(item => { 
                if (item.status === "wait for take"){
                    var row = '<tr>' + 
                        '<td>' +item.IdOrder+ '</td>'+
                        '<td>' +item.IdCustomer+ '</td>'+
                        '<td>' +item.receiver+ '</td>'+
                        '<td>' +item.address+ '</td>'+
                        '<td>' +item.phone+ '</td>'+
                        '<td>' +item.date+ '</td>'+
                        '<td>' +item.status+ '</td>'+
                        '<td><input class="btn btn-success" type="button" value="OK" onclick="apply(' + item.IdOrder + ')"></td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "deliver": 
            document.querySelector(".apply").style.display = " table-cell";
            document.querySelector(".reject").style.display = "none";
                
            order.map(item => { 
                if (item.status === "deliver"){
                    var row = '<tr>' + 
                        '<td>' +item.IdOrder+ '</td>'+
                        '<td>' +item.IdCustomer+ '</td>'+
                        '<td>' +item.receiver+ '</td>'+
                        '<td>' +item.address+ '</td>'+
                        '<td>' +item.phone+ '</td>'+
                        '<td>' +item.date+ '</td>'+
                        '<td>' +item.status+ '</td>'+
                        '<td><input class="btn btn-success" type="button" value="OK" onclick="apply(' + item.IdOrder + ')"></td>'+
                    '</tr>'
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "received": 
            document.querySelector(".apply").style.display = "none";
            document.querySelector(".reject").style.display = "none";
                
            order.map(item => { 
                if (item.status === "received"){
                    var row = '<tr>' + 
                        '<td>' +item.IdOrder+ '</td>'+
                        '<td>' +item.IdCustomer+ '</td>'+
                        '<td>' +item.receiver+ '</td>'+
                        '<td>' +item.address+ '</td>'+
                        '<td>' +item.phone+ '</td>'+
                        '<td>' +item.date+ '</td>'+
                        '<td>' +item.status+ '</td>'+
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
                        '<td>' +item.IdOrder+ '</td>'+
                        '<td>' +item.IdCustomer+ '</td>'+
                        '<td>' +item.receiver+ '</td>'+
                        '<td>' +item.address+ '</td>'+
                        '<td>' +item.phone+ '</td>'+
                        '<td>' +item.date+ '</td>'+
                        '<td>' +item.status+ '</td>'+
                    '</tr>'
                document.querySelector(".table-order").innerHTML += row;
            })
            break;  
    }
}

function apply(id){
    console.log(order);
    order.map(item => {
        if (item.IdOrder === id) {
            item.status = statuses[statuses.indexOf(item.status)+1]
            showOder(statuses[statuses.indexOf(item.status)-1]);
        }
    });
    console.log(order);
    saveOrderToStorage();
   
}

function reject(id){
    order = getOrderFromStorage();
    order.map(item => {
        if (item.IdOrder === id) {
            item.status = "canceled"
            showOder(statuses[statuses.indexOf(item.status)-1]);
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
  
