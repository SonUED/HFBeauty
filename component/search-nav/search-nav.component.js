const searchNavTemplate = document.createElement('template');

searchNavTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="/component/search-nav/search-nav.style.css">

<nav class="navbar search-navbar">
<form class="form-inline">
    <div class="btn-group">
        <input
            id="search"
            class="form-control search-navbar__search-field"
            type="search"
            placeholder="Search"
            aria-label="Search"
        />
        <button
            type="button"
            class="btn btn-outline-success my-2 my-sm-0 dropdown-toggle dropdown-toggle-split search-navbar__choose-attr"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <a
                class="dropdown-item"
                href="#"
                onclick="selectSearchField('tenSP')"
                >Name</a
            >
            <a
                class="dropdown-item"
                href="#"
                onclick="selectSearchField('maSP')"
                >Code</a
            >
            <a
                class="dropdown-item"
                href="#"
                onclick="selectSearchField('thuongHieu')"
                >Brand</a
            >
            <a
                class="dropdown-item"
                href="#"
                onclick="selectSearchField('maDM')"
                >Category</a
            >
        </div>
    </div>
</form>
</nav>
`;

class SearchNav extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = searchNavTemplate.innerHTML;
	}
}

customElements.define('search-nav-element', SearchNav);
