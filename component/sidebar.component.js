const SideBarElement = document.createElement("template");
SideBarElement.innerHTML = ` <div class="sidebar">
        <div class="sidebar__head">
           <p class="title">HF BEAUTY</p>
        </div>
        <div class="sidebar__items">
            <ul>
                <li class="item"><i  class="fa fa-user"></i> Quản lý người dùng</li>
                <li class="item"><i  class="fa fa-box-tissue"></i>Quản lý sản phẩm</li>
                <li class="item"><i  class="fa fa-tag"></i>Quản lý khuyến mãi</li>
                <li class="item"><i  class="fa fa-info"></i>Quản lý tài khoản</li>
                <li class="item"><i class="fa fa-list-alt"></i>Quản lý danh mục</li>
                <li class="item"><i class="fa fa-chart-line"></i>Thống kê</li>
            </ul>
        </div>
    </div>`;
class SideBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = SideBarElement.innerHTML;
  }
}
customElements.define("sidebar-element", SideBar);
