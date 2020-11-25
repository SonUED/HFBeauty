function getSaleIDByProductID(productID) {
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

	let maxSale = -1;
	let selectID = null;

	let sortedSale = todayProductSale.sort((s1, s2) => {
		parseInt(s2.discount) - parseInt(s1.discount);
	});

	return sortedSale[0];
}
