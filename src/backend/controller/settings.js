const UserModel = require("../database/moduls/userModul")
const getData = require("./dataProvider");

const settings = async(req, res)=>{
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        var allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
    }else{
        var allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
    }
    res.render("settings", {user:allUserDetails, status: req.flash('status')})
}

const changePassword = async(req, res)=>{
    const {currentPassword, newPassword} = req.body;
    try{
        const userData = await getData.getUserDetails(req.session.user.id);
        if(userData){
            if(userData.password === currentPassword){
                const getUser = await UserModel.findOneAndUpdate({_id: req.session.user.id}, {$set: {password: newPassword}}, {new: true});
                if(getUser){
                    req.flash ('status', ['Success', "Password was changed"]);
                    res.redirect("/settings");
                }else{
                    req.flash ('status', ['Failure', "Password was not changed"]);
                    res.redirect("/settings");
                }
            }else{
                req.flash ('status', ['Failure', "Current password not match."]);
                res.redirect("/settings");
            }
        }
    }catch(err){
        console.log(err);
    }
  
}

module.exports = {
    settings,
    changePassword
}