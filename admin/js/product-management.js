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
const inProductImg = document.getElementById('product-img');
const inProductBrand = document.getElementById('product-brand');
const inProductCode = document.getElementById('product-code');
const inProductPrice = document.getElementById('product-price');
const inProductQuantity = document.getElementById('product-quantity');
const inProductInputDate = document.getElementById('product-input-date');
const inProductManuDate = document.getElementById('product-manu-date');
const inProductExpiryDate = document.getElementById('product-expiry-date');
const taProductDes = document.getElementById('product-des');
const seProductCate = document.getElementById('product-category');

let numberOfItemsOfEachPage = 10;
let paginatedData = [];
let currentPage = 1;

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
                                src="../../img/Chambor_Rouge_Plum+_Lipstick.webp"
                                class="card-img img-thumbnail"
                                alt="..."
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${product.tenSP}
                                </h5>
                                <p class="card-text">${product.maSP}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </th>
            <td>${product.gia}</td>
            <td>${product.soLuong}</td>
            <td>
                <i class="fas fa-star"></i><i class="fas fa-star"></i
                ><i class="fas fa-star"></i><i class="fas fa-star"></i
                ><i class="fas fa-star"></i>
            </td>
            <td>${product.maDM}</td>
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

const paginateData = (data = [], numberOfItemsOfEachPage = 0) => {
	let paginatedData = [];
	let slicedData = [];

	paginatedData.push([]);
	slicedData.push({ ...data[0] });

	for (let i = 1; i < data.length; i++) {
		if (i % numberOfItemsOfEachPage != 0) {
			slicedData.push({ ...data[i] });
		} else {
			paginatedData.push(slicedData);
			slicedData = [];
			slicedData.push({ ...data[i] });
		}
	}

	if (slicedData.length != 0) {
		paginatedData.push(slicedData);
		slicedData.length = 0;
	}
	return paginatedData;
};

const changePage = (page) => {
	currentPage = page;
	displayData(paginatedData[page]);
};

const fetchProductList = () => {
	fetchData('../../data/products.json', 'products').then((productList) => {
		localStorage.setItem('products', JSON.stringify(productList));

		paginatedData = paginateData(productList, numberOfItemsOfEachPage);

		displayData(paginatedData[1]);
	});
};

// Handle data
const pushNewProductToLocalStorage = (newProduct = {}) => {
	let products = JSON.parse(localStorage.getItem('products'));
	products.push(newProduct);
	localStorage.setItem('products', JSON.stringify(products));
};

const handleAction = () => {
	const btnCreateUpdate = document.getElementById('btn-create-update');
	if (btnCreateUpdate.textContent === 'Create') {
		addProduct();
	} else {
		updateProduct();
	}
};

function changeImage(inProductImg) {
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
}

/* 
still not handling duplicated product, need to fix later
just checking maSP is enough
*/
const addProduct = () => {
	const newProduct = {
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

	pushNewProductToLocalStorage(newProduct);
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

	localStorage.setItem('products', JSON.stringify(products));

	// not done
	const productElementRow = document.getElementById(updatedProduct.maSP);
	const img = document.querySelector(
		`#${updatedProduct.maSP} #product-img-${updatedProduct.maSP}`
	);
	img.src = updatedProduct.anh;
};

const deleteProduct = (maSP = '') => {
	let products = JSON.parse(localStorage.getItem('products'));

	let newProducts = products.filter((product) =>
		product.maSP == maSP ? false : true
	);

	//old theory -> need to fix
	// paginatedData = paginateData(newProducts, numberOfItemsOfEachPage);
	// displayData(paginatedData[1]);

	let begin = (currentPage - 1) * numberOfItemsOfEachPage;
	let end =
		(currentPage - 1) * numberOfItemsOfEachPage + numberOfItemsOfEachPage;

	console.log(begin, end);
	displayData(newProducts.slice(begin, end));

	localStorage.setItem('products', JSON.stringify(newProducts));
};

// Close & show product working overlay
const displayProductWorkingOverlay = (type = 'create', product = {}) => {
	if (type === 'create') {
		btnCreateUpdate.textContent = 'Create';
	} else {
		btnCreateUpdate.textContent = 'Update';

		inProductCode.value = product.maSP;
		inProductName.value = product.tenSP;
		// seProductCate.value;
		inProductPrice.value = product.gia;
		inProductQuantity.value = product.soLuong;
		inProductExpiryDate.value = product.hanSuDung;
		inProductManuDate.value = product.ngaySanXuat;
		inProductBrand.value = product.thuongHieu;
		taProductDes.value = product.moTa;
		imgProduct.src = product.anh;
		inProductInputDate.value = product.ngayNhap;
	}

	productWorkingOverlay.style.display = 'block';
};

closeQuickViewBtn.addEventListener('click', (e) => {
	productWorkingOverlay.style.display = 'none';
});
