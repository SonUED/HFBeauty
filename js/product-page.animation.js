const viewModeGrid = document.querySelector('.view-mode--grid');
const viewModeList = document.querySelector('.view-mode--list');

const closeQuickViewBtn = document.querySelector('.close-button');
const showQuickViewBtns = document.querySelectorAll('.card-quick-view-btn');
const quickViewOverlay = document.querySelector('.quick-view-overlay');

let filterPrice = { id: 'filter-price', isAngleUp: true };
let filterBrand = { id: 'filter-brand', isAngleUp: true };

// Toggle choosing display mode of list of products;
viewModeGrid.addEventListener('click', (e) => {
	e.target.classList.add('active');
	viewModeList.classList.remove('active');
});

viewModeList.addEventListener('click', (e) => {
	e.target.classList.add('active');
	viewModeGrid.classList.remove('active');
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

showQuickViewBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => {
		quickViewOverlay.style.display = 'block';
	})
);
