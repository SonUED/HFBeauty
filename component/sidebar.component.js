const SideBarElement = document.createElement("template");
SideBarElement.innerHTML = ` 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="/admin/style/sidebar.css">
<link rel="stylesheet" type="text/css" href="/admin/style/reset.css">
<div class="sidebar">
        <div class="sidebar__head">
           <p class="title">HF BEAUTY</p>
        </div>
        <div class="sidebar__items">
            <ul>
             
               <a href="./user-management.html"> <li class="item"><i  class="fa fa-user"></i> Quản lý người dùng</li></a>
               <a href="./product-management.html"><li class="item"><i class="fa fa-box-tissue"></i>Quản lý sản phẩm</li></a>
               <a href="./manage-order.html"><li class="item"><i class="fa fa-box-tissue"></i>Quản lý đơn hàng</li></a>
               <a href="./sale-management.html"><li class="item"><i class="fa fa-tag"></i>Quản lý khuyến mãi</li></a>
               <a href="./manage-category.html"><li class="item"><i class="fa fa-list-alt"></i>Quản lý danh mục</li></a>
                <a href="./manage-contact.html"><li class="item"><i class="fa fa-list-alt"></i>Quản lý liên hệ</li></a>
               <a href="./statistical.html"><li class="item"><i class="fa fa-chart-line"></i>Thống kê</li></a>
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
