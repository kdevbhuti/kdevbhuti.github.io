document.getElementById("login").addEventListener("click", () => {
    //for Match password
    var password = document.getElementById("password");
    var matchPassword = document.getElementById("matchPassword");
    if (matchPassword.value === password.value) {
        matchPassword.setCustomValidity("")
    } else {
        matchPassword.setCustomValidity("Pasword not match")
    }
})