var products = [
  {
    id: "SP1",
    name: "SON MÔI HANDMADE",
    img:
      "https://salt.tikicdn.com/cache/w390/ts/product/f6/94/b7/58753d3ebfeae7dd3349b9ecbe399351.jpg",
    price: 300000,
  },
  {
    id: "SP2",
    name: "SON MÔI HANDMADE",
    img:
      "https://salt.tikicdn.com/cache/w390/ts/product/f6/94/b7/58753d3ebfeae7dd3349b9ecbe399351.jpg",
    price: 300000,
  },
  {
    id: "SP3",
    name: "SON MÔI HANDMADE",
    img:
      "https://salt.tikicdn.com/cache/w390/ts/product/f6/94/b7/58753d3ebfeae7dd3349b9ecbe399351.jpg",
    price: 300000,
  },
  {
    id: "SP4",
    name: "SON MÔI HANDMADE",
    img:
      "https://salt.tikicdn.com/cache/w390/ts/product/f6/94/b7/58753d3ebfeae7dd3349b9ecbe399351.jpg",
    price: 300000,
  },
  {
    id: "SP5",
    name: "SON MÔI HANDMADE",
    img:
      "https://salt.tikicdn.com/cache/w390/ts/product/f6/94/b7/58753d3ebfeae7dd3349b9ecbe399351.jpg",
    price: 300000,
  },
];
const createNewRow = (product) => {
  var row = `<div class="wrapper">
  <div class="product">
        <div class="mark">HOT</div>
        <img src="${product.img}" />
        <span class="name">${product.name}</span>
        <div class="price-section"><span class="price">${product.price}đ</span></div>
       </div>  <button class="buy">Đặt mua</button></div>`;
  return row;
};
const displayProduct = (dataArr) => {
  dataArr.map((product) => {
    var row = createNewRow(product);
    document.getElementById("section-product").innerHTML += row;
  });
};
displayProduct(products);
