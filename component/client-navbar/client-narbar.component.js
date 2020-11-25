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
          <ul class="navbar-nav">
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
              <a href="./login.html" class="nav-link active">Đăng nhập</a>
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
customElements.define("navbar-element", ClientNavbar);
