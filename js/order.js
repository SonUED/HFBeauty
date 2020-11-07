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


function show(mess) {
    document.querySelector(".table-order").innerHTML = "";

    switch (mess) {
        case "all": 
            order.map(item => { 
                var row = `<tr>
                                <td><img src="${item.IdCustomer}" alt=""></td>
                                <td>
                                <p>${item.address}</p>
                                <p>${item.address}</p>
                                </td>
                                <td>${item.address}</td>
                            </tr>`
                
                document.querySelector(".table-order").innerHTML += row;
            })
            break;
        case "wait for accept": 
            order.map(item => { 
                if (item.status === "wait for accept"){
                    var row = `<tr>
                                <td><img src="${item.IdCustomer}" alt=""></td>
                                <td>
                                <p>${item.address}</p>
                                <p>${item.address}</p>
                                </td>
                                <td>${item.address}</td>
                            </tr>`
                        
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "wait for take": 
            order.map(item => { 
                if (item.status === "wait for accept"){
                    var row = `<tr>
                                <td><img src="${item.IdCustomer}" alt=""></td>
                                <td>
                                <p>${item.address}</p>
                                <p>${item.address}</p>
                                </td>
                                <td>${item.address}</td>
                            </tr>`
                        
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;
        case "deliver": 
            order.map(item => { 
                if (item.status === "wait for accept"){
                    var row = `<tr>
                                <td><img src="${item.IdCustomer}" alt=""></td>
                                <td>
                                <p>${item.address}</p>
                                <p>${item.address}</p>
                                </td>
                                <td>${item.address}</td>
                            </tr>`
                        
                        document.querySelector(".table-order").innerHTML += row;
                    
                    }
                })
            break;

        case "canceled": 
            order.map(item => { 
                if (item.status === "received"){
                    var row = `<tr>
                                <td><img src="${item.IdCustomer}" alt=""></td>
                                <td>
                                <p>${item.address}</p>
                                <p>${item.address}</p>
                                </td>
                                <td>${item.address}</td>
                            </tr>`
                        
                        document.querySelector(".table-order").innerHTML += row;
                    }
                })
            break;

        case "canceled": 
            order.map(item => { 
                if (item.status === "canceled"){
                    var row = `<tr>
                                <td><img src="${item.IdCustomer}" alt=""></td>
                                <td>
                                <p>${item.address}</p>
                                <p>${item.address}</p>
                                </td>
                                <td>${item.address}</td>
                            </tr>`
                        
                        document.querySelector(".table-order").innerHTML += row;
                    }
                })
            break;
        
    }
}