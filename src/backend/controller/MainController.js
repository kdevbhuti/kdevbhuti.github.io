const scheduleModel = require("../database/moduls/doctorSchudeModel");
const getData = require("./dataProvider");

async function home(req, res){
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        var allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
    }else{
        var allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
    }
    res.render("index", {status: req.flash('status'), user: allUserDetails});
}

function signup(req, res){
    res.render("signup", {status: req.flash('status')})
}

function emailLogin(req, res){
    res.render("emailLogin", {status: req.flash('status')});
    console.log(res.local)
}

async function wellcome(req, res){
    const doctorDetails = await getData.getDoctorDetails(req.session.user.id)
    if(doctorDetails){
        res.redirect("/")
    }else{
        const userDetails = await getData.getUserDetails(req.session.user.id);
        res.render("wellcome", {status: req.flash('status'), user: userDetails});
    }
}

function logOut(req, res){
    if(req.session.user){
        req.session.destroy();
    }

    res.redirect("/emailLogin" );
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
    // var schedule = await getData.getDoctorSchedulesAccordingDate(req.session.user.id) 
    // res.send(schedule)
    if(allDoctor && allUserDetails){
        
        res.render("doctor",{user: allUserDetails, doctors: allDoctor});
    }
}

function hospital(req, res){
    res.render("hospital")
}

async function editProfile(req, res) {
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        const allDoctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
        res.render("dashboard", {user: allDoctorDetails, status: req.flash('status'), page: "editProfile"});
    }else{
        const allPatientDetails = await getData.getAllPatientDetails(req.session.user.id);
        res.render("editProfile", {user: allPatientDetails, status: req.flash('status')});
    }
}

async function editeSchedule(req, res){
    const allDoctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
    const schedules = await getData.getDoctorSchedules(req.session.user.id);
    res.render("edit-schedule", {user: allDoctorDetails, schedules: schedules, status: req.flash('status')});
}



module.exports=({
    home: home,
    signup: signup,
    emailLogin: emailLogin,
    logOut: logOut,
    doctor: doctor,
    hospital: hospital,
    wellcome: wellcome,
    editProfile:editProfile,
    editeSchedule: editeSchedule,
});