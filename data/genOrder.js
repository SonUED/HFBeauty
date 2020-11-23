var orders = []; 

var ho = ["Nguyen", "tran", "Le"];
var tenDem = ["Van", "Thi", "Quang", "Thien", "Ba", "Thanh"];
var ten = ["A", "B", "C", "D"];

var diaChi = ["Ton Duc Thang", "Nguyen Luong Bang", "2/9", "30/4", "Pham Nhu Xuong"];

var trangthai = ['wait-for-accept', 'wait-for-take', 'deliver','received', 'canceled'];

function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}
for (let i = 1; i <= 200; i++) {
let rdDate = randomDate(new Date(2020, 1, 1), new Date());
	
	let order = {
		maDH: 'DH' + i,
        tenTaiKhoan: ho[Math.floor(Math.random() * ho.length)]
        +tenDem[Math.floor(Math.random() * tenDem.length)]
        +ten[Math.floor(Math.random() * ten.length)],

		tenNguoiNhan: ho[Math.floor(Math.random() * ho.length)] + " " 
        + tenDem[Math.floor(Math.random() * tenDem.length)] + " " 
        + ten[Math.floor(Math.random() * ten.length)]
        ,
		diaChi: Math.floor(Math.random() * 1000) + " " + diaChi[Math.floor(Math.random() * diaChi.length)],
		SDT: Math.floor(Math.random() * 30),
		ngayDat: `${rdDate.getFullYear()}-${
            rdDate.getMonth() < 10 ? '0' + rdDate.getMonth() : rdDate.getMonth()
        }-${rdDate.getDate() < 10 ? '0' + rdDate.getDate() : rdDate.getDate()}`,
        trangThai: trangthai[Math.floor(Math.random() * 5)]
	};

	orders.push(order);
}

console.log(JSON.stringify(orders));
