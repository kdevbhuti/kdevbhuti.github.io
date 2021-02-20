


 // Email login validation for password
 document.getElementById("login").addEventListener("click", () => {
     var password = document.getElementById("password");
     var re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
     if (password.value === "") {
         password.setCustomValidity("Please fill out the field.")
     } else if (!re.test(password.value)) {
         password.setCustomValidity("Must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter");
     } else {
         password.setCustomValidity("")
     }
 })
