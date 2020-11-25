const handleChange = (self) => {
    if (self.value.length < 6) {
        document.getElementById(self.id).classList.add("error");
    } else {
        document.getElementById(self.id).classList.remove("error");
    }
};