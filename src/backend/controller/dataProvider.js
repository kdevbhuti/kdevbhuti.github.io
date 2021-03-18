const UserModel = require("../database/moduls/userModul")
const DoctorModule = require("../database/moduls/doctorModule");
const PataintModel = require("../database/moduls/patientModel");
const DEFAULT_PROFILE_PICTURE = "default_profilepic.jpg";

const  getprofilePicture = async (user)=> {
    let profilePicture = "";
    if(user.isDoctor){
        const docDetails = await getDoctorDetails(user.id);
        profilePicture = docDetails && docDetails.profilePicture ? docDetails.profilePicture.filename : DEFAULT_PROFILE_PICTURE;
    }else{
        const patient = await getPatientDetails(user.id);
        profilePicture = patient && patient.profilePicture ? patient.profilePicture.filename : DEFAULT_PROFILE_PICTURE;
    }
    return profilePicture;
}

const getSession = async (user)=>{
    const profilePicture = await getprofilePicture(user);
    return({
        id: user._id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        profilePicture: profilePicture,
    })
}

const getDoctorDetails = async (id)=>{
    const docDetails = await DoctorModule.findOne({doctor: id});
    return docDetails;
}

const getAllDoctorDetails = async (id)=>{
    const docDetails = await DoctorModule.findOne({doctor: id}).populate("doctor");
    if(docDetails){
        docDetails.profilePicture = docDetails.profilePicture ? docDetails.profilePicture.filename : DEFAULT_PROFILE_PICTURE;
    }
    return docDetails;
}

const isDoctor = async (userID)=>{
    const user = await UserModel.findOne({_id: userID});
    return user.isDoctor;
}

const getPatientDetails = async (userID) =>{
    const patientDetails = await PataintModel.findOne({patient: userID});
    return patientDetails;
}

const getAllPatientDetails = async (patientId)=>{
    let patientDetails = await PataintModel.findOne({patient: patientId}).populate("patient")
    if(patientDetails){
        patientDetails.profilePicture = patientDetails.profilePicture ? patientDetails.profilePicture.filename : DEFAULT_PROFILE_PICTURE;
    }
    return patientDetails;
}

module.exports = {
    getprofilePicture: getprofilePicture,
    getSession: getSession,
    getDoctorDetails: getDoctorDetails,
    getAllDoctorDetails: getAllDoctorDetails,
    isDoctor: isDoctor,
    getAllPatientDetails
}