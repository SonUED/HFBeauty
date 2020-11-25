var contact = [];

function showForm() {
  var display = document.querySelector(".form-contact").style.display;
  if(display === "block"){
    document.querySelector(".form-contact").style.display = "none";
  }else{
    document.querySelector(".form-contact").style.display = "block";
  }
}

function sent() {
  getContactFromStorage();

  var name = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var message = document.querySelector("#message").value;
  var today = new Date();

  if (!name || !email || !message) {
    alert("Tất cả các trường không được để trống");
  }else {
    var newContact = {
      id: "CT" + contact.length,
      name: name,
      email: email,
      message: message,
      date: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      status: "unseen"
    }
  
    contact.push(newContact);
    saveContactToStorage();
    showForm();
  }

  
}

function getContactFromStorage(){
  let contactString = localStorage.getItem("contact");
  contact = JSON.parse(contactString) || [];
}

function saveContactToStorage() {
  let contactString = JSON.stringify(contact);
  localStorage.setItem("contact", contactString);
}
