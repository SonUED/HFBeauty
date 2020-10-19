const userData = [{ id: 1, TenTK: "sonbk1", MatKhau: "123456" }];

const isExist = (username, password) => {
  return userData.some(
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
  const user = form_login.username.value;
  const password = form_login.password.value;
  console.log(user + password);
  if (isExist(user, password)) {
    localStorage.setItem("user", user, password);
    alert("Dang nhap thanh cong");
  } else {
    alert("Dang nhap that bai");
  }
};
