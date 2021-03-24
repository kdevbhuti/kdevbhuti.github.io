const getData = require("./dataProvider");


async function home(req, res, next){
    if(req.session.user){
        if(!req.session.login){
            req.session.login = true;
            const isDoctor = await getData.isDoctor(req.session.user.id);
            if(isDoctor){
                var allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
            }else{
                var allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
            }
            res.render("index", {status: "Success", message: "login Successfilly", user: allUserDetails});
        }else{
            next()
        }
    }else{
        res.redirect("/emailLogin")
    }
   
}

function auth(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.cookie('loginFirst', true);
        res.redirect("emailLogin");
    }
}

module.exports = {
    home: home,
    auth: auth
}