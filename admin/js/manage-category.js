var category = [
    {
        index: 0,
        name: "Son Xáp",
        description: "123",
        image: "https://media3.scdn.vn/img3/2019/3_17/OWbf3h_simg_de2fe0_500x500_maxb.jpg"
    },
    {
        index: 1,
        name: "Son Nước",
        description: "123",
        image: "https://media3.scdn.vn/img3/2019/7_3/ubH8on_simg_de2fe0_500x500_maxb.jpg"
    },
    {
        index: 2,
        name: "Son Dưỡng",
        description: "123",
        image: "https://product.hstatic.net/1000025647/product/son-duong-dior-001-pink_grande_9e54348245de42f5a816f49a3bbc30bc_grande.png"
    }
]

checkData();
showCategory();

function showCategory() {
    document.querySelector(".table-category").innerHTML = ""

    category = getCategory()
    category.map(item => { 
        var row = '<tr>' + 
            '<td>' +item.index+ '</td>'+
            '<td>' +item.name+ '</td>'+
            '<td>' +item.description+ '</td>'+
            '<td><img class="img-thumbnail" src="'+item.image+'"/></td>'+
            '<td><input class="btn btn-outline-dark" type="button" value="Chỉnh sửa" onclick="editCategory(' + item.index + ')"></td>'+
            '<td><input class="btn btn-outline-dark" type="button" value="Xóa" onclick="deleteCategory(' + item.index + ')"></td>'+
        '</tr>'
        
        document.querySelector(".table-category").innerHTML += row;
    })
}

function save() {
    var index = document.getElementById("index").value;
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var image = document.getElementById("image").value;
    category = getCategory();
    var item

    if(index == "") {
        item = {
            index: category.length,
            name: name,
            description: description,
            image: image
        };
    }else {
        item = {
            index: index.substr(index.length - 1),
            name: name,
            description: description,
            image: image
        };
    }
    updateCategory(item);
    showCategory();
    showForm();
}
function editCategory(index) {
    showForm();
    category = getCategory();
    document.getElementById("index").value = index
    document.getElementById("name").value = category[index].name
    document.getElementById("description").value = category[index].description
    document.getElementById("image").value = category[index].image
}
function deleteCategory(index) {
    category = getCategory();

    category.splice(index,1);
    localStorage.setItem("category", JSON.stringify(category))

    showCategory()
}

function showForm(){
    category = getCategory();
    document.getElementById("index").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
    var display = document.querySelector(".form-category").style.display;

    if (display === "block") {
        document.querySelector(".form-category").style.display = "none";
        document.querySelector(".table").style.display = "table";

    }else {
        document.querySelector(".form-category").style.display = "block";
        document.querySelector(".table").style.display = "none";

    }
}

function updateCategory(item) {
    category = getCategory()

    if(item.index < category.length){
        category[item.index] = item;
    }else {
        category.push(item);
    }
    localStorage.setItem("category", JSON.stringify(category));
}

function getCategory(){
    var data = localStorage.getItem("category");
    data = JSON.parse(data);
    return data;
}

function checkData(){
    if(!category){
        category = getCategory();
    }else{
        localStorage.setItem("category", JSON.stringify(category));
    }
}
