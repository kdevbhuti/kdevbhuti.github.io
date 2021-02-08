

function home(req, res){
   res.render("index")
}

function signup(req, res){
    res.render("signup")
 }

function login(req, res){
    res.render("login")
}

module.exports=({
    home: home,
    signup: signup,
    login: login
});