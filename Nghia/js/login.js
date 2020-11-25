const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const accountData = localStorage.getItem("account");
const isExist = (username, password) => {
    return accountData.some(
        (user) => user.TenTK === username && user.MatKhau === password
    );
};
const login = () => {
    console.log(user + password);
    if (isExist(user, password)) {
        alert("Sign in successful");
    } else {
        alert("Please input again");
    }
};