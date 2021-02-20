const UserModel = require("../database/moduls/userModul");

function emailLogin(req, res){
    var {email, password} = req.body;
    if(email && password){
        UserModel.findOne({email:email}, function (err, user){
           if(user && user.password === password){
               if(!req.session.userid){
                    req.session.userid = user._id;
                    req.session.name = user.name
               }
                return res.redirect("/");
            }else{
                return res.render("emailLogin", {status: "Failure", message: "Incorrect email or password"});
           }
        })
    }
}

function phoneLogin(){
    
}

module.exports=({
    emailLogin: emailLogin
})