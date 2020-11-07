const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const accountData = localStorage.getItem("account");
const isExist = (username, password) => {
  return accountData.some(
    (user) => user.TenTK === username && user.MatKhau === password
  );
};
const handleChange = (self) => {
  if (self.value.length < 6) {
    document.getElementById(self.id).classList.add("error");
  } else {
    document.getElementById(self.id).classList.remove("error");
  }
};
const login = () => {
  console.log(user + password);
  if (isExist(user, password)) {
    alert("Dang nhap thanh cong");
  } else {
    alert("Dang nhap that bai");
  }
};
