const viewModeGrid = document.querySelector('.view-mode--grid');
const viewModeList = document.querySelector('.view-mode--list');

// Toggle choosing display mode of list of products;
viewModeGrid.addEventListener('click', (e) => {
  e.target.classList.add('active');
  viewModeList.classList.remove('active');
});

viewModeList.addEventListener('click', (e) => {
  e.target.classList.add('active');
  viewModeGrid.classList.remove('active');
});
