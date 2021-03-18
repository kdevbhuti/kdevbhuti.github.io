const getData = require("./dataProvider");


function home(req, res){
    res.render("index", {status: undefined, message: "login Successfilly", user: req.session.user});
}

function signup(req, res){
    res.render("signup", {status: undefined})
}

function emailLogin(req, res){
    if(req.cookies.loginFirst){
        res.clearCookie('loginFirst');
        res.render("emailLogin", {status: "Failure", message: "Please Login first."});
    }else{
        res.render("emailLogin", {status: undefined})
    }
}

async function wellcome(req, res){
    const doctorData = await getData.getDoctorDetails(req.session.user.id);
    doctorData ? res.redirect("/") : res.render("wellcome", {user: req.session.user});
}

function logOut(req, res){
    if(req.session.user){
        req.session.destroy();
    }
    res.redirect("/emaillogin")
}

function doctor(req, res){
    res.render("doctor");
}

function hospital(req, res){
    res.render("hospital")
}

async function editProfile(req, res) {
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        const allDoctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
        res.render("editProfile", {user: allDoctorDetails});
    }else{
        const allPatientDetails = await getData.getAllPatientDetails(req.session.user.id);
        
        res.render("editProfile", {user: allPatientDetails});
    }
}

module.exports=({
    home: home,
    signup: signup,
    emailLogin: emailLogin,
    logOut: logOut,
    doctor: doctor,
    hospital: hospital,
    wellcome: wellcome,
    editProfile:editProfile
});