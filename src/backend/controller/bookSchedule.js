
const DoctorSchedule =  require("../database/moduls/doctorSchudeModel");
const BookedSchedule = require("../database/moduls/bookSchedules")
const getData = require("./dataProvider");

const choiceSchedule = async (req, res)=>{

    const scheduleIntervalId = req.query.scheduleId;

    if(scheduleIntervalId){
        const schedule = await DoctorSchedule.findOne({"schedules._id": scheduleIntervalId});
        if(schedule){
            
            var userDetails = await getUserDetails(req.session.user.id);
            var appointmentDoc = await getAppointDoctorDetails(schedule)
            var scheduleDetails = await getDocScheduleInterval(schedule, scheduleIntervalId)
        
            res.render("bookAppointment", {user: userDetails, doctor: appointmentDoc, scheduleDetails: scheduleDetails, appointmentConfirmed: false})
        }
    }   
}


const bookAppointment = async(req, res)=>{
    const scheduleIntervalId = req.query.scheduleId;
 
    const schedule = await DoctorSchedule.findOneAndUpdate(
        {"schedules._id": scheduleIntervalId}, 
        {$set: {'schedules.$.isBooked': true}},
        {new: true}
    );

    const scheduleTiming = schedule.schedules.find(schedule => schedule._id == scheduleIntervalId);
    
    if(scheduleTiming){
        const {patientName, doctorName, phoneNumber, allternativeNumber, patientEmail} = req.body
        const patient = new BookedSchedule({
            patientName: patientName,
            doctorName: doctorName,
            patientEmail: patientEmail,
            phoneNumber: phoneNumber,
            allternativePhoneNumber: allternativeNumber,
            time: scheduleTiming.time,
            date: schedule.date,
            patientId: req.session.user.id,
            doctorId: schedule.userId
        }) 
        const bookDetails = await patient.save();
        

        if(bookDetails && scheduleTiming){
            var userDetails = await getUserDetails(req.session.user.id);
            var scheduleDetails = await getDocScheduleInterval(schedule, scheduleIntervalId);
            var appointmentDoc = await getAppointDoctorDetails(schedule)
            res.render("bookAppointment", {user: userDetails, scheduleDetails: scheduleDetails, doctor: appointmentDoc, appointmentConfirmed: true})
        }
    }
}

async function getUserDetails(id){
    const isDoctor = await getData.isDoctor(id);
    if(isDoctor){
       
        var doctorDetails = await getData.getAllDoctorDetails(id);
        var userDetails={
                name: doctorDetails.doctor.name,
                email: doctorDetails.doctor.email,
                phoneNumber: doctorDetails.doctor.phoneNumber,
                profilePicture: doctorDetails.profilePicture
            }
    }else {
        var pataintDetails = await getData.getAllPatientDetails(id);
        var userDetails={
            name: pataintDetails.patient.name,
            email: pataintDetails.patient.email,
            phoneNumber: pataintDetails.patient.phonenumber,
            profilePicture: pataintDetails.profilePicture
        }

    }
    return userDetails;
}


async function getAppointDoctorDetails(schedule){
    const appointDoctorDetails = await getData.getAllDoctorDetails(schedule.userId);
    var appointmentDoc ={
        hospitals: appointDoctorDetails.hospitals,
        qualifications: appointDoctorDetails.qualifications,
        name: appointDoctorDetails.doctor.name,
        profilePicture: appointDoctorDetails.profilePicture
    }
    return appointmentDoc;
}


async function getDocScheduleInterval(schedule, scheduleIntervalId){
    const docScheduleInterval = schedule.schedules.find((scheduleInterval)=>{
        return scheduleInterval._id == scheduleIntervalId;
    })
    const scheduleDetails = {
        hospital: schedule.hospitalName,
        date: schedule.date,
        startTime: docScheduleInterval.time.split(" - ")[0],
        endTime: docScheduleInterval.time.split(" - ")[1],
        scheduleId: docScheduleInterval._id
    }
    return scheduleDetails
}

module.exports = {
    choiceSchedule,
    bookAppointment
}