
const DoctorSchedule =  require("../database/moduls/doctorSchudeModel");
const getData = require("./dataProvider")

const bookSchedule = async (req, res)=>{
//     const {scheduleId, scheduleIntervalId} = req.query;
//     const schedule = await DoctorSchedule.findOneAndUpdate(
//         {"schedules._id": scheduleIntervalId}, 
//         {$set: {'schedules.$.isBooked': true}},
//         {new: true}
//     );

    const scheduleIntervalId = req.query.scheduleIntervalId;

    if(scheduleIntervalId){
        const schedule = await DoctorSchedule.findOne({"schedules._id": scheduleIntervalId});
        if(schedule){
            const isDoctor = await getData.isDoctor(req.session.user.id);
            if(isDoctor){
                var userDetails = await getData.getAllDoctorDetails(req.session.user.id);
            }else {
                var userDetails = await getData.getAllPatientDetails(req.session.user.id);
            }
            const appintDoctorDetails = await getData.getAllDoctorDetails(schedule.userId);
            const docSchedulleInterval = schedule.schedules.find((scheduleInterval)=>{
                return scheduleInterval._id == scheduleIntervalId;
            })
            // docSchedulleInterval["hospital"] = "schedule.hospitalName";
            const scheduleDetails = {
                hospital: schedule.hospitalName,
                schedule: docSchedulleInterval,
                date: schedule.date
            }
            res.render("bookAppointment", {user: userDetails, doctor: appintDoctorDetails, scheduleDetails: scheduleDetails})
        }
    }
    
   
        
}

module.exports = {
    bookSchedule
}