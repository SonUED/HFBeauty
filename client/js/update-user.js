var customer = [
  {
    tenTaiKhoan: "nva",
    tenKH: "Nguyen Van A",
    ngaySinh: "1999-01-01",
    anhDaiDien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
    mail: "nva@gmail.com",
    soDienThoai: "0123456789",
    diaChi: "1 Hoa Lien Hoa Vang",
  },
];

showData();

function showData() {
  document.querySelector(".show-data").innerHTML = "";
  var data = `<div class="container">
    <img alt="Avatar" class="image" src="${customer[0].anhDaiDien}" />
    <div class="overlay">
      <div class="text" onclick="updateAvatar()">Cập nhật ảnh đại diện</div>
    </div>
  </div>
  <div class="name">
    <h2>${customer[0].tenKH}</h2>
  </div>
  <div class="profile">
      <h4>Ngày sinh:</h4>
      <p>${customer[0].ngaySinh}</p>
      <h4>Email:</h4>
      <p>${customer[0].mail} </p>
      <h4>Số điện thoại:</h4>
      <p>${customer[0].soDienThoai}</p>
      <h4>Địa chỉ:</h4>
      <p>${customer[0].diaChi}</p>
      <button type="button" class="btn btn-primary" onclick="showForm()">
        update
      </button>
  </div>`;
  document.querySelector(".show-data").innerHTML += data;
}
function showForm() {
  document.querySelector(".form-user").style.display = "block";
  document.querySelector(".profile").style.display = "none";

  document.querySelector("#name").value = customer[0].tenKH;
  document.querySelector("#date").value = customer[0].ngaySinh;
  document.querySelector("#mail").value = customer[0].mail;
  document.querySelector("#phone").value = customer[0].soDienThoai;
  document.querySelector("#adress").value = customer[0].diaChi;
}
function hiddenForm() {
  document.querySelector(".form-user").style.display = "none";
  document.querySelector(".profile").style.display = "block";

  showData();
}

function save() {
  customer[0].tenKH = document.querySelector("#name").value;
  customer[0].ngaySinh = document.querySelector("#date").value;
  customer[0].mail = document.querySelector("#mail").value;
  customer[0].soDienThoai = document.querySelector("#phone").value;
  customer[0].diaChi = document.querySelector("#adress").value;
  console.log(customer[0].ngaySinh);
  hiddenForm();
  showData();
}

function updateAvatar() {
  alert("update avatar");
}
