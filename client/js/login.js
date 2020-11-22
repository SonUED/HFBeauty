const username = document.getElementById("username");
const password = document.getElementById("password");
// const accountData = localStorage.getItem("account");
const accountData = [
  {
    tenTaiKhoan: "user291",
    matKhau: "123456",
  },
  {
    tenTaiKhoan: "user271",
    matKhau: "123456",
  },
];
const isExist = (username, password) => {
  // return true;
  return accountData.find(
    (user) => user.tenTaiKhoan == username && user.matKhau == password
  );
};
const handleChange = (self) => {
  if (self.value.length < 6) {
    document.getElementById(self.id).classList.add("error");
  } else {
    document.getElementById(self.id).classList.remove("error");
  }
};
const login = (event) => {
  event.preventDefault();
  console.log(username.value + password.value);
  if (isExist(username.value, password.value)) {
    alert("Dang nhap thanh cong");
  } else {
    alert("Dang nhap that bai");
  }
};
