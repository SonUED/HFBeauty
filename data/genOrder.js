//generate order
var orders = [];
var ho = ["Nguyen", "tran", "Le"];
var tenDem = ["Van", "Thi", "Quang", "Thien", "Ba", "Thanh"];
var ten = ["A", "B", "C", "D"];
var diaChi = [
  "Ton Duc Thang",
  "Nguyen Luong Bang",
  "2/9",
  "30/4",
  "Pham Nhu Xuong",
];
var trangthai = [
  "wait-for-accept",
  "wait-for-take",
  "deliver",
  "received",
  "canceled",
];

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

for (let i = 1; i <= 200; i++) {
  let rdDate = randomDate(new Date(2020, 1, 1), new Date());

  let order = {
    maDH: "DH" + i,
    tenTaiKhoan:
      ho[Math.floor(Math.random() * ho.length)] +
      tenDem[Math.floor(Math.random() * tenDem.length)] +
      ten[Math.floor(Math.random() * ten.length)],

    tenNguoiNhan:
      ho[Math.floor(Math.random() * ho.length)] +
      " " +
      tenDem[Math.floor(Math.random() * tenDem.length)] +
      " " +
      ten[Math.floor(Math.random() * ten.length)],
    diaChi:
      Math.floor(Math.random() * 1000) +
      " " +
      diaChi[Math.floor(Math.random() * diaChi.length)],
    SDT: Math.floor(Math.random() * 10000000000),
    ngayDat: `${rdDate.getFullYear()}-${
      rdDate.getMonth() < 10 ? "0" + rdDate.getMonth() : rdDate.getMonth()
    }-${rdDate.getDate() < 10 ? "0" + rdDate.getDate() : rdDate.getDate()}`,
    trangThai: trangthai[Math.floor(Math.random() * 5)],
  };

  orders.push(order);
}
console.log(JSON.stringify(orders));

//========================================================================
//generate detail order
orders = JSON.parse(localStorage.getItem("order"));
products = JSON.parse(localStorage.getItem("products"));
var detailOrder = [];

for (let i = 1; i <= 400; i++) {
  let detail = {
    maDH: orders[Math.floor(Math.random() * 200)].maDH,
    maSP: products[Math.floor(Math.random() * 200)].maSP,
    soLuong: Math.floor(Math.random() * 10)+1,
  };

  detailOrder.push(detail);
}

console.log(JSON.stringify(detailOrder));

//==========generate user========================

orders = JSON.parse(localStorage.getItem("order"));
var users = [];

function randomDate(start, end) {
	return new Date(
	  start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
  }

for (let i = 1; i <= 400; i++) {
	let rdDate = randomDate(new Date(1980, 1, 1), new Date(2005, 1, 1));
	var username =orders[Math.floor(Math.random() * 200)].tenTaiKhoan
  let user = {
    tenTaiKhoan: username,
    matKhau: "123123",
	tenKH: orders[Math.floor(Math.random() * 200)].tenNguoiNhan,
	ngaySinh: `${rdDate.getFullYear()}-${
      rdDate.getMonth() < 10 ? "0" + rdDate.getMonth() : rdDate.getMonth()
	}-${rdDate.getDate() < 10 ? "0" + rdDate.getDate() : rdDate.getDate()}`,
	anhDaiDien: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
	mail: username + '@hfbeauty.com',
    soDienThoai: Math.floor(Math.random() * 10000000000),
	diaChi: orders[Math.floor(Math.random() * 200)].diaChi
  };

  users.push(user);
}

console.log(JSON.stringify(users));

