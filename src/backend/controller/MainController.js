const getData = require("./dataProvider");

async function home(req, res){
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        var allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
    }else{
        var allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
    }
    res.render("index", {status: undefined, user: allUserDetails});
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
    const doctorDetails = await getData.getDoctorDetails(req.session.user.id)
    if(doctorDetails){
        res.redirect("/")
    }else{
        const userDetails = await getData.getUserDetails(req.session.user.id);
        res.render("wellcome", {user: userDetails});
    }
}

function logOut(req, res){
    if(req.session.user){
        req.session.destroy();
    }
    res.render("emailLogin", {status: "Success", message: "Successfully logout" });
}

async function doctor(req, res){
    let isDoctor = await getData.isDoctor(req.session.user.id);
    let allUserDetails = {};
    if(isDoctor){
        allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
    }else{
        allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
    }
    var allDoctor = await getData.getEntireDoctor(req.session.user.id); 
    if(allDoctor && allUserDetails)
        res.render("doctor",{user: allUserDetails, doctors: allDoctor});
}

function hospital(req, res){
    res.render("hospital")
}

async function editProfile(req, res) {
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        const allDoctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
        res.render("editProfile", {user: allDoctorDetails, status: undefined});
    }else{
        const allPatientDetails = await getData.getAllPatientDetails(req.session.user.id);
        res.render("editProfile", {user: allPatientDetails, status: undefined});
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