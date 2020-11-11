var gUsers = [
  {
    tenTaiKhoan: "nva",
    tenKH: "Nguyen Van A",
    ngaySinh: "1/1/1999",
    anhDaiDien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
    mail: "nva@gmail.com",
    soDienThoai: "0123456789",
    diaChi: "1 Hoa Lien Hoa Vang",
  },
  {
    tenTaiKhoan: "nvb",
    tenKH: "Nguyen Van B",
    ngaySinh: "2/2/1999",
    anhDaiDien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
    mail: "nvc@gmail.com",
    soDienThoai: "0123456781",
    diaChi: "2 Lien Chieu",
  },
  {
    tenTaiKhoan: "nvc",
    tenKH: "Nguyen Van C",
    ngaySinh: "3/3/1999",
    anhDaiDien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
    mail: "nvc@gmail.com",
    soDienThoai: "0123456781",
    diaChi: "3 Hai Chau",
  },
];

function setUsersIntoLocalStorage() {
  localStorage.setItem("users", JSON.stringify(gUsers));
}

function getUsersFromLocalStorage() {
  gUsers = JSON.parse(localStorage.getItem("users"));
}

function deleteUser(tenTaiKhoan) {
  gUsers = gUsers.filter((eachUser) => eachUser.tenTaiKhoan != tenTaiKhoan);
  loadTable(gUsers);
}

function searching(inputText) {
  inputText = inputText.toLowerCase().trim();
  inputText = inputText.replace(/\s\s+/g, " ");

  if (inputText == "") {
    loadTable(gUsers);
    return;
  }

  let keywords = inputText.split(" ");
  let sUsers = gUsers.filter((eachUser) => {
    return Object.keys(eachUser).some((key) => {
      return keywords.reduce(
        (acc, word) => acc && eachUser[key].toLowerCase().includes(word),
        true
      );
    });
  });
  loadTable(sUsers);
}

function loadTable(users) {
  let tblBody = document.querySelector("#tblBody");
  let no = 0;
  tblBody.innerHTML = "";

  users.forEach((eachUser) => {
    tblBody.innerHTML += `
  		<tr>
  			<td>${++no}</td>
  			<td><img src=${
          eachUser.anhDaiDien
        } style="width: 50px; height: 50px;" alt="Unknown"></td>
  			<td>${eachUser.tenKH}</td>
  			<td>${eachUser.ngaySinh}</td>
  			<td>${eachUser.mail}</td>
  			<td>${eachUser.soDienThoai}</td>
  			<td>${eachUser.diaChi}</td>
  			<td>${eachUser.tenTaiKhoan}</td>
  			<td>
  				<Button class="btn btn-danger" onclick="deleteUser('${
            eachUser.tenTaiKhoan
          }')">Xoá</Button>
  			</td>
  		</tr>
    `;
  });
}
