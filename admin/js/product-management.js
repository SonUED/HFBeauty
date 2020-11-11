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
		localStorage.setItem('currentPage', '1');
		localStorage.setItem('numberOfItemsOfEachPage', '10');

		createPaginationToolbar('products', productList.length, 10);

		displayData(productList.slice(0, 10));
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
const moveToPage = (nameInLocalStorage = '', page, type = 'changePage') => {
	let numberOfItemsOfEachPage = parseInt(
		localStorage.getItem('numberOfItemsOfEachPage')
	);
	let currentPage = parseInt(localStorage.getItem('currentPage'));
	let data = JSON.parse(localStorage.getItem(nameInLocalStorage));

	let numberOfPage = Math.ceil(data.length / numberOfItemsOfEachPage);

	if (page) {
		const pageLink = document.querySelectorAll('.pagination .page-link');

		pageLink[2].textContent =
			parseInt(page) - 1 <= 0 ? numberOfPage : parseInt(page) - 1;
		pageLink[3].textContent = page;
		pageLink[4].textContent =
			parseInt(page) + 1 > numberOfPage ? 1 : parseInt(page) + 1;

		let begin = (parseInt(page) - 1) * numberOfItemsOfEachPage;
		let end =
			(parseInt(page) - 1) * numberOfItemsOfEachPage + numberOfItemsOfEachPage;

		displayData(data.slice(begin, end));
		localStorage.setItem('currentPage', page);
	}

	switch (type) {
		case 'updateMoveToLastPage':
			document.getElementById('last-page').innerHTML = `
		<a class="page-link" href="#" onclick="moveToPage('${nameInLocalStorage}',${numberOfPage})">Last Item</a>`;
			break;
		case 'previous':
			--currentPage < 1
				? moveToPage(nameInLocalStorage, numberOfPage)
				: moveToPage(nameInLocalStorage, currentPage);
			break;
		case 'next':
			++currentPage > numberOfPage
				? moveToPage(nameInLocalStorage, 1)
				: moveToPage(nameInLocalStorage, currentPage);
			break;
	}
};

const findPage = (nameInLocalStorage = '') => {
	const findPageInput = document.getElementById('find-page-input');

	if (
		findPageInput.value >= findPageInput.min &&
		findPageInput.value <= findPageInput.max
	) {
		moveToPage(nameInLocalStorage, findPageInput.value);
	} else {
		alert('Invalid Input!');
	}
};

const createPaginationToolbar = (
	nameInLocalStorage = '',
	numberOfProducts,
	numberOfItemsOfEachPage = 10
) => {
	const toolbar = `
	<li class="page-item">
		<a class="page-link" href="#" onclick="moveToPage('${nameInLocalStorage}',1)">First Item</a>
	</li>
	<li class="page-item" id="previous-page">
		<a class="page-link" href="#" aria-label="Previous" onclick="moveToPage('${nameInLocalStorage}',null, 'previous')">
		<span aria-hidden="true">&laquo;</span>
		</a>
	</li>
	<li class="page-item ">
		<a class="page-link" onclick="moveToPage('${nameInLocalStorage}',this.textContent)">${Math.ceil(
		numberOfProducts / numberOfItemsOfEachPage
	)}</a>
	</li>
	<li class="page-item active disabled-click">
		<a class="page-link" onclick="moveToPage('${nameInLocalStorage}',this.textContent)">1</a>
	</li>
	<li class="page-item">
		<a class="page-link" onclick="moveToPage('${nameInLocalStorage}',this.textContent)">2</a>
	</li>
	<li class="page-item" id="next-page">
		<a class="page-link" href="#" aria-label="Next" onclick="moveToPage('${nameInLocalStorage}',null, 'next')">
		<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	<li class="page-item" id="last-page">
		<a class="page-link" href="#" onclick="moveToPage('${nameInLocalStorage}', ${Math.ceil(
		numberOfProducts / numberOfItemsOfEachPage
	)})">Last Item</a>
	</li>

	<li class="page-item">
	<div class="input-group">
	  <input
	 	id="find-page-input"
		type="number"
		class="form-control"
		placeholder="Enter page"
		min="1"
		max="${Math.ceil(numberOfProducts / numberOfItemsOfEachPage)}"
	  />
	  <div class="input-group-append">
		<button
		  class="btn btn-outline-secondary"
		  type="button"
		  onclick="findPage('${nameInLocalStorage}')"
		>
		  Go
		</button>
	  </div>
	</div>
  </li>
	`;

	const paginationE = document.querySelector('.pagination');
	paginationE.innerHTML = toolbar;
};

/**********  Handle data **********/
const pushNewProductToLocalStorage = (newProduct = {}) => {
	let products = JSON.parse(localStorage.getItem('products'));
	let currentPage = localStorage.getItem('currentPage');
	let numberOfItemsOfEachPage = parseInt(
		localStorage.getItem('numberOfItemsOfEachPage')
	);

	const lastProductCode = products[products.length - 1].maSP;
	const newMaSP =
		parseInt(lastProductCode.slice(2, lastProductCode.length)) + 1;

	newProduct.maSP = 'SP' + newMaSP;
	products.push(newProduct);
	localStorage.setItem('products', JSON.stringify(products));

	createPaginationToolbar(products.length, numberOfItemsOfEachPage);
	moveToPage('products', currentPage, 'updateMoveToLastPage');
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
	localStorage.setItem('products', JSON.stringify(products));
};

const deleteProduct = (maSP = '') => {
	let products = JSON.parse(localStorage.getItem('products'));
	let currentPage = localStorage.getItem('currentPage');

	let newProducts = products.filter((product) =>
		product.maSP == maSP ? false : true
	);

	localStorage.setItem('products', JSON.stringify(newProducts));
	moveToPage('products', currentPage, 'updateMoveToLastPage');
};

/**********  Search **********/
const search = (value) => {
	let products = JSON.parse(localStorage.getItem('products'));
	let selectedSearchField = localStorage.getItem('selectedSearchField');

	let filteredProducts = products.filter((product) => {
		if (product[selectedSearchField].includes(value)) return true;

		return false;
	});

	localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));

	createPaginationToolbar('filteredProducts', filteredProducts.length, 10);

	displayData(filteredProducts.slice(0, 10));
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
