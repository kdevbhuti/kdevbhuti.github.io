
function home(req, res){
    res.render("index", {status: undefined, message: "login Successfilly", user: req.session.user});
}

function signup(req, res){
    res.render("signup", {status: undefined})
 }

function emailLogin(req, res){
    if(req.cookies.loginFirst){
        res.clearCookie('loginFirst');
        res.render("emailLogin", {status: "Failure", message: "Please Login first."});
    }else{
        res.render("emailLogin", {status: undefined})
    }
}

function wellcome(req, res){
    res.render("wellcome", {user: req.session.user})
}

function logOut(req, res){
    if(req.session.user){
        req.session.destroy();
    }
    res.redirect("/emaillogin")
}

function doctor(req, res){
    res.render("doctor");
}

function hospital(req, res){
    res.render("hospital")
}

module.exports=({
    home: home,
    signup: signup,
    emailLogin: emailLogin,
    logOut: logOut,
    doctor: doctor,
    hospital: hospital,
    wellcome: wellcome
});