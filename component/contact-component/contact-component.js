const contactElement= document.createElement('template');

contactElement.innerHTML = `
<link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      crossorigin="anonymous"
    />

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
      crossorigin="anonymous"
    />
<link rel="stylesheet" href="../style/contact.css" />

<button class="open-button" onclick="showForm()">
      <i class="fas fa-comments"></i>
    </button>

    <div class="form-contact">
      <form action="" class="form-container">
        <h1>Phản hồi</h1>

        <label for="name"><b>Tên</b></label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          id="name"
          required
        />
        <br />
        <label for="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        />
        <br />
        <label for="message"><b>Nội dung</b></label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Enter your message"
          id="message"
        ></textarea>

        <button type="button" class="btn btn-success" onclick="sent()">
          Gửi
        </button>
        <button type="button" class="btn btn-danger" onclick="showForm()">
          hủy
        </button>
      </form>
    </div>

`;

class ContactForm extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = contactElement.innerHTML;
	}
}

customElements.define('contact-element', ContactForm);
