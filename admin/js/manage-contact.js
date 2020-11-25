var contact = [];
var tab = ["all", "unseen", "seen"];

function showContact(mess) {
  getContactFromStorage();
  borderBottom(mess)
  document.querySelector(".table-contact").innerHTML = "";
  var btn = "";
  
  if (mess !== "all") {
    contact = contact.filter((item) => item.status === mess);
  }

  contact.map((item) => {
    if (mess === "unseen") {
      btn = `<input class="btn btn-success" type="button" value="Đã Đọc " onclick="seen('${item.id}')">`;
    } else {
      btn = `${item.status}`;
    }
    var row = `<tr>
        <td> ${item.id} </td>
        <td> ${item.name} </td>
        <td> ${item.email} </td>
        <td> ${item.message} </td>
        <td> ${item.date} </td>
        <td><b>${btn}</b></td>
    </tr>`;
    document.querySelector(".table-contact").innerHTML += row;
  });
}

function seen(id) {
  getContactFromStorage();
  contact.map((item) => {
    if (item.id === id) {
      console.log(id);
      item.status = "seen";
    }
  });
  console.log(contact);
  saveContactToStorage();
  showContact("unseen");
}

function borderBottom(mess) {
  tab.map((item) => {
    if (item === mess) {
      document.querySelector("." + item).style.borderBottom = "3px solid orange";
    } else {
      document.querySelector("." + item).style.borderBottom = "0";
    }
  });
}

function getContactFromStorage() {
  let contactString = localStorage.getItem("contact");
  contact = JSON.parse(contactString) || [];
}

function saveContactToStorage() {
  let contactString = JSON.stringify(contact);
  localStorage.setItem("contact", contactString);
}
