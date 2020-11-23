const addBuyItNowBtn = () => {
	const slotBuy = document.querySelector('slot[name="buy-it-now-btn"]');

	const buyItNowBtn = document.createElement('span');

	buyItNowBtn.innerHTML =
		'<a href="#" class="btn btn-primary buy-it-now-btn">BUY IT NOW</a>';

	slotBuy.parentElement.replaceChild(buyItNowBtn, slotBuy);
};
addBuyItNowBtn();

let displayProduct = (product) => {
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

const getProduct = () => {
	const products = JSON.parse(localStorage.getItem('products'));
	const detailProductCode = localStorage.getItem('detailProductCode');

	const product = products.find((product) => product.maSP == detailProductCode);

	displayProduct(product);
};
