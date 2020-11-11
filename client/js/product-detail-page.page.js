const addBuyItNowBtn = () => {
  const slotBuy = document.querySelector('slot[name="buy-it-now-btn"]');

  const buyItNowBtn = document.createElement("span");
  buyItNowBtn.innerHTML =
    '<a href="#" class="btn btn-primary buy-it-now-btn">BUY IT NOW</a>';

  slotBuy.parentElement.replaceChild(buyItNowBtn, slotBuy);
};
addBuyItNowBtn();
