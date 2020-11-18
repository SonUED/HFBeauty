const viewModeGrid = document.querySelector(".view-mode--grid");
const viewModeList = document.querySelector(".view-mode--list");

const closeQuickViewBtn = document.querySelector(".close-button");
const quickViewOverlay = document.querySelector(".quick-view-overlay");

const collectionList = document.querySelector(".collection__list .row");

const searchField = document.querySelector("#search");

const dropItemsPagination = document.querySelectorAll(
  ".drop-pagination .dropdown-item"
);

let filterPrice = { id: "filter-price", isAngleUp: true };
let filterBrand = { id: "filter-brand", isAngleUp: true };

// Toggle choosing display mode of list of products;
viewModeGrid.addEventListener("click", (e) => {
  e.target.classList.add("active");
  viewModeList.classList.remove("active");
});

viewModeList.addEventListener("click", (e) => {
  e.target.classList.add("active");
  viewModeGrid.classList.remove("active");
});

// Rotate Z 180 deg to angle up of filter title
const rotateAngle = (filter, angle) => {
  if (filter.isAngleUp) {
    angle.style.transform = "rotateZ(180deg)";
  } else {
    angle.style.transform = "none";
  }

  filter.isAngleUp = !filter.isAngleUp;
};

const rotateZAngleUp = (element) => {
  const id = element.id;
  const angle = element.children[0].children[0];

  if (id === filterPrice.id) {
    rotateAngle(filterPrice, angle);
  } else {
    rotateAngle(filterBrand, angle);
  }
};

// Close & show quick view overlay

closeQuickViewBtn.addEventListener("click", (e) => {
  quickViewOverlay.style.display = "none";
});

let quickView = (event, productCode) => {
  event.stopPropagation();
  quickViewOverlay.style.display = "block";

  const products = JSON.parse(localStorage.getItem("currentList"));
  let product = {};

  for (let index = 0; index < products.length; index++) {
    if (products[index].maSP == productCode) {
      product = { ...products[index] };
      break;
    }
  }

  const imgE = document.querySelector("product-detail-element #product-img");
  const nameE = document.querySelector("product-detail-element #product-name");
  const brandE = document.querySelector(
    "product-detail-element #product-brand"
  );
  const codeE = document.querySelector("product-detail-element #product-code");
  const priceE = document.querySelector(
    "product-detail-element #product-price"
  );
  const oldPriceE = document.querySelector(
    "product-detail-element #product-old-price"
  );
  const desE = document.querySelector("product-detail-element #product-des");
  const cateE = document.querySelector("product-detail-element #product-cate");

  imgE.src = product.anh;
  nameE.textContent = product.tenSP;
  brandE.textContent = product.thuongHieu;
  codeE.textContent = product.maSP;
  oldPriceE.textContent = product.gia;
  priceE.textContent = ((parseInt(product.gia) / 100) * 85).toFixed(2);
  desE.textContent = product.moTa;

  const categories = JSON.parse(localStorage.getItem("categories"));

  for (let index = 0; index < categories.length; index++) {
    if (categories[index].maDM === product.maDM) {
      cateE.textContent = categories[index].tenDM;
      break;
    }
  }
};

/**********  Pagination **********/
dropItemsPagination.forEach((item) => {
  item.addEventListener("click", (e) => {
    const dropdownTogglePagination = document.querySelector(
      ".drop-toggle-pagination"
    );

    localStorage.setItem("numberOfItemsOfEachPage", e.target.textContent);

    dropdownTogglePagination.textContent = e.target.textContent;

    createPaginationToolbar();
  });
});

const updateToolbar = (currentPage = 1, numberOfPages = 1) => {
  const pageLink = document.querySelectorAll(".pagination .page-link");

  pageLink[2].textContent =
    currentPage - 1 <= 0 ? numberOfPages : currentPage - 1;
  pageLink[3].textContent = currentPage;
  pageLink[4].textContent =
    currentPage + 1 > numberOfPages ? 1 : currentPage + 1;
};

const moveToPage = (page = 1) => {
  const products = JSON.parse(localStorage.getItem("currentList"));
  const numberOfItemsOfEachPage = JSON.parse(
    localStorage.getItem("numberOfItemsOfEachPage")
  );
  const numberOfPages = Math.ceil(products.length / numberOfItemsOfEachPage);

  page = parseInt(page);
  if (page > numberOfPages) {
    page = 1;
  }

  if (page <= 0) {
    page = 9;
  }

  let begin = (page - 1) * numberOfItemsOfEachPage;
  let end = (page - 1) * numberOfItemsOfEachPage + numberOfItemsOfEachPage;

  if (end > products.length) {
    end = products.length;
  }

  displayData(products.slice(begin, end));
  localStorage.setItem("currentPage", page);

  updateToolbar(page, numberOfPages);
};

const moveToPrePage = () => {
  const currentPage = parseInt(localStorage.getItem("currentPage"));

  moveToPage(currentPage - 1);
};
const moveToNextPage = () => {
  const currentPage = parseInt(localStorage.getItem("currentPage"));

  moveToPage(currentPage + 1);
};

const findPage = () => {
  const findPageInput = document.getElementById("find-page-input");
  console.log(findPageInput.max);

  if (
    findPageInput.value >= findPageInput.min &&
    findPageInput.value <= findPageInput.max
  ) {
    moveToPage(findPageInput.value);
  } else {
    alert("Invalid Input!");
  }
};

const createPaginationToolbar = () => {
  const products = JSON.parse(localStorage.getItem("currentList"));
  const numberOfItemsOfEachPage = JSON.parse(
    localStorage.getItem("numberOfItemsOfEachPage")
  );
  const numberOfPages = Math.ceil(products.length / numberOfItemsOfEachPage);

  const toolbar = `
	<li class="page-item">
		<a class="page-link" href="#" onclick="moveToPage(1)">First Item</a>
	</li>
	<li class="page-item" id="previous-page">
		<a class="page-link" href="#" aria-label="Previous" onclick="moveToPrePage()">
		<span aria-hidden="true">&laquo;</span>
		</a>
	</li>
	<li class="page-item ">
		<a class="page-link" onclick="moveToPage(this.textContent)">${numberOfPages}</a>
	</li>
	<li class="page-item active disabled-click">
		<a class="page-link" onclick="moveToPage(this.textContent)">1</a>
	</li>
	<li class="page-item">
		<a class="page-link" onclick="moveToPage(this.textContent)">2</a>
	</li>
	<li class="page-item" id="next-page">
		<a class="page-link" href="#" aria-label="Next" onclick="moveToNextPage()">
		<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	<li class="page-item" id="last-page">
		<a class="page-link" href="#" onclick="moveToPage(${numberOfPages})">Last Item</a>
	</li>

	<li class="page-item">
	<div class="input-group">
	  <input
	 	id="find-page-input"
		type="number"
		class="form-control"
        placeholder="Enter page"
        min="1"
        max="${numberOfPages}"
	  />
	  <div class="input-group-append">
		<button
		  class="btn btn-outline-secondary"
		  type="button"
		  onclick="findPage()"
		>
		  Go
		</button>
	  </div>
	</div>
  </li>
	`;

  const paginationE = document.querySelector(".pagination");
  paginationE.innerHTML = toolbar;

  displayData(products.slice(0, numberOfItemsOfEachPage));
};

/**********  Fetch Data **********/

const fetchData = async (url = "", dataProperty) => {
  const response = await fetch(url);
  const dataJSON = await response.json();
  const dataList = dataJSON[dataProperty];

  return dataList;
};

const createProductElementRow = (product = {}) => {
  const productElementRow = `
    <div class="col-lg-3 collection__item" onclick="directToDetailPage('${
      product.maSP
    }')">
        <div class="card text-center">
            <div class="card-top">
                <div class="card-label"><strong>-15%</strong></div>
                <div class="card-quick-view-btn" onclick="quickView(event,'${
                  product.maSP
                }')">
                    <span>QUICK VIEW</span>
                </div>
                <img
                    src="${product.anh}"
                    class="card-img-top"
                    alt="product image"
                />
            </div>
            <div class="card-body">
                <h6 class="card-subtitle">${product.thuongHieu}</h6>
                <h5 class="card-title">${product.tenSP}</h5>
                <div class="price-box">
                    <span class="old-price">
                        <del class="text-muted">Rs. ${product.gia}.00</del>
                    </span>
                    &nbsp;
                    <span class="new-price">Rs. ${(
                      (parseInt(product.gia) / 100) *
                      85
                    ).toFixed(2)}</span>
                </div>
                 <a href="#" class="btn btn-primary add-to-cart-btn" onclick="addToCart('${
                   product.maSP
                 }')"
                          >ADD TO CART</a>
            </div>
        </div>
    </div>`;

  return productElementRow;
};

const displayData = (productList = []) => {
  let productElementRows = "";
  productList.forEach(
    (product, index) => (productElementRows += createProductElementRow(product))
  );

  collectionList.innerHTML = productElementRows;
};

const fetchProductList = () => {
  fetchData("../../data/products.json", "products").then((productList) => {
    localStorage.setItem("products", JSON.stringify(productList));
    localStorage.setItem("currentList", JSON.stringify(productList));
    localStorage.setItem("currentPage", "1");
    localStorage.setItem("numberOfItemsOfEachPage", "24");

    createPaginationToolbar();
  });

  fetchData("../../data/categories.json", "categories").then((categories) =>
    localStorage.setItem("categories", JSON.stringify(categories))
  );
};

/**********  Search **********/
const search = (value) => {
  let products = JSON.parse(localStorage.getItem("products"));
  let selectedSearchField = localStorage.getItem("selectedSearchField");

  let filteredProducts = products.filter((product) => {
    if (product[selectedSearchField].includes(value)) return true;

    return false;
  });

  localStorage.setItem("currentList", JSON.stringify(filteredProducts));

  createPaginationToolbar();
};

const selectSearchField = (selectedSearchField = "name") => {
  localStorage.setItem("selectedSearchField", selectedSearchField);
  search(searchField.value);
};

searchField.addEventListener("keyup", (e) => {
  search(e.target.value);
});

/**********  Move to Page Detailed Product **********/
const products = JSON.parse(localStorage.getItem("products"));
const recentlyViewdArr = JSON.parse(localStorage.getItem("recently"));
const findProductFromId = (maSPToAdd) => {
  return products.filter((product) => {
    return product.maSP == maSPToAdd;
  });
};
const directToDetailPage = (productCode) => {
  localStorage.setItem("detailProductCode", productCode);
  window.location.href = "../../client/html/product-detail-page.html";
  //  push to recently view
  var newArr = [];
  const product = findProductFromId(productCode);
  newArr.push(product);
  localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(Array.from(new Set(...newArr)))
  );
};
