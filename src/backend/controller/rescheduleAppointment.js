const BookedScheduleModel = require("../database/moduls/bookSchedules");
const DoctorModel = require("../database/moduls/doctorModule")
const DoctorSchedule =  require("../database/moduls/doctorSchudeModel");
const getData = require("./dataProvider");

const reschedule = async (req, res)=>{
    const {scheduleId, appointmentId} = req.query;
    if(scheduleId&&appointmentId){
        const appointment = await BookedScheduleModel.findOne({_id: appointmentId});
        const isDoctor = await getData.isDoctor(req.session.user.id);
        if(isDoctor){
            var alluserDetails = await getData.getAllDoctorDetails(req.session.user.id);
        }else{
            var alluserDetails = await getData.getAllPatientDetails(req.session.user.id);
        }
        // res.send(appointment)

        const getDoctorDetailsWithSchedule = await DoctorModel.findOne({ doctor : appointment.doctorId})
        .populate({
            path: "doctor",
            model: 'User'
        })
        .populate({
            path: "schedule",
            model: "Schedule"
        })
        let scheduleHospital = await DoctorSchedule.findOne({"schedules._id": scheduleId}).select("hospitalName");
        res.render("rescheduleAppointment", {user: alluserDetails, schedule: getDoctorDetailsWithSchedule, appointment: appointment, scheduleHospital: scheduleHospital});
    }
}

const rescheduling = async (req, res)=>{
    const { scheduleId, appointmentId } = req.query;

    if(scheduleId && appointmentId){
        // update the isBook fild to true of new selected schedule
        const newSchedule = await DoctorSchedule.findOneAndUpdate(
            {"schedules._id": scheduleId}, 
            {$set: {'schedules.$.isBooked': true}},
            {new: true}
        );
        
        let prviousAppoinmentSheduleId = await BookedScheduleModel.findOne({_id: appointmentId}).select("scheduleId");
        
        // update isBook fild of schedule to false of previous selected schedule
        const PreviousSchedule = await DoctorSchedule.findOneAndUpdate(
            {"schedules._id": prviousAppoinmentSheduleId.scheduleId}, 
            {$set: {'schedules.$.isBooked': false}},
            {new: true}
        );

        const scheduleTiming = newSchedule.schedules.find(schedule => schedule._id == scheduleId);
        
        //update the Appointment
        const appointment = await BookedScheduleModel.findOneAndUpdate({_id: appointmentId}, {$set: {'scheduleId': scheduleId, "time": scheduleTiming.time, "date": newSchedule.date}}, {new: true});
        if(appointment && PreviousSchedule && prviousAppoinmentSheduleId && newSchedule){
            req.flash ('status', ['Success', "Schedule successfully updated."]);
            res.redirect("/allAppointments");
        }
    }    

}

module.exports = {
    reschedule,
    rescheduling
}