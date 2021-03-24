const UserModel = require("../database/moduls/userModul");
const DoctorModel = require("../database/moduls/doctorModule");
const PatientModel = require("../database/moduls/patientModel");
const getData = require("./dataProvider")
const uploadImage = require("./multerStorage");


const  editProfile = async (req, res)=>{
    uploadImage(req, res, async (err) =>{
        if(err){
            console.log(err);
        }else{
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
                        res.render("editProfile", {user: doctor, status: "Success", message: "User details updated"});
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
                        res.render("editProfile", {user: patient, status: "Success", message: "User details updated"});
                    }
                }catch(err){
                    const allPatientDetails = await getData.getAllPatientDetails(req.session.user.id);
                    res.render("editProfile", {user: allPatientDetails, status: "Failure",  message: "Problem to update user details"});
                }
            }
        
        }
    })
}

module.exports = {
    editProfile: editProfile
};