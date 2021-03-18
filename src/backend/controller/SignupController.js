
const userModule = require('../database/moduls/userModul');
const patientModel = require("../database/moduls/patientModel");
const getData = require("./dataProvider");


async function signup(req, res){
    const {name, email, password, gender, date, phoneNumber, city, state, country} = req.body;
    var isDoctor = false;
    if(req.body.isDoctor){
        isDoctor = true;
    }

    if(name && email && password && gender && date && phoneNumber && city && state && country){
        const user = new userModule({
            name: name,
            email: email,
            password: password,
            gender: gender,
            date: date,
            phoneNumber: phoneNumber,
            city: city,
            state: state,
            country: country,
            isDoctor: isDoctor
        });

        try{
            const userData = await user.save();
            if(userData){
                if(!req.session.user){
                    req.session.user = await getData.getSession(userData);
                }
                if(userData.isDoctor) {
                    res.redirect("/wellcome") 
                }else{
                    const patient = new patientModel({
                        email: userData.email,
                        patient: userData.id,
                    })
                    await patient.save();
                    res.redirect("/");
                } 
            }
        }catch(err){
            res.render("signup",{status: "Failure", message: "Email or mobile number allready registered"});
        }
        
    }else{
        res.render("signup")
    }
    
}

module.exports = {
    signup: signup,
}