const viewModeGrid = document.querySelector('.view-mode--grid');
const viewModeList = document.querySelector('.view-mode--list');
const collectionRow = document.querySelector('.collection__row');

const closeQuickViewBtn = document.querySelector('.close-button');
const quickViewOverlay = document.querySelector('.quick-view-overlay');

const collectionList = document.querySelector('.collection__list .row');

const featureProductInner = document.querySelector('.carousel-inner');

const searchField = document.querySelector('#search');

const dropItemsPagination = document.querySelectorAll(
  '.drop-pagination .dropdown-item'
);

var cartArr = JSON.parse(localStorage.getItem('cartArr')) || [];
let filterPrice = { id: 'filter-price', isAngleUp: true };
let filterBrand = { id: 'filter-brand', isAngleUp: true };

let direction = 'horizontal';

// Toggle choosing display mode of list of products;
const changeDisplayStyle = (direct = 'horizontal') => {
  const currentPage = parseInt(localStorage.getItem('currentPage'));

  if (direct == 'horizontal') {
    direction = 'horizontal';
  } else {
    direction = 'vertical';
  }

  moveToPage(currentPage, true);
};

viewModeGrid.addEventListener('click', (e) => {
  e.target.classList.add('active');
  viewModeList.classList.remove('active');
  collectionRow.classList.remove('change-direction');

  changeDisplayStyle('horizontal');
});

viewModeList.addEventListener('click', (e) => {
  e.target.classList.add('active');
  viewModeGrid.classList.remove('active');
  collectionRow.classList.add('change-direction');

  changeDisplayStyle('vertical');
});

// Rotate Z 180 deg to angle up of filter title
const rotateAngle = (filter, angle) => {
  if (filter.isAngleUp) {
    angle.style.transform = 'rotateZ(180deg)';
  } else {
    angle.style.transform = 'none';
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

closeQuickViewBtn.addEventListener('click', (e) => {
  quickViewOverlay.style.display = 'none';
});

let quickView = (event, productCode) => {
  event.stopPropagation();
  quickViewOverlay.style.display = 'block';

  const products = JSON.parse(localStorage.getItem('currentList'));
  let product = {};

  for (let index = 0; index < products.length; index++) {
    if (products[index].maSP == productCode) {
      product = { ...products[index] };
      break;
    }
  }

  const imgE = document.querySelector('product-detail-element #product-img');
  const nameE = document.querySelector('product-detail-element #product-name');
  const brandE = document.querySelector(
    'product-detail-element #product-brand'
  );
  const codeE = document.querySelector('product-detail-element #product-code');
  const priceE = document.querySelector(
    'product-detail-element #product-price'
  );
  const oldPriceE = document.querySelector(
    'product-detail-element #product-old-price'
  );
  const desE = document.querySelector('product-detail-element #product-des');
  const cateE = document.querySelector('product-detail-element #product-cate');
  // using for showing product's star on working overlay
  const productStarOnWorkingOverlay = document.querySelector(
    '.product-detail__reviews'
  );

  // create star element
  let starE = '';
  for (let i = 1; i <= 5; i++) {
    if (product.soSao > 0) {
      starE += '<i class="fas fa-star"></i>';
      product.soSao--;
    } else {
      starE += '<i class="far fa-star"></i>';
    }
  }
  productStarOnWorkingOverlay.innerHTML = starE;

  imgE.src = product.anh;
  nameE.textContent = product.tenSP;
  brandE.textContent = product.thuongHieu;
  codeE.textContent = product.maSP;
  oldPriceE.textContent = product.gia;
  priceE.textContent = ((parseInt(product.gia) / 100) * 85).toFixed(2);
  desE.textContent = product.moTa;

  const categories = JSON.parse(localStorage.getItem('categories'));

  for (let index = 0; index < categories.length; index++) {
    if (categories[index].maDM === product.maDM) {
      cateE.textContent = categories[index].tenDM;
      break;
    }
  }
};

/**********  Display Data **********/
const createCardbody = (product) => {
  const discount = product.giamGia;
  const oldPrice = parseFloat(product.gia);

  const cardBody = `
	<div class="card text-center">
            <div class="card-top">
                ${
                  discount > 0
                    ? `<div class='card-label'>
                      <strong>${discount}%</strong>
                    </div>
                    `
                    : ''
                }
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
                ${
                  discount > 0
                    ? `<span class="old-price">
                        <del class="text-muted">Rs. ${product.gia}.00</del>
                      </span>`
                    : ''
                }
                    
                    &nbsp;
                    <span class="new-price">Rs. ${
                      oldPrice - (oldPrice / 100) * discount
                    }</span>
                </div>
                <a href="#" class="btn btn-primary add-to-cart-btn" onclick=addToCartInPage(event,'${
                  product.maSP
                }')
>ADD TO CART</a
                >
            </div>
        </div>
	`;

  return cardBody;
};

const createHorProductElement = (product = {}) => {
  const cardBody = createCardbody(product);

  const productElement = `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 collection__item" onclick="directToDetailPage('${product.maSP}')">
        ${cardBody}
    </div>`;

  return productElement;
};

const createVerProductElement = (product = {}) => {
  const categories = JSON.parse(localStorage.getItem('categories'));
  let productCate = '';

  for (let index = 0; index < categories.length; index++) {
    if (categories[index].maDM === product.maDM) {
      productCate = categories[index].tenDM;
      break;
    }
  }
  const productElement = `
  <div class="product-detail product-detail--inside-collection">
	<div class="row">
		<div class="col-sm-3 col-md-4 col-lg-4">
			<div class="card-top">
				<div class="card-label"><strong>-15%</strong></div>
				<img
					id="product-img"
					src="${product.anh}"
					class="img-fluid"
					alt="product-img"
				/>
			</div>
		</div>
		<div class="col-sm-9 col-md-8 col-lg-8">
			<div class="card-body">
				<h5 class="card-title"> ${product.tenSP}</h5>
				<div class="product-detail__reviews">
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
				</div>
				<div class="product-detail__brand">
					<span class="strong-text-700">Brand:</span> ${product.thuongHieu}</span> 
				</div>
				<div class="product-detail__code">
					<span class="strong-text-700">Product Code:</span> ${product.maSP}</span>  
				</div>
				<div class="product-detail__cate">
					<span class="strong-text-700">Category:</span>${productCate}</span>  
				</div>
				<div class="price-box">
					<span class="old-price">
						<del class="text-muted">Rs. ${product.gia}</del>
					</span>
					&nbsp;
					<span class="new-price">Rs. ${((parseInt(product.gia) / 100) * 85).toFixed(
            2
          )}</span>
				</div>
				<div class="product-detail__des">
            ${product.moTa}
				</div>
				<div class="quantity">
					<p class="quantity__title strong-text-700">Quantity:</p>
					<div class="quantity__group">
						<button class="quantity__minus">
							<i class="fas fa-minus"></i>
						</button>
						<input class="quantity__content" type="number" value="0" />
						<button class="quantity__plus">
							<i class="fas fa-plus"></i>
						</button>
					</div>
					<p class="quantity__subtotal">
						Subtotal: <span class="strong-text-700">Rs. 718.00</span>
					</p>
				</div>
				<a href="#" class="btn btn-primary add-to-cart-btn" onclick=addToCartInPage(event,'${
          product.maSP
        }')>ADD TO CART</a>
			</div>
		</div>
	</div>
</div>
  `;

  return productElement;
};

const displayData = (productList = []) => {
  let productElementRows = '';

  if (direction == 'horizontal') {
    productList.forEach(
      (product) => (productElementRows += createHorProductElement(product))
    );
  } else {
    productList.forEach(
      (product) => (productElementRows += createVerProductElement(product))
    );
  }

  collectionList.innerHTML = productElementRows;
};

/**********  Display Featured Products **********/
const createFeaProductElement = (product = {}, isFirst = false) => {
  const cardBody = createCardbody(product);

  const productElement = `
	<div class="carousel-item ${isFirst ? 'active' : ''}">
		<div
			class="collection__item collection__item--featured" onclick="directToDetailPage('${
        product.maSP
      }')"
		>
			${cardBody}
		</div>
	</div>
	`;

  return productElement;
};

const displayFeatureFroducts = (productList = []) => {
  let productElementRows = '';

  productList.forEach((product, index) => {
    index == 0
      ? (productElementRows += createFeaProductElement(product, true))
      : (productElementRows += createFeaProductElement(product));
  });

  featureProductInner.innerHTML = productElementRows;
};

/**********  Pagination **********/
dropItemsPagination.forEach((item) => {
  item.addEventListener('click', (e) => {
    const dropdownTogglePagination = document.querySelector(
      '.drop-toggle-pagination'
    );

    localStorage.setItem('numberOfItemsOfEachPage', e.target.textContent);

    dropdownTogglePagination.textContent = e.target.textContent;

    createPaginationToolbar();
  });
});

const updateToolbar = (currentPage = 1, numberOfPages = 1) => {
  const pageLink = document.querySelectorAll('.pagination .page-link');

  pageLink[2].textContent =
    currentPage - 1 <= 0 ? numberOfPages : currentPage - 1;
  pageLink[3].textContent = currentPage;
  pageLink[4].textContent =
    currentPage + 1 > numberOfPages ? 1 : currentPage + 1;
};

const moveToPage = (page = 1, isMoveToCurent = false) => {
  const products = JSON.parse(localStorage.getItem('currentList'));
  const numberOfItemsOfEachPage = JSON.parse(
    localStorage.getItem('numberOfItemsOfEachPage')
  );
  const numberOfPages = Math.ceil(products.length / numberOfItemsOfEachPage);

  page = parseInt(page);
  if (page > numberOfPages) {
    page = 1;
  }

  if (page <= 0) {
    page = numberOfPages;
  }

  let begin = (page - 1) * numberOfItemsOfEachPage;
  let end = (page - 1) * numberOfItemsOfEachPage + numberOfItemsOfEachPage;

  if (end > products.length) {
    end = products.length;
  }

  displayData(products.slice(begin, end));

  if (!isMoveToCurent) {
    localStorage.setItem('currentPage', page);
    updateToolbar(page, numberOfPages);
  }
};

const moveToPrePage = () => {
  const currentPage = parseInt(localStorage.getItem('currentPage'));

  moveToPage(currentPage - 1);
};
const moveToNextPage = () => {
  const currentPage = parseInt(localStorage.getItem('currentPage'));

  moveToPage(currentPage + 1);
};

const findPage = () => {
  const findPageInput = document.getElementById('find-page-input');
  const inputValue = parseInt(findPageInput.value);
  const minValue = parseInt(findPageInput.min);
  const maxValue = parseInt(findPageInput.max);

  if (inputValue < minValue || inputValue > maxValue) {
    alert('Invalid Input!');
  } else {
    moveToPage(inputValue);
  }
};

const createPaginationToolbar = () => {
  const products = JSON.parse(localStorage.getItem('currentList'));
  const numberOfItemsOfEachPage = JSON.parse(
    localStorage.getItem('numberOfItemsOfEachPage')
  );
  const numberOfPages = Math.ceil(products.length / numberOfItemsOfEachPage);

  const toolbar = `
    <div class="pagination__move-bar">
      <li class="page-item f-l-item">
        <a class="page-link" onclick="moveToPage(1)">First Item</a>
      </li>
      <li class="page-item" id="previous-page">
        <a class="page-link" aria-label="Previous" onclick="moveToPrePage()">
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
      <li class="page-item">
        <a class="page-link" aria-label="Next" onclick="moveToNextPage()">
        <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li class="page-item f-l-item">
        <a class="page-link" onclick="moveToPage(${numberOfPages})">Last Item</a>
      </li>
    </div>
    <div class="pagination__find-bar ">
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
    </div>
	`;

  const paginationE = document.querySelector('.pagination');
  paginationE.innerHTML = toolbar;

  displayData(products.slice(0, numberOfItemsOfEachPage));
};

/**********  Fetch Data **********/
const fetchData = async (url = '', dataProperty) => {
  const response = await fetch(url);
  const dataJSON = await response.json();
  const dataList = dataJSON[dataProperty];

  return dataList;
};

const getSaleIDByProductID = (productID) => {
  let sales = JSON.parse(localStorage.getItem('sales'));

  todayProductSale = sales.filter((sale) => {
    let beginDate = new Date(sale.beginDate);
    let endDate = new Date(sale.endDate);
    let curDate = new Date();
    let currenDate = new Date(
      curDate.getFullYear() +
        '-' +
        (curDate.getMonth() + 1) +
        '-' +
        curDate.getDate()
    );

    if (
      beginDate <= currenDate &&
      currenDate <= endDate &&
      sale.products.includes(productID)
    )
      return true;
    return false;
  });

  if (!todayProductSale) return null;

  let sortedSale = todayProductSale.sort((s1, s2) => {
    parseInt(s2.discount) - parseInt(s1.discount);
  });

  return sortedSale[0];
};

// fetch product list, category list, review list
const fetchProductList = async () => {
  localStorage.setItem('currentPage', '1');
  localStorage.setItem('numberOfItemsOfEachPage', '24');
  localStorage.setItem('selectedSearchField', 'tenSP');

  // Fetch Category
  fetchData('../../data/categories.json', 'categories').then((categories) =>
    localStorage.setItem('categories', JSON.stringify(categories))
  );

  let reviewList = await fetchData('../../data/reviews.json', 'reviews');
  localStorage.setItem('reviews', JSON.stringify(reviewList));

  let productList = await fetchData('../../data/products.json', 'products');

  // calculate product's review's stars
  productList.forEach((product, index) => {
    let tempReviewAcc = reviewList.reduce(
      (acc, review) =>
        review.maSP == product.maSP
          ? {
              ...acc,
              total: acc.total + review.soSao,
              quantity: ++acc.quantity
            }
          : acc,

      { total: 0, quantity: 0 }
    );

    productList[index]['giamGia'] =
      parseInt(getSaleIDByProductID(product.maSP)?.discount) || 0;

    productList[index]['soSao'] =
      Math.ceil(tempReviewAcc.total / tempReviewAcc.quantity) || 0;
  });

  localStorage.setItem('currentList', JSON.stringify(productList));
  localStorage.setItem('products', JSON.stringify(productList));

  displayFeatureFroducts(productList.slice(0, 3));
  createPaginationToolbar();
};

/**********  Search **********/
const search = (value) => {
  let products = JSON.parse(localStorage.getItem('products'));
  let selectedSearchField = localStorage.getItem('selectedSearchField');

  let filteredProducts = products.filter((product) => {
    if (product[selectedSearchField].includes(value)) return true;

    return false;
  });

  localStorage.setItem('currentList', JSON.stringify(filteredProducts));

  createPaginationToolbar();
};

const selectSearchField = (selectedSearchField = 'name') => {
  localStorage.setItem('selectedSearchField', selectedSearchField);
  search(searchField.value);
};

searchField.addEventListener('keyup', (e) => {
  search(e.target.value);
});

/**********  Move to Page Detailed Product **********/
const products = JSON.parse(localStorage.getItem("products"));
const existRecentlyViewedItem = (array, maSPToAdd) => {
  var founnd = array.filter((item) => {
    return item.maSP === maSPToAdd;
  });
  return founnd;
};
const findProductFromId = (maSPToAdd) => {
  console.log(maSPToAdd);
  return products.filter((product) => {
    return product.maSP == maSPToAdd;
  });
};
const directToDetailPage = (productCode) => {
  localStorage.setItem('detailProductCode', productCode);
  window.location.href = '../../client/html/product-detail-page.html';
  //  push to recently view
  const product = findProductFromId(productCode);
  recentlyViewdArr =
    existRecentlyViewedItem(recentlyViewdArr, productCode).length > 0
      ? recentlyViewdArr
      : (recentlyViewdArr = [...recentlyViewdArr, ...product]);
  localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewdArr));
};

const addToCartInPage = (event, productCode) => {
  event.stopPropagation();
  const productToAdd = findProductFromId(productCode)[0];
  if (existRecentlyViewedItem(cartArr, productCode).length > 0) {
    cartArr = cartArr.map((cartItem) =>
      cartItem.maSP == productToAdd.maSP
        ? {
            ...productToAdd,
            quantity: Number(cartItem.quantity) + 1,
          }
        : cartItem
    );
  } else {
    cartArr = [...cartArr, { ...productToAdd, quantity: 1 }];
  }
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
};

/**********  Sort product **********/
function selectSort(selectElement) {
  let products = JSON.parse(localStorage.getItem('products'));
  let sortedProducts = null;

  if (selectElement.value === 'default') {
    sortedProducts = products;
  }

  if (selectElement.value === 'priceUp') {
    sortedProducts = products.sort((p1, p2) => p1.gia - p2.gia);
  }

  if (selectElement.value === 'priceDown') {
    sortedProducts = products.sort((p1, p2) => p2.gia - p1.gia);
  }

  if (selectElement.value === 'alphaUp') {
    sortedProducts = products.sort((p1, p2) => {
      if (p1.tenSP < p2.tenSP) return -1;
      return p1.tenSP > p2.tenSP ? 1 : 0;
    });
  }

  if (selectElement.value === 'alphaDown') {
    sortedProducts = products.sort((p1, p2) => {
      if (p2.tenSP < p1.tenSP) return -1;
      return p2.tenSP > p1.tenSP ? 1 : 0;
    });
  }

  if (selectElement.value === 'dateUp') {
    sortedProducts = products.sort(
      (p1, p2) => new Date(p1.ngayNhap) - new Date(p2.ngayNhap)
    );
  }

  if (selectElement.value === 'dateDown') {
    sortedProducts = products.sort(
      (p1, p2) => new Date(p2.ngayNhap) - new Date(p1.ngayNhap)
    );
  }
  localStorage.setItem('currentList', JSON.stringify(sortedProducts));
  createPaginationToolbar();
}
