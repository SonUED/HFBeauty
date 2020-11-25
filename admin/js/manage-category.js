var category = [];

function showCategory() {
  document.querySelector('.table-category').innerHTML = '';
  category.map((item) => {
    var row = `<tr>
            <td> ${item.maDM} </td>
            <td> ${item.tenDM} </td>
            <td> ${item.moTa} </td>
            <td><img class="img-thumbnail" src="${item.anh}"/></td>
            <td><input class="btn btn-success" type="button" value="Sửa" onclick="editCategory('${item.maDM}')"></td>
            <td><input class="btn btn-danger" type="button" value="Xóa" onclick="deleteCategory('${item.maDM}')"></td>
        </tr>`;

    document.querySelector('.table-category').innerHTML += row;
  });
}

function save() {
  getCategoryFromStorage();

  var index = document.getElementById('index').value;
  var name = document.getElementById('name').value;
  var description = document.getElementById('description').value;
  var image = document.getElementById('image').value;

  if (!name || !description || !image) {
    alert('Tất cả các trường không được để trống');
  } else {
    var item = {
      maDM: index,
      tenDM: name,
      moTa: description,
      anh: image
    };

    if (index == '') {
      index = category[category.length - 1].maDM;
      index = parseInt(index.slice(2, index.length));
      index++;
      index = 'DM' + index;
      item.maDM = index;
      category.push(item);
    } else {
      category = category.map((cate) =>
        cate.maDM === item.maDM ? item : cate
      );
    }

    saveCategoryToStorage();
    showCategory();
    showForm();
  }
}
function editCategory(index) {
  showForm();
  getCategoryFromStorage();
  index = index.slice(2, index.length) - 1;
  document.getElementById('index').value = 'DM' + index;
  document.getElementById('name').value = category[index].tenDM;
  document.getElementById('description').value = category[index].moTa;
  document.getElementById('image').value = category[index].anh;
}
function deleteCategory(index) {
  getCategoryFromStorage();
  category = category.filter((item) => item.maDM != index);
  saveCategoryToStorage();
  showCategory();
}

function showForm() {
  getCategoryFromStorage();
  document.getElementById('index').value = '';
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('image').value = '';
  var display = document.querySelector('.form-category').style.display;

  if (display === 'block') {
    document.querySelector('.form-category').style.display = 'none';
    document.querySelector('.table').style.display = 'table';
  } else {
    document.querySelector('.form-category').style.display = 'block';
    document.querySelector('.table').style.display = 'none';
  }
}

function searching(inputText) {
  inputText = inputText.toLowerCase().trim();
  inputText = inputText.replace(/\s\s+/g, ' ');

  getCategoryFromStorage();

  if (inputText == '') {
    showCategory();
    return;
  }

  let keywords = inputText.split(' ');
  category = category.filter((eachUser) => {
    return Object.keys(eachUser).some((key) => {
      return keywords.reduce(
        (acc, word) => acc && eachUser[key].toLowerCase().includes(word),
        true
      );
    });
  });
  showCategory();
}

function getCategoryFromStorage() {
  let categoryString = localStorage.getItem('category');
  category = JSON.parse(categoryString) || [];
}

function saveCategoryToStorage() {
  let categoryString = JSON.stringify(category);
  localStorage.setItem('category', categoryString);
}

function loadData() {
  getCategoryFromStorage();
  showCategory();
}
function fetchCategory() {
  fetch('../../data/categories.json')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('category', JSON.stringify(data['categories']));
    });
}
// fetchCategory()
