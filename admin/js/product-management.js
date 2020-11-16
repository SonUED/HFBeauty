const productManagementShowcase = document.getElementById(
	'product-management__showcase'
);
const productWorkingOverlay = document.querySelector(
	'.product-working-overlay'
);
const closeQuickViewBtn = document.querySelector('.close-button');

const btnCreateUpdate = document.getElementById('btn-create-update');
const btnDelete = document.getElementById('btn-delete');

const imgProduct = document.getElementById('product-img-display');

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

const dropItemsPagination = document.querySelectorAll(
	'.drop-pagination .dropdown-item'
);

const searchField = document.querySelector('#search');

/**********  Fetch Data **********/
const fetchData = async (url = '', dataProperty) => {
	const response = await fetch(url);
	const dataJSON = await response.json();
	const dataList = dataJSON[dataProperty];

	return dataList;
};

const createProductElementRow = (product = {}) => {
	const tempProduct = JSON.stringify(product).replace(/"/g, "'");

	const productElementRow = `
        <tr id="${product.maSP}">
            <th scope="row">
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-md-4">
							<img
								id="product-img-${product.maSP}"
                                src="${product.anh}"
                                class="card-img img-thumbnail"
                                alt="..."
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title" id="product-name-${product.maSP}">
                                    ${product.tenSP}
                                </h5>
                                <p id="product-code-${product.maSP}" class="card-text">${product.maSP}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </th>
            <td id="product-price-${product.maSP}">${product.gia}</td>
            <td id="product-quantity-${product.maSP}">${product.soLuong}</td>
            <td>
                <i class="fas fa-star"></i><i class="fas fa-star"></i
                ><i class="fas fa-star"></i><i class="fas fa-star"></i
                ><i class="fas fa-star"></i>
            </td>
            <td id="product-cate-${product.maSP}">${product.maDM}</td>
            <td>
                <div class="btn btn-primary" onclick="displayProductWorkingOverlay('update',  ${tempProduct});">Update</div>
                <div class="btn btn-primary" onclick="deleteProduct('${product.maSP}')">Delete</div>
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

const fetchProductList = () => {
	fetchData('../../data/products.json', 'products').then((productList) => {
		localStorage.setItem('products', JSON.stringify(productList));
		localStorage.setItem('currentList', JSON.stringify(productList));
		localStorage.setItem('currentPage', '1');
		localStorage.setItem('numberOfItemsOfEachPage', '24');
		localStorage.setItem('selectedSearchField', 'tenSP');

		createPaginationToolbar();
		displayData(productList.slice(0, 24));
	});

	fetchData('../../data/categories.json', 'categories').then((categories) => {
		localStorage.setItem('categories', JSON.stringify(categories));

		let options = '';
		categories.forEach((category) => {
			options += `<option value="${category.maDM}">${category.tenDM}</option>`;
		});
		document.getElementById('product-category').innerHTML = options;
	});
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

/**********  Handle data **********/
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

	createPaginationToolbar();
	moveToPage(currentPage, true);
};

const handleAction = () => {
	const btnCreateUpdate = document.getElementById('btn-create-update');
	if (btnCreateUpdate.textContent === 'Create') {
		addProduct();
	} else {
		updateProduct();
	}
};

const changeImage = (inProductImg) => {
	const imageObject = inProductImg.files[0];

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

const addProduct = () => {
	const newProduct = {
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

	pushNewProductToLocalStorage(newProduct);
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
	giaE.textContent = updatedProduct.gia;
	soLuongE.textContent = updatedProduct.soLuong;
	maDME.textContent = updatedProduct.maDM;
};

const updateProduct = () => {
	const updatedProduct = {
		maSP: inProductCode.value,
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

	updateDisplayProduct(updatedProduct);
	localStorage.setItem('currentList', JSON.stringify(products));
	localStorage.setItem('products', JSON.stringify(products));
};

const deleteProduct = (maSP = '') => {
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

// Close & show product working overlay
const displayProductWorkingOverlay = (type = 'create', product = {}) => {
	if (type === 'create') {
		btnCreateUpdate.textContent = 'Create';

		inProductName.value = '';
		inProductCode.value = '';
		inProductPrice.value = 0;
		inProductQuantity.value = 0;
		inProductExpiryDate.value = '';
		inProductManuDate.value = '';
		inProductBrand.value = '';
		inProductInputDate.value = '';
		taProductDes.value = '';
		imgProduct.src = '#';
		seProductCate.value = '';
	} else {
		btnCreateUpdate.textContent = 'Update';

		inProductName.value = product.tenSP;
		inProductCode.value = product.maSP;
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
