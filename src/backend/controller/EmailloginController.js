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
                req.flash ('status', ['Success', "login Successfilly."]);
                findUser.isDoctor ? res.redirect("wellcome") : res.redirect("/");
            }else{
                req.flash ('status', ['Failure', "Incorrect password."]);
                res.redirect("emailLogin");
            }
        }else{
            req.flash ('status', ['Failure', "Email is not registered."]);
            res.redirect("emailLogin");
        }
    }
}



module.exports=({
    emailLogin: emailLogin
})