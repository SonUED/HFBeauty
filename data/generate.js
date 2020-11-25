var products = [];
var brands = ['Loreal', 'Nivea', 'Schwarzkopf', 'Suave', 'Tresemme'];

var lipsticks = [
	'Son gấc Collagen',
	'Son kem',
	'Son sáp gấc',
	'Dưỡng tóc',
	'Son dưỡng',
];
var colours = ['đỏ', 'cam', 'vàng', 'lục', 'lam', 'chàm', 'tím'];
function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

for (let i = 1; i <= 200; i++) {
	let rdDate = randomDate(new Date(2020, 1, 1), new Date());
	const ngayNhap = `${rdDate.getFullYear()}-${
		rdDate.getMonth() < 10 ? '0' + rdDate.getMonth() : rdDate.getMonth()
	}-${rdDate.getDate() < 10 ? '0' + rdDate.getDate() : rdDate.getDate()}`;

	let thuongHieu = brands[i % 5];
	let product = {
		maSP: 'SP' + i,
		tenSP:
			lipsticks[Math.floor(Math.random() * 5)] +
			' ' +
			colours[Math.floor(Math.random() * 7)] +
			' ' +
			thuongHieu,
		maDM: 'DM' + ((i % 5) + 1),
		gia: Math.floor(Math.random() * 1000),
		soLuong: Math.floor(Math.random() * 30),
		hanSuDung: (i % 3) + 1 + ' năm kể từ ngày sản xuất.',
		ngaySanXuat: 'Xem trên bao bì sản phẩm.',
		thuongHieu: thuongHieu,
		moTa: 'Lorem ipsum dolor sit amet.',
		ngayNhap: ngayNhap,
		anh: '../../img/product-img/product1.webp',
	};

	products.push(product);
}

console.log(JSON.stringify(products));

function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

const danhSachDanhGia = [];
for (let i = 1; i <= 100; i++) {
	const soSao = Math.floor(Math.random() * 5 + 1);
	const tieuDe = 'Lorem ipsum dolor sit amet.';
	const noiDung = 'Lorem ipsum dolor sit amet.';

	let rdDate = randomDate(new Date(2020, 1, 1), new Date());
	const thoiGian = `${rdDate.getFullYear()}-${
		rdDate.getMonth() < 10 ? '0' + rdDate.getMonth() : rdDate.getMonth()
	}-${rdDate.getDate() < 10 ? '0' + rdDate.getDate() : rdDate.getDate()}`;

	const maSP = 'SP' + Math.floor(Math.random() * 200 + 1);
	const maKH = 'KH' + Math.floor(Math.random() * 100 + 1);

	const danhGia = {
		maKH: maKH,
		maSP: maSP,
		thoiGian: thoiGian,
		tieuDe: tieuDe,
		noiDung: noiDung,
		soSao: soSao,
	};

	danhSachDanhGia.push(danhGia);
}

console.log(JSON.stringify(danhSachDanhGia));
