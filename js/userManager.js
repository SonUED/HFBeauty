var users = [
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
    diaChi: "2 Hoa Lien Hoa Vang",
  },
  {
    tenTaiKhoan: "nvc",
    tenKH: "Nguyen Van C",
    ngaySinh: "3/3/1999",
    anhDaiDien:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX-g7iDC3RkcWjMYAEJ-ogKQwfsJnPXns4aQ&usqp=CAU",
    mail: "nvc@gmail.com",
    soDienThoai: "0123456781",
    diaChi: "3 Hoa Lien Hoa Vang",
  },
];

function setUsersIntoLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsersFromLocalStorage() {
  users = JSON.parse(localStorage.getItem("users"));
}

function deleteUser(tenTaiKhoan) {
  users = users.filter((eachUser) => eachUser.tenTaiKhoan != tenTaiKhoan);
  loadTable();
}

function loadTable() {
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
