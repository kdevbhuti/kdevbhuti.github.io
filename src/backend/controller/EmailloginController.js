const UserModel = require("../database/moduls/userModul");
const doctorModel = require("../database/moduls/doctorModule")

async function emailLogin(req, res){
    var {email, password} = req.body;
    if(email && password){
        const findUser = await UserModel.findOne({email:email});
        console.log(findUser)
        if(findUser){
           if(findUser.password === password){
               if(!req.session.user){
                    req.session.user = findUser;
                }
                return res.redirect("/");
            }else{
                return res.render("emailLogin", {status: "Failure", message: "Incorrect email or password"});
            }
        }else{
            const findDoctor = await doctorModel.findOne({email:email});
            console.log(findDoctor)
            if(findDoctor && findDoctor.password === password){
                if(!req.session.user){
                    req.session.user = findDoctor;
                }
                return res.redirect("/");
            }else{
                return res.render("emailLogin", {status: "Failure", message: "Incorrect email or password"});
            }
        }
    }
}



module.exports=({
    emailLogin: emailLogin
})