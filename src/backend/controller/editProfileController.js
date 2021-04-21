const UserModel = require("../database/moduls/userModul");
const DoctorModel = require("../database/moduls/doctorModule");
const PatientModel = require("../database/moduls/patientModel");
const getData = require("./dataProvider");


const  editProfile = async (req, res)=>{
    let userData = req.body;
    if(req.file){
        userData.profilePicture = req.file;
    }
    const isDoctor = await getData.isDoctor(req.session.user.id)
    if(isDoctor){
        try{
            const doctor = await DoctorModel.findOneAndUpdate({doctor: req.session.user.id}, {$set: userData }, {new: true});
            const user = await UserModel.findOneAndUpdate({_id: req.session.user.id}, {$set: userData}, {new: true});
            if(user && doctor){
                if(doctor.profilePicture){
                    doctor.profilePicture = doctor.profilePicture.filename;
                }else{
                    doctor.profilePicture = "default_profilepic.jpg";
                }
                doctor.doctor = user;
                res.render("dashboard", {user: doctor, status: ["Success", "User details updated"], page: "editProfile"});
            }
        }catch(err){
            console.log(err);
        }
    }else{
        try{
            const patient = await PatientModel.findOneAndUpdate({patient: req.session.user.id}, {$set: userData }, {new: true});
            const user = await UserModel.findOneAndUpdate({_id: req.session.user.id}, {$set: userData}, {new: true})
            if(user && patient){
                if(patient.profilePicture){
                    patient.profilePicture = patient.profilePicture.filename;
                }else{
                    patient.profilePicture = "default_profilepic.jpg";
                }
                patient.patient = user;
                res.render("dashboard", {user: patient, status: ["Success", "User details updated"], page: "editProfile"});
            }
        }catch(err){
            const allPatientDetails = await getData.getAllPatientDetails(req.session.user.id);
            req.flash ('status', ['Failure', "Problem to update user details"]);
            res.redirect("/editProfile")
        }
    }
}

module.exports = {
    editProfile: editProfile
};