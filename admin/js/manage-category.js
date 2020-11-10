var category = [
  {
    index: "DM0",
    name: "Son Xáp",
    description: "123",
    image:
      "https://media3.scdn.vn/img3/2019/3_17/OWbf3h_simg_de2fe0_500x500_maxb.jpg",
  },
  {
    index: "DM1",
    name: "Son Nước",
    description: "123",
    image:
      "https://media3.scdn.vn/img3/2019/7_3/ubH8on_simg_de2fe0_500x500_maxb.jpg",
  },
  {
    index: "DM2",
    name: "Son Dưỡng",
    description: "123",
    image:
      "https://product.hstatic.net/1000025647/product/son-duong-dior-001-pink_grande_9e54348245de42f5a816f49a3bbc30bc_grande.png",
  },
];

function showCategory() {
  document.querySelector(".table-category").innerHTML = "";
  category.map((item) => {
    var row = `<tr>
            <td> ${item.index} </td>
            <td> ${item.name} </td>
            <td> ${item.description} </td>
            <td><img class="img-thumbnail" src="${item.image}"/></td>
            <td><input class="btn btn-success" type="button" value="Sửa" onclick="editCategory('${item.index}')"></td>
            <td><input class="btn btn-danger" type="button" value="Xóa" onclick="deleteCategory('${item.index}')"></td>
        </tr>`;

    document.querySelector(".table-category").innerHTML += row;
  });
}

function save() {
  getCategoryFromStorage()

  var index = document.getElementById("index").value;
  var name = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var image = document.getElementById("image").value;

  var item = {
    index: index,
    name: name,
    description: description,
    image: image,
  };
  if (index == "") {
    index = category[category.length - 1].index;
    index = parseInt(index.slice(2, index.length));
    index++;
    index = "DM" + index;
    item.index = index;
    category.push(item);
  } else {
    category = category.map(cate => cate.index === item.index ?   item : cate);
  }


  saveCategoryToStorage();
  showCategory();
  showForm();
}
function editCategory(index) {
  showForm();
  getCategoryFromStorage();
  index = index.slice(2, index.length);
  document.getElementById("index").value = "DM" + index;
  document.getElementById("name").value = category[index].name;
  document.getElementById("description").value = category[index].description;
  document.getElementById("image").value = category[index].image;
}
function deleteCategory(index) {
  getCategoryFromStorage();
  category = category.filter((item) => item.index != index);
  saveCategoryToStorage();
  showCategory();
}

function showForm() {
  getCategoryFromStorage();
  document.getElementById("index").value = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
  var display = document.querySelector(".form-category").style.display;

  if (display === "block") {
    document.querySelector(".form-category").style.display = "none";
    document.querySelector(".table").style.display = "table";
  } else {
    document.querySelector(".form-category").style.display = "block";
    document.querySelector(".table").style.display = "none";
  }
}


function searching(inputText) {
  inputText = inputText.toLowerCase().trim();
  inputText = inputText.replace(/\s\s+/g, " ");

  getCategoryFromStorage();

  if (inputText == "") {
    showCategory();
    return;
  }

  let keywords = inputText.split(" ");
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
  let categoryString = localStorage.getItem("category");
  category = JSON.parse(categoryString) || [];
}

function saveCategoryToStorage() {
  let categoryString = JSON.stringify(category);
  localStorage.setItem("category", categoryString);
}

function loadData() {
  getCategoryFromStorage();
  showCategory();
}

