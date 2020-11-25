// const accountData = localStorage.getItem("account");
const accountData = JSON.parse(localStorage.getItem("account")) || [];
var errorArr = [];
document.getElementById("btn__login").disabled = true;
document.getElementById("btn__signup").disabled = true;
const active = (idDis, idHide) => {
  document.getElementById(idDis).classList.toggle("active");
  document.getElementById(idHide).classList.toggle("active");
  idDis === "lableSignIn"
    ? (document.getElementById("sign-in").style.display = "block")(
        (document.getElementById("sign-up").style.display = "none")
      )
    : (document.getElementById("sign-up").style.display = "block")(
        (document.getElementById("sign-in").style.display = "none")
      );
};
// LOGIN
const isExistToLogin = (username, password) => {
  return accountData.filter(
    (user) => user.TenTaiKhoan == username && user.MatKhau == password
  );
};
const handleChange = (self) => {
  if (self.value.length < 6) {
    document.getElementById(self.id).classList.add("error");
    errorArr.push(self.id);
    document.getElementById("error").innerHTML =
      "Tài khoản / mật khẩu phải có 6-60 ký tự !";
  } else {
    errorArr.splice(errorArr.indexOf(self.id), 1);
    document.getElementById(self.id).classList.remove("error");
    document.getElementById("error").innerHTML = "";
    errorArr.length > 0
      ? (document.getElementById("btn__login").disabled = true)(
          (document.getElementById("btn__signup").disabled = true)
        )
      : (document.getElementById("btn__login").disabled = false)(
          (document.getElementById("btn__signup").disabled = false)
        );
  }
};
const login = (event) => {
  event.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  console.log(username.value + password.value);
  if (isExistToLogin(username.value, password.value).length > 0) {
    localStorage.setItem(
      "currentCustomer",
      JSON.stringify(isExistToLogin(username.value, password.value)[0])
    );
    window.location.href = "../html/product-page.html";
  } else {
    alert("Dang nhap that bai");
  }
};

// SIGN UP
const isExistToSignUp = (username) => {
  return accountData.find((user) => user.tenTaiKhoan == username);
};
const checkPassword = (password, confirmPassword) => {
  return password == confirmPassword;
};

const signup = (event) => {
  event.preventDefault();
  const TenTaiKhoan = document.getElementById("usernameToSignUp");
  const MatKhau = document.getElementById("passwordSignUp");
  const xacnhanMatKhau = document.getElementById("confirmPassword");
  const Mail = document.getElementById("email");
  if (!checkPassword(MatKhau.value, xacnhanMatKhau.value)) {
    document.getElementById("error").innerHTML = "Mật khẩu không khớp !";
  } else {
    if (isExistToSignUp(TenTaiKhoan.value)) {
      document.getElementById("error").innerHTML = "Tài khoản đã tồn tại !";
    } else {
      const user = {
        TenTaiKhoan: TenTaiKhoan.value,
        MatKhau: MatKhau.value,
        Mail: Mail.value,
        NgaySinh: "01/01/1989",
        AnhDaiDien: "../imgs/avt.png",
        SDT: 0972053952,
        DiaChi: "",
        vaiTro: "KhachHang",
      };
      accountData.push(user);
      localStorage.setItem("account", JSON.stringify(accountData));
    }
    TenTaiKhoan.value = "";
    MatKhau.value = "";
    xacnhanMatKhau.value = "";
    Mail.value = "";
    document.getElementById("error").innerHTML = "Đăng ký thành công";
  }
};
