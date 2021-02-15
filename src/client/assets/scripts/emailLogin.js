 // For password visibility
 document.getElementById("password-eye").addEventListener("click", paswordEye)

 function paswordEye() {
     event.target.classList.toggle("fa-eye");
     event.target.classList.toggle("fa-eye-slash");
     var password = document.getElementById("password");
     if (password.type === "password") {
         password.type = "text";
     } else {
         password.type = "password";
     }
 }


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
