document.getElementById("signup").addEventListener("click", validate);
    
// for signup validation
function validate() {
        let password = document.getElementById("password");
        var re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
        if (!re.test(password.value)) {
            password.setCustomValidity("Must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter");
        } else {
            password.setCustomValidity("")
        }


        let phNumber = document.getElementById("phNumber");
        if (new RegExp("[0-9]{10}").test(phNumber.value)) {
            phNumber.setCustomValidity("");
        } else {
            phNumber.setCustomValidity("Must contain 10 digits");
        }
    }