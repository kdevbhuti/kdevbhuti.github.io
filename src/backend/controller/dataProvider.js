const UserModel = require("../database/moduls/userModul")
const DoctorModule = require("../database/moduls/doctorModule");
const PataintModel = require("../database/moduls/patientModel");
const DoctorScheduleModel = require("../database/moduls/doctorSchudeModel");
const DEFAULT_PROFILE_PICTURE = "default_profilepic.jpg";
const moment = require("moment");

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
    // const docDetailsWithSchedule = await DoctorScheduleModel.find({userId: id}).populate("doctorDetails").populate("doctor");
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
    const getDoctorDetailsWithSchedule = await DoctorModule.find({ doctor : {'$ne': id}})
    .populate({
        path: "doctor",
        model: 'User'
    })
    .populate({
        path: "schedule",
        model: "Schedule"
    })
    return getDoctorDetailsWithSchedule;
}

// const getDoctorSchedulesAccordingDate = async (id) => {
//     const docSchedule = await getDoctorSchedules(id);
//     let now = moment().format("ddd MMM Do yyyy")
//     return docSchedule
// }

const getDoctorSchedules = async(id) =>{
    const schedules = await DoctorScheduleModel.find({ userId : id });
    return schedules;
}

const getDoctorSchedulesByDay = async(id, day) =>{
    const schedules = await DoctorScheduleModel.find({ doctor : id, weekDay: day});
    return schedules;
}

module.exports = {
    getprofilePicture: getprofilePicture,
    getSession: getSession,
    getDoctorDetails: getDoctorDetails,
    getAllDoctorDetails: getAllDoctorDetails,
    isDoctor: isDoctor,
    getAllPatientDetails : getAllPatientDetails,
    getUserDetails: getUserDetails,
    getEntireDoctor: getEntireDoctor,
    getDoctorSchedules: getDoctorSchedules,
    getDoctorSchedulesByDay: getDoctorSchedulesByDay,
    // getDoctorSchedulesAccordingDate: getDoctorSchedulesAccordingDate
}