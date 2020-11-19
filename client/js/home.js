var products = [
  {
    id: "SP1",
    name: "SON MÔI HANDMADE",
    img:
      "https://cdn.shopify.com/s/files/1/0441/4970/2818/products/MIC0065_300x.jpg?v=1598701828",
    price: 300000,
  },
  {
    id: "SP2",
    name: "SON MÔI HANDMADE",
    img:
      "https://cdn.shopify.com/s/files/1/0441/4970/2818/products/VV0815_300x.jpg?v=1599906013",
    price: 300000,
  },
  {
    id: "SP3",
    name: "SON MÔI HANDMADE",
    img:
      "https://cdn.shopify.com/s/files/1/0441/4970/2818/products/MIC0070A_d4d4dbcb-d0ab-4812-a823-a413df2cb6a5_300x.png?v=1598686830",
    price: 300000,
  },
  {
    id: "SP4",
    name: "SON MÔI HANDMADE",
    img:
      "https://cdn.shopify.com/s/files/1/0441/4970/2818/products/MIC0040A1_025206aa-f530-4bae-9555-5c9b49da8adf_300x.jpg?v=1598687465",
    price: 300000,
  },
  {
    id: "SP5",
    name: "SON MÔI HANDMADE",
    img:
      "https://cdn.shopify.com/s/files/1/0441/4970/2818/products/MIC0024A2_fc8c8678-a7ab-4422-883a-cea7019a6606_300x.jpg?v=1598687194",
    price: 300000,
  },
];
var editorPick = [
  {
    id: "SP1",
    name: "SON MÔI HANDMADE",
    img: "../../img/home-img/1.png",
    price: 300000,
  },
  {
    id: "SP2",
    name: "SON MÔI HANDMADE",
    img: "../../img/home-img/2.jpg",
    price: 300000,
  },
  {
    id: "SP3",
    name: "SON MÔI HANDMADE",
    img: "../../img/home-img/3.jpg",
    price: 300000,
  },
  {
    id: "SP4",
    name: "SON MÔI HANDMADE",
    img: "../../img/home-img/4.jpg",
    price: 300000,
  },
  {
    id: "SP5",
    name: "SON MÔI HANDMADE",
    img: "../../img/home-img/5.png",
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
const displayProduct = (dataArr, id) => {
  dataArr.map((product) => {
    var row = createNewRow(product);
    document.getElementById(id).innerHTML += row;
    // document.getElementById("new-product").innerHTML += row;
    // document.getElementById("featured-product").innerHTML += row;
    // document.getElementById("editor-pick").innerHTML += row;
  });
};
displayProduct(products, "new-product");
displayProduct(products, "featured-product");
displayProduct(editorPick, "editor-pick");
