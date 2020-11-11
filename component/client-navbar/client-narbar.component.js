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
              <a href="#" class="nav-link active">MAKE UP</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">HAIR</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">PERSONAL CARE</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">FRAGRANCE</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">NIGHT WEAR</a>
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
