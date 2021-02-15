

function home(req, res){
   res.render("index")
}

function signup(req, res){
    res.render("signup", {status: undefined})
 }

function emailLogin(req, res){
    res.render("emailLogin", {status: undefined})
}

module.exports=({
    home: home,
    signup: signup,
    emailLogin: emailLogin
});