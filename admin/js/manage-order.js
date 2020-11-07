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

status = ["wait for accept", "wait for take", "deliver","received"]

checkData();
show();
function show(mess) {
    document.querySelector(".table-order").innerHTML = ""
    // order = getOrder();
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
                        '<td><input class="btn btn-outline-dark" type="button" value="OK" onclick="apply(' + item.IdOrder + ')"></td>'+
                        '<td><input class="btn btn-outline-dark" type="button" value="Hủy" onclick="reject(' + item.IdOrder + ')"></td>'+
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
                        '<td><input class="btn btn-outline-dark" type="button" value="Duyệt" onclick="apply(' + item.IdOrder + ')"></td>'+
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
                        '<td><input class="btn btn-outline-dark" type="button" value="Duyệt" onclick="apply(' + item.IdOrder + ')"></td>'+
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
                        '<td><input class="btn btn-outline-dark" type="button" value="Duyệt" onclick="apply(' + item.IdOrder + ')"></td>'+
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
    order = getOrder();
    order.map(item => {
        if (item.IdOrder === id) {
            console.log(status[0]);
            item.status = status[status.indexOf(item.status)+1]
            show(item.status);
        }
    });
   
}

function reject(id){
    alert(id)
}

function getOrder(){
    var data = localStorage.getItem("order");
    data = JSON.parse(data);
    return data;
}

function checkData(){
    if(!order){
        order = getOrder();
    }else{
        localStorage.setItem("order", JSON.stringify(order));
    }
}
