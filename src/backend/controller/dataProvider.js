const UserModel = require("../database/moduls/userModul")
const DoctorModule = require("../database/moduls/doctorModule");
const PataintModel = require("../database/moduls/patientModel");
const doctorModel = require("../database/moduls/doctorModule");
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
    return({
        id: user._id,
    })
}

const getUserDetails = async (id)=>{
    const user = await UserModel.findOne({_id: id});
    return user;
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

const getEntireDoctor = async (id)=>{
    let allDoctor = doctorModel.find({ doctor : { '$ne' : id}}).populate("doctor");
    return allDoctor;
}

module.exports = {
    getprofilePicture: getprofilePicture,
    getSession: getSession,
    getDoctorDetails: getDoctorDetails,
    getAllDoctorDetails: getAllDoctorDetails,
    isDoctor: isDoctor,
    getAllPatientDetails : getAllPatientDetails,
    getUserDetails: getUserDetails,
    getEntireDoctor: getEntireDoctor
}