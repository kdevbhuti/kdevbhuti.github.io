const UserModel = require("../database/moduls/userModul");
const getData = require("./dataProvider");

async function emailLogin(req, res){
    var {email, password} = req.body;
    if(email && password){
        let findUser = await UserModel.findOne({email: email});
        if(findUser){
           if(findUser.password === password){
               if(!req.session.user){
                    req.session.user = await getData.getSession(findUser);
                }
                findUser.isDoctor ? res.redirect("wellcome") : res.redirect("/");
            }else{
                return res.render("emailLogin", {status: "Failure", message: "Incorrect password"});
            }
        }else{
            res.render("emailLogin", {status: "Failure", message: "Email is not registered."});
        }
    }
}



module.exports=({
    emailLogin: emailLogin
})