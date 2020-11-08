const productManagementShowcase = document.getElementById(
	'product-management__showcase'
);

let numberOfItemsOfEachPage = 10;
let paginatedData = [];

const fetchData = async (url = '', dataProperty) => {
	const response = await fetch(url);
	const dataJSON = await response.json();
	const dataList = dataJSON[dataProperty];

	return dataList;
};

const createProductElementRow = (product = {}) => {
	const productElementRow = `
        <tr>
            <th scope="row">
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img
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
                <div class="btn btn-primary">Detail</div>
                <div class="btn btn-primary">Update</div>
                <div class="btn btn-primary">Delete</div>
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
	console.log(paginatedData);
	return paginatedData;
};

const changePage = (page) => {
	displayData(paginatedData[page]);
};

fetchData('../../data/products.json', 'products').then((productList) => {
	paginatedData = paginateData(productList, numberOfItemsOfEachPage);
	displayData(paginatedData[1]);
});
