const NavbarElement = document.createElement("template");
NavbarElement.innerHTML = `
    <nar class="navbar navbar-expand-md navbar-light bg-light stick-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-md-center"
          id="navbarResponsive"
        >
          <ul class="navbar-nav">"
            <li class="nav-item">
              <a href="./home.html" class="nav-link active">Trang chủ</a>
            </li>
            <li class="nav-item">
              <a href="./product-page.html" class="nav-link">Trang sản phẩm</a>
            </li>
          </ul>
        </div>
        <div
          class="justify-content-md-right"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
            <span><a href="./login.html"  id="login" class="nav-link active">Đăng nhập</a></span>
              <span> <a href="./order.html"  id="user" class="nav-link active"><i class="fas fa-user"></i></a></span>
              <span><a href="./login.html" onclick="logout()"  id="logout" class="nav-link active"><i class="fas fa-sign-out-alt"></i></a></span>
            </li>
            <li class="nav-item">
              <a href="./cart.html" class="nav-link"><i class="fas fa-shopping-cart"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nar>

`;
class ClientNavbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = NavbarElement.innerHTML;
  }
}
const checkCurrentUser = () => {
  var currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
  if (currentCustomer == null) {
    document.getElementById("login").style.display = "block";
    document.getElementById("user").style.display = "none";
    document.getElementById("logout").style.display = "none";
  } else {
    document.getElementById("login").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById("logout").style.display = "block";
  }
};
const logout = () => {
  localStorage.setItem("currentCustomer", null);
};
customElements.define("navbar-element", ClientNavbar);
checkCurrentUser();
