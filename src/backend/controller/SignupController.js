
const UserModule = require('../database/moduls/userModul')

function signup(req, res){
    const {name, email, password, gender, date, phoneNumber, city, state, country} = req.body;
    if(name && email && password && gender && date && phoneNumber && city && state && country){
        const user = new UserModule({
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
        user.save((err, doc)=>{
            if(!doc){
                res.render("signup",{status: "Failure", message: "Email or mobile number allready registered"});
            }else{
                res.render('emailLogin', {status: "Success", message: doc.name+" sucessfully signed in"});
            }
        })
    }else{
        res.render("signup")
    }
}

module.exports = {
    signup: signup,
}