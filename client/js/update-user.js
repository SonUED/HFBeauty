var currentCustomer = {};
var customer = [];
const avatar = document.querySelector('.image');

showData();

function showData() {
  getCurrentCustomerFromStorage();
  document.querySelector('.show-data').innerHTML = '';
  document.querySelector('.overlay').style.display = 'none';
  avatar.src = currentCustomer.anhDaiDien;
  var data = `
  <div class="name">
    <h2 id="nameShow">${currentCustomer.tenKH}</h2>
  </div>
  <div class="profile">
      <h4>Ngày sinh:</h4>
      <p id="dateShow">${currentCustomer.ngaySinh}</p>
      <h4>Email:</h4>
      <p id="mailShow">${currentCustomer.mail} </p>
      <h4>Số điện thoại:</h4>
      <p id="PhoneShow">${currentCustomer.soDienThoai}</p>
      <h4>Địa chỉ:</h4>
      <p id="addressShow">${currentCustomer.diaChi}</p>
      <button type="button" class="btn btn-primary" onclick="showFormUpdate()">
        Cập nhật thông tin
      </button>
  </div>`;
  document.querySelector('.show-data').innerHTML += data;
}
function showFormUpdate() {
  document.querySelector('.form-customer').style.display = 'block';
  document.querySelector('.profile').style.display = 'none';
  document.querySelector('.overlay').style.display = 'block';

  document.querySelector('#name1').value = currentCustomer.tenKH;
  document.querySelector('#date').value = currentCustomer.ngaySinh;
  document.querySelector('#mail').value = currentCustomer.mail;
  document.querySelector('#phone').value = currentCustomer.soDienThoai;
  document.querySelector('#adress').value = currentCustomer.diaChi;
}
function hiddenForm() {
  document.querySelector('.form-customer').style.display = 'none';
  document.querySelector('.profile').style.display = 'block';

  showData();
}

function save() {
  getCustomerFromStorage();
  var indexOfCurrentCustomer = customer.indexOf(currentCustomer);

  currentCustomer.tenKH = document.querySelector('#name1').value;
  currentCustomer.ngaySinh = document.querySelector('#date').value;
  currentCustomer.mail = document.querySelector('#mail').value;
  currentCustomer.soDienThoai = document.querySelector('#phone').value;
  currentCustomer.diaChi = document.querySelector('#adress').value;
  currentCustomer.anhDaiDien = avatar.src;

  customer[indexOfCurrentCustomer] = currentCustomer;
  saveCustomerToStorage();
  saveCurrentCustomerToStorage();
  hiddenForm();
  showData();
  alert("Đã sửa thành công")
}

function changeImage(imgAvatar) {
  const imageObject = imgAvatar.files[0];

  if (imageObject) {
    if (/\.(jpe?g|png|gif|webp)$/i.test(imageObject.name)) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          avatar.src = this.result;
        },
        false
      );
      reader.readAsDataURL(imageObject);
    }
  }
  console.log(currentCustomer.anhDaiDien === avatar.src);
}

function getCustomerFromStorage() {
  let customerString = localStorage.getItem('customer');
  customer = JSON.parse(customerString) || [];
}
function getCurrentCustomerFromStorage() {
  let currentCustomerString = localStorage.getItem('currentCustomer');
  currentCustomer = JSON.parse(currentCustomerString) || [];
}

function saveCurrentCustomerToStorage() {
  let currentCustomerString = JSON.stringify(currentCustomer);
  localStorage.setItem('currentCustomer', currentCustomerString);
}
function saveCustomerToStorage() {
  let customerString = JSON.stringify(customer);
  localStorage.setItem('customer', customerString);
}
