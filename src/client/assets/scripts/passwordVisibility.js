 // For password visibility
 document.getElementById("password-eye").addEventListener("click", paswordEye)

 function paswordEye(event) {
     event.target.classList.toggle("fa-eye");
     event.target.classList.toggle("fa-eye-slash");
     var password = document.getElementById("password");
     if (password.type === "password") {
         password.type = "text";
     } else {
         password.type = "password";
     }
 }