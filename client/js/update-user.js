var currentCustomer = 
  {
    tenTaiKhoan: "nva",
    tenKH: "Nguyen Van A",
    ngaySinh: "1999-01-01",
    anhDaiDien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
    mail: "nva@gmail.com",
    soDienThoai: "0123456789",
    diaChi: "1 Hoa Lien Hoa Vang",
  }

showData();

function showData() {
  document.querySelector(".show-data").innerHTML = "";
  var data = `<div class="container">
    <img alt="Avatar" class="image" src="${currentCustomer.anhDaiDien}" />
    <div class="overlay">
      <label for="avatar" class="text" onclick="updateAvatar()">
        Cập nhật ảnh đại diện
        <input type="file" id="avatar" class="avatar-upload-file" onchange="changeImage(this)">
      </label>
    </div>
  </div>
  <div class="name">
    <h2>${currentCustomer.tenKH}</h2>
  </div>
  <div class="profile">
      <h4>Ngày sinh:</h4>
      <p>${currentCustomer.ngaySinh}</p>
      <h4>Email:</h4>
      <p>${currentCustomer.mail} </p>
      <h4>Số điện thoại:</h4>
      <p>${currentCustomer.soDienThoai}</p>
      <h4>Địa chỉ:</h4>
      <p>${currentCustomer.diaChi}</p>
      <button type="button" class="btn btn-primary" onclick="showForm()">
        update
      </button>
  </div>`;
  document.querySelector(".show-data").innerHTML += data;
}
function showForm() {
  document.querySelector(".form-user").style.display = "block";
  document.querySelector(".profile").style.display = "none";

  document.querySelector("#name").value = currentCustomer.tenKH;
  document.querySelector("#date").value = currentCustomer.ngaySinh;
  document.querySelector("#mail").value = currentCustomer.mail;
  document.querySelector("#phone").value = currentCustomer.soDienThoai;
  document.querySelector("#adress").value = currentCustomer.diaChi;
}
function hiddenForm() {
  document.querySelector(".form-user").style.display = "none";
  document.querySelector(".profile").style.display = "block";

  showData();
}

function save() {
  currentCustomer.tenKH = document.querySelector("#name").value;
  currentCustomer.ngaySinh = document.querySelector("#date").value;
  currentCustomer.mail = document.querySelector("#mail").value;
  currentCustomer.soDienThoai = document.querySelector("#phone").value;
  currentCustomer.diaChi = document.querySelector("#adress").value;
  console.log(currentCustomer.ngaySinh);
  hiddenForm();
  showData();
}

function updateAvatar() {
  // alert("update avatar");
}

function changeImage (inProductImg) {
  const imageObject = inProductImg.files[0];

  if (imageObject) {
    // Make sure `file.name` matches our extensions criteria
    if (/\.(jpe?g|png|gif|webp)$/i.test(imageObject.name)) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          document.querySelector(".image").src = this.result
          
        },
        false
      );
      reader.readAsDataURL(imageObject);
    }
  }
};
