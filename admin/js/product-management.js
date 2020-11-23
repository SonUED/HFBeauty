//using to show how many product there are
const quantityTitle = document.querySelector(
	'.product-management__quantity-title p'
);

//using for display all products
const productManagementShowcase = document.getElementById(
	'product-management__showcase'
);

// using for hide/show working (creating/updating product) overlay
const productWorkingOverlay = document.querySelector(
	'.product-working-overlay'
);
const closeQuickViewBtn = document.querySelector('.close-button');

// using for showing product's star on working overlay
const productStarOnWorkingOverlay = document.querySelector(
	'.product-detail__reviews'
);

// using for hide/show confirm action overlay
let isDoNotShowAgain = false;
const confirmActionOverlay = document.querySelector('.confirm-action-overlay');
const doNotShowAgainCheckbox = document.getElementById('do-not-display-again');

// using for confirm customer's action
const confirmMessage = document.querySelector('.confirm-action__message');
const confirmYesBtn = document.querySelector('.confirm-action__yes');
const confirmNoBtn = document.querySelector('.confirm-action__no');

// using for create or update product
const btnCreateUpdate = document.getElementById('btn-create-update');

// using for increase quantity in working overlay
const minusProductBtn = document.querySelector(
	'.quantity__group .quantity__minus'
);
const quantityProductIn = document.querySelector(
	'.quantity__group .quantity__content'
);
const plusProductBtn = document.querySelector(
	'.quantity__group .quantity__plus'
);

// using for updating displaying image in product working section
const imgProduct = document.getElementById('product-img-display');
const imgProductName = document.querySelector('.product-img-name');

// using for updating/creating product
const productCodeContainer = document.querySelector('.product-detail__code');
const productManuContainer = document.querySelector('.product-detail__manu');

const inProductName = document.getElementById('product-name');
const inProductCode = document.getElementById('product-code');
const inProductImg = document.getElementById('product-img');
const inProductBrand = document.getElementById('product-brand');
const inProductPrice = document.getElementById('product-price');
const inProductQuantity = document.getElementById('product-quantity');
const inProductInputDate = document.getElementById('product-input-date');
const inProductManuDate = document.getElementById('product-manu-date');
const inProductExpiryDate = document.getElementById('product-expiry-date');
const taProductDes = document.getElementById('product-des');
const seProductCate = document.getElementById('product-category');

// using for pagination and search
const dropItemsPagination = document.querySelectorAll(
	'.drop-pagination .dropdown-item'
);
const searchField = document.querySelector('#search');

// using for sorting data
const dropItemsSorting = document.querySelectorAll(
	'.drop-sorting .dropdown-item'
);

/**********  Fetch Data **********/
const fetchData = async (url = '', dataProperty) => {
	const response = await fetch(url);
	const dataJSON = await response.json();
	const dataList = dataJSON[dataProperty];

	return dataList;
};

const createProductElementRow = (product = {}) => {
	const tempProduct = JSON.stringify(product).replace(/"/g, "'");
	const categories = JSON.parse(localStorage.getItem('categories'));
	let productCate;

	for (let index = 0; index < categories.length; index++) {
		if (categories[index].maDM === product.maDM) {
			productCate = categories[index].tenDM;
			break;
		}
	}

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

	const productElementRow = `
        <tr id="${product.maSP}">
            <td>
                <div class="card">
                    <div class="row no-gutters">
                        <div class="col-lg-2">
                          <img
                            id="product-img-${product.maSP}"
                            src="${product.anh}"
                            class="card-img img-thumbnail responsive-img"
                            alt="Product Image"
                          />
                        </div>
                        <div class="col-lg-10">
                            <div class="card-body">
                                <h5 class="card-title" id="product-name-${product.maSP}">
                                    ${product.tenSP}
                                </h5>
                                <p id="product-code-${product.maSP}" class="card-text">${product.maSP}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td id="product-price-${product.maSP}">$${product.gia},00</td>
            <td id="product-quantity-${product.maSP}">${product.soLuong}</td>
			<td>
				${starE}
			</td>
			<td id="product-cate-${product.maSP}">${productCate}</td>
			<td>
				<p>
					${product.moTa}
				</p>
			</td>
			<td>
				<div>
					<div class="product-btn" onclick="displayProductWorkingOverlay('update',  ${tempProduct});">
						<i class="fas fa-edit"></i>
					</div>
					<div class="product-btn" onclick="deleteProduct('${product.maSP}')">
						<i class="fas fa-trash"></i>
					</div>
				</div>
            </td>
        </tr>`;

	return productElementRow;
};

const displayData = (productList = []) => {
	let productElementRows = '';

	productList.forEach(
		(product) => (productElementRows += createProductElementRow(product))
	);

	productManagementShowcase.innerHTML = productElementRows;
};

// fetch product list, category list, review list
const fetchProductList = async () => {
	localStorage.setItem('currentPage', '1');
	localStorage.setItem('numberOfItemsOfEachPage', '24');
	localStorage.setItem('selectedSearchField', 'tenSP');

	fetchData('../../data/categories.json', 'categories').then((categoryList) => {
		localStorage.setItem('categories', JSON.stringify(categoryList));
		let options = '';
		categoryList.forEach((category) => {
			options += `<option value="${category.maDM}">${category.tenDM}</option>`;
		});
		document.getElementById('product-category').innerHTML = options;
	});

	let reviewList = await fetchData('../../data/reviews.json', 'reviews');
	localStorage.setItem('reviews', JSON.stringify(reviewList));

	let productList = await fetchData('../../data/products.json', 'products');

	quantityTitle.textContent = `HFBeauty: ${productList.length} products! Tada!`;

	// calculate product's review's stars
	productList.forEach((product, index) => {
		let tempReviewAcc = reviewList.reduce(
			(acc, review) =>
				review.maSP == product.maSP
					? {
							...acc,
							total: acc.total + review.soSao,
							quantity: ++acc.quantity,
					  }
					: acc,

			{ total: 0, quantity: 0 }
		);

		productList[index]['soSao'] =
			Math.ceil(tempReviewAcc.total / tempReviewAcc.quantity) || 0;
	});

	localStorage.setItem('currentList', JSON.stringify(productList));
	localStorage.setItem('products', JSON.stringify(productList));

	createPaginationToolbar();
	displayData(productList.slice(0, 24));
};

/**********  Sort Data **********/

dropItemsSorting.forEach((item) => {
	item.addEventListener('click', (e) => {
		const dropdownToggleSorting = document.querySelector(
			'.drop-toggle-sorting'
		);

		dropdownToggleSorting.textContent = e.target.textContent;

		sortProduct(e.target.textContent);
	});
});

const sortProduct = (typeOfSort = 'A-Z') => {
	const products = JSON.parse(localStorage.getItem('products'));
	let newProductList = [...products];

	//console.log(newProductList);
	switch (typeOfSort) {
		case 'A-Z':
			newProductList.sort((a, b) => (a.tenSP < b.tenSP ? 1 : -1));
			break;
		case 'Z-A':
			newProductList.sort((a, b) => (a.tenSP > b.tenSP ? 1 : -1));
			break;
		case 'Old to New':
			newProductList.sort((a, b) => {
				const tempA = new Date(a.ngayNhap);
				const tempB = new Date(b.ngayNhap);

				if (tempA.getTime() > tempB.getTime()) return 1;
				else return -1;
			});

			break;
		case 'New to Old':
			newProductList.sort((a, b) => {
				const tempA = new Date(a.ngayNhap);
				const tempB = new Date(b.ngayNhap);

				if (tempA.getTime() < tempB.getTime()) return 1;
				else return -1;
			});
			console.log(newProductList);

			break;
		case 'Best Selling':
			break;
	}

	localStorage.setItem('currentList', JSON.stringify(newProductList));
	const currentPage = parseInt(localStorage.getItem('currentPage'));

	moveToPage(currentPage);
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

	let currentPage = parseInt(localStorage.getItem('currentPage'));
	let nextPage;

	if (currentPage > numberOfPages) {
		currentPage = numberOfPages;
		nextPage = 1;
	} else {
		nextPage = currentPage + 1 > numberOfPages ? 1 : currentPage + 1;
	}
	let prePage = currentPage - 1 <= 0 ? numberOfPages : currentPage - 1;

	const toolbar = `
    <div class="pagination__move-bar">
      <li class="page-item">
        <a class="page-link" onclick="moveToPage(1)">First Item</a>
      </li>
      <li class="page-item" id="previous-page">
        <a class="page-link" aria-label="Previous" onclick="moveToPrePage()">
        <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item ">
        <a class="page-link" onclick="moveToPage(this.textContent)">${prePage}</a>
      </li>
      <li class="page-item active disabled-click">
        <a class="page-link" onclick="moveToPage(this.textContent)">${currentPage}</a>
      </li>
      <li class="page-item">
        <a class="page-link" onclick="moveToPage(this.textContent)">${nextPage}</a>
      </li>
      <li class="page-item" id="next-page">
        <a class="page-link" aria-label="Next" onclick="moveToNextPage()">
        <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li class="page-item" id="last-page">
        <a class="page-link" onclick="moveToPage(${numberOfPages})">Last Item</a>
      </li>
    </div>

    <div class="pagination__find-bar">
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
};

/**********  Confirm action **********/
const confirmAction = (callback, message = '') => {
	confirmActionOverlay.style.display = 'block';
	confirmMessage.innerHTML = message;

	confirmYesBtn.addEventListener('click', function runCallback(e) {
		doNotShowAgainCheckbox.checked ? (isDoNotShowAgain = true) : null;

		// Only "Add product process" sends callback as a null param
		callback && callback();

		confirmActionOverlay.style.display = 'none';
		confirmYesBtn.removeEventListener('click', runCallback);
	});

	confirmNoBtn.addEventListener('click', function runCallback(e) {
		doNotShowAgainCheckbox.checked ? (isDoNotShowAgain = true) : null;

		// Only "Add product process" sends callback as a null param
		// Hiding "Product Working Overlay" after the admin clicks button "No" => Do not want to create more products
		callback ? null : (productWorkingOverlay.style.display = 'none');

		confirmActionOverlay.style.display = 'none';
		confirmNoBtn.removeEventListener('click', runCallback);
	});
};

/**********  Handle data **********/
// Decide whther that action is updating or creating
const handleAction = () => {
	const btnCreateUpdate = document.getElementById('btn-create-update');
	if (btnCreateUpdate.textContent === 'Create') {
		addProduct();
	} else {
		updateProduct();
	}
};

const pushNewProductToLocalStorage = (newProduct = {}) => {
	let products = JSON.parse(localStorage.getItem('products'));
	let currentPage = localStorage.getItem('currentPage');

	const lastProductCode = products[products.length - 1].maSP;
	const newMaSP =
		parseInt(lastProductCode.slice(2, lastProductCode.length)) + 1;

	newProduct.maSP = 'SP' + newMaSP;
	products.push(newProduct);
	localStorage.setItem('currentList', JSON.stringify(products));
	localStorage.setItem('products', JSON.stringify(products));

	quantityTitle.textContent = `HFBeauty: ${newMaSP} products! Tada!`;

	createPaginationToolbar();
	moveToPage(currentPage, true);

	cleanWorkingOverlay();
	if (isDoNotShowAgain) {
		confirmActionOverlay.style.display = 'none';
	} else {
		confirmAction(
			null,
			`<p>Creating product "${newProduct.tenSP}" successfully!</p> <p> Would you like creating more products? </p> `
		);
	}
};

const addProduct = () => {
	const today = new Date();
	const ngayNhap = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

	const newProduct = {
		tenSP: inProductName.value || 'Tên sản phẩm',
		maDM: seProductCate.value || 'DM1',
		gia: inProductPrice.value || 0,
		soLuong: inProductQuantity.value || 0,
		hanSuDung: inProductExpiryDate.value || '1 năm kể từ ngày sản xuất',
		ngaySanXuat: inProductManuDate.value || '1999-01-01',
		thuongHieu: inProductBrand.value || 'Nivea',
		moTa: taProductDes.value || 'Mô tả',
		anh: imgProduct.src || '#',
		ngayNhap: inProductInputDate.value || ngayNhap,
	};

	pushNewProductToLocalStorage(newProduct);
};

// Running when the onchange event happens at imgProduct element above in product-management.html
const changeImage = (inProductImg) => {
	const imageObject = inProductImg.files[0];
	imgProductName.textContent = imageObject.name;

	if (imageObject) {
		// Make sure `file.name` matches our extensions criteria
		if (/\.(jpe?g|png|gif|webp)$/i.test(imageObject.name)) {
			const reader = new FileReader();
			reader.addEventListener(
				'load',
				function () {
					imgProduct.src = this.result;
				},
				false
			);
			reader.readAsDataURL(imageObject);
		}
	}
};

const updateDisplayProduct = (updatedProduct = {}) => {
	const imgE = document.querySelector(
		`#${updatedProduct.maSP} #product-img-${updatedProduct.maSP}`
	);
	const tenSPE = document.querySelector(
		`#${updatedProduct.maSP} #product-name-${updatedProduct.maSP}`
	);
	const maDME = document.querySelector(
		`#${updatedProduct.maSP} #product-cate-${updatedProduct.maSP}`
	);
	const giaE = document.querySelector(
		`#${updatedProduct.maSP} #product-price-${updatedProduct.maSP}`
	);
	const soLuongE = document.querySelector(
		`#${updatedProduct.maSP} #product-quantity-${updatedProduct.maSP}`
	);

	imgE.src = updatedProduct.anh;
	tenSPE.textContent = updatedProduct.tenSP;
	giaE.textContent = `$${updatedProduct.gia}`;
	soLuongE.textContent = updatedProduct.soLuong;
	maDME.textContent = updatedProduct.maDM;
};

const updateProduct = () => {
	const maSP = inProductCode.value;

	const processingUpdating = () => {
		const updatedProduct = {
			maSP: maSP,
			tenSP: inProductName.value,
			maDM: seProductCate.value,
			gia: inProductPrice.value,
			soLuong: inProductQuantity.value,
			hanSuDung: inProductExpiryDate.value,
			ngaySanXuat: inProductManuDate.value,
			thuongHieu: inProductBrand.value,
			moTa: taProductDes.value,
			anh: imgProduct.src,
			ngayNhap: inProductInputDate.value,
		};

		let products = JSON.parse(localStorage.getItem('products'));

		products.forEach((product, index) =>
			product.maSP == updatedProduct.maSP
				? (products[index] = { ...updatedProduct })
				: null
		);

		const tenDM = seProductCate.options[seProductCate.selectedIndex].text;
		updateDisplayProduct({
			...updatedProduct,
			maDM: tenDM,
		});
		localStorage.setItem('currentList', JSON.stringify(products));
		localStorage.setItem('products', JSON.stringify(products));

		// hide working overlay after update product
		productWorkingOverlay.style.display = 'none';
	};

	if (isDoNotShowAgain) {
		processingUpdating();
	} else {
		confirmAction(processingUpdating, `Are you sure to update ${maSP}`);
	}
};

const deleteProduct = (maSP = '') => {
	const processingDeleting = (maSP) => {
		let products = JSON.parse(localStorage.getItem('products'));
		let currentPage = localStorage.getItem('currentPage');
		let newProducts = products.filter((product) =>
			product.maSP == maSP ? false : true
		);
		localStorage.setItem('currentList', JSON.stringify(newProducts));
		localStorage.setItem('products', JSON.stringify(newProducts));
		createPaginationToolbar();
		moveToPage(currentPage, true);
	};

	if (isDoNotShowAgain) {
		processingDeleting(maSP);
	} else {
		confirmAction(
			processingDeleting.bind(this, maSP),
			`Are you sure to delete product ${maSP}?`
		);
	}
};

/**********  Search **********/
const search = (value) => {
	let products = JSON.parse(localStorage.getItem('products'));
	let selectedSearchField = localStorage.getItem('selectedSearchField');
	let numberOfItemsOfEachPage = localStorage.getItem('numberOfItemsOfEachPage');

	let filteredProducts = products.filter((product) => {
		if (product[selectedSearchField].includes(value)) return true;

		return false;
	});

	localStorage.setItem('currentList', JSON.stringify(filteredProducts));

	createPaginationToolbar();
	displayData(filteredProducts.slice(0, numberOfItemsOfEachPage));
};

const selectSearchField = (selectedSearchField = 'name') => {
	localStorage.setItem('selectedSearchField', selectedSearchField);
	search(searchField.value);
};

searchField.addEventListener('keyup', (e) => {
	search(e.target.value);
});

/**********  Cleaning Working Overlay **********/
const cleanWorkingOverlay = () => {
	inProductCode.value = '';
	inProductName.value = '';
	inProductPrice.value = 0;
	inProductQuantity.value = 0;
	inProductExpiryDate.value = '';
	inProductManuDate.value = '';
	inProductBrand.value = '';
	inProductInputDate.value = '';
	taProductDes.value = '';
	imgProduct.src = '../../img/product-thumbnail_400x400.png';
	seProductCate.value = '';
};

// Close & show product working overlay
const displayProductWorkingOverlay = (type = 'create', product = {}) => {
	if (type === 'create') {
		btnCreateUpdate.textContent = 'Create';

		productCodeContainer.classList.remove('d-flex', 'justify-content-between');
		productManuContainer.classList.remove('d-flex', 'justify-content-between');

		cleanWorkingOverlay();
	} else {
		btnCreateUpdate.textContent = 'Update';

		productCodeContainer.classList.add('d-flex', 'justify-content-between');
		productManuContainer.classList.add('d-flex', 'justify-content-between');

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

		inProductCode.value = product.maSP;
		inProductName.value = product.tenSP;
		inProductPrice.value = product.gia;
		inProductQuantity.value = product.soLuong;
		inProductExpiryDate.value = product.hanSuDung;
		inProductManuDate.value = product.ngaySanXuat;
		inProductBrand.value = product.thuongHieu;
		inProductInputDate.value = product.ngayNhap;
		taProductDes.value = product.moTa;
		imgProduct.src = product.anh;
		seProductCate.value = product.maDM;
	}

	productWorkingOverlay.style.display = 'block';
};

closeQuickViewBtn.addEventListener('click', (e) => {
	productWorkingOverlay.style.display = 'none';
});

// Increase the quantity on working overlay
minusProductBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let currentQuantity = parseInt(quantityProductIn.value);

	quantityProductIn.value =
		(currentQuantity - 1 < 0 ? 0 : currentQuantity - 1) || 0;
});

plusProductBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let currentQuantity = parseInt(quantityProductIn.value);

	quantityProductIn.value = ++currentQuantity || 1;
});
