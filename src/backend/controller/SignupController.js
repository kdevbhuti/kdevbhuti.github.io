
const userModule = require('../database/moduls/userModul');
const doctorModel = require('../database/moduls/doctorModule')


async function signup(req, res){
    const {name, email, password, gender, date, phoneNumber, city, state, country} = req.body;

    
    if(req.body.isDoctor){
        if(name && email && password && gender && date && phoneNumber && city && state && country){
            const user = new doctorModel({
                name: name,
                email: email,
                password: password,
                gender: gender,
                date: date,
                phoneNumber: phoneNumber,
                city: city,
                state: state,
                country: country,
            });
            const userData = await user.save();
            if(userData){
                if(!req.session.user){
                    req.session.user = userData;
                }
                return res.redirect("/wellcome");
            }else{
                res.render("signup",{status: "Failure", message: "Email or mobile number allready registered"});
            }
            
        }else{
            res.render("signup")
        }
    }else{
    //    userType = "patient";
   }
    // if(name && email && password && gender && date && phoneNumber && city && state && country){
    //    const user = new userModule({
    //         name: name,
    //         email: email,
    //         password: password,
    //          gender: gender,
    //         date: date,
    //         phoneNumber: phoneNumber,
    //         city: city,
    //         state: state,
    //         country: country,
    //         userType: userType,
    //     });
    //     user.save((err, doc)=>{
    //         if(!doc){
    //             res.render("signup",{status: "Failure", message: "Email or mobile number allready registered"});
    //         }else{
    //             if(!req.session.userid){
    //                 req.session.userid = doc._id;
    //                 req.session.name = doc.name
    //            }
    //             return res.redirect("/");
    //         }
    //     })
    // }else{
    //     res.render("signup")
    // }
    
}

module.exports = {
    signup: signup,
}