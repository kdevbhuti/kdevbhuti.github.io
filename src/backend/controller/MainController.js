



function home(req, res){
    res.render("index", {status: undefined, message: "login Successfilly", name: req.session.name});
}

function signup(req, res){
    res.render("signup", {status: undefined})
 }

function emailLogin(req, res){
    res.render("emailLogin", {status: undefined})
}



function logOut(req, res){
    if(req.session.userid){
        req.session.destroy();
    }
    res.redirect("/emaillogin")
}



module.exports=({
    home: home,
    signup: signup,
    emailLogin: emailLogin,
    logOut: logOut,
    // createNewPassword: createNewPassword
});