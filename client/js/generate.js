var products = [];
var brands = ['Loreal', 'Nivea', 'Schwarzkopf', 'Suave', 'Tresemme'];

var lipsticks = [
  'Son gấc Collagen',
  'Son kem',
  'Son sáp gấc',
  'Dưỡng tóc',
  'Son dưỡng'
];
var colours = ['đỏ', 'cam', 'vàng', 'lục', 'lam', 'chàm', 'tím'];
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

for (let i = 1; i <= 200; i++) {
  let ngayNhap = randomDate(new Date(2020, 1, 1), new Date());
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
    moTa:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam laboriosam fugiat eum nihil deserunt odio velit iure repellendus hic suscipit eius voluptas repudiandae enim ex consectetur assumenda commodi, nisi alias.',
    anh: '../../img/Chambor_Rouge_Plum+_Lipstick.webp',
    ngayNhap: ngayNhap
  };

  products.push(product);
}

console.log(JSON.stringify(products));
