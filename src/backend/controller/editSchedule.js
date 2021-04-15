const DoctorSchedule =  require("../database/moduls/doctorSchudeModel");
const UserModel = require("../database/moduls/userModul");
const getData = require("./dataProvider");

const editeSchedule = async (req, res)=>{
    const { day, hospitalName, startTime, endTime, interval} = req.body;
    getScheduleTime(startTime, endTime, interval);
    const doctorSchude = new DoctorSchedule({
        weekDay: day,
        hospitalName: hospitalName,
        startTime: startTime,
        endTime: endTime,
        interval: interval,
        isActive: true,
        doctor: await UserModel.findOne({_id: req.session.user.id})
    })
    try{
        const schedule = await doctorSchude.save();
        if(schedule){
            const doctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
            const schedules = await getData.getDoctorSchedules(req.session.user.id);
            res.render("edit-schedule",{user: doctorDetails, schedules: schedules, status: "Success", message: "Schedule successfully created."});
        }
    }catch(err){
        console.log(err);
    }
}

async function removeSchedule(req, res){
    try{
        const deleteSchedule =  await DoctorSchedule.deleteOne({_id: req.query.schedule_id});
        if(deleteSchedule){
            req.session.user.status = "deleteSchedule";
            res.redirect("/editSchedule");
        }
    }
    catch(err){
        req.session.user.status = "deleteScheduleFail";
        res.redirect("/editSchedule");
    }
    
}

function getScheduleTime(startTime, endTime, interval){
   let sTime = startTime.split(" ");
   let eTime = endTime.split(" ");
  

   let startHour = parseInt(sTime[0].split(":")[0], 10);
   let startMin =  parseInt(sTime[0].split(":")[1], 10);
   let endHour = parseInt(eTime[0].split(":")[0], 10);
   let endMin =  parseInt(eTime[0].split(":")[1], 10);
   if(endTime.split(" ")[1] === "pm"){
        var getEndMin = (endHour+12)*60 + endMin;
    }else{
        var getEndMin = endHour*60 + endMin;
    }
    if(startTime.split(" ")[1] === "pm"){
        var getStartMin = (startHour+12)*60 + startMin;
    }else{
        var getStartMin = startHour*60 + startMin;
    }
    var x = parseInt(interval,10); //minutes interval
    var times = []; // time array
    var tt = getStartMin; // start time
    var ap = ['AM', 'PM']; // AM-PM
   
    console.log("----------------------------tt",typeof(tt))
    //loop to increment the time and push results in array
    for (var i=0;tt<getEndMin; i++) {
      var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
      var mm = (tt%60); // getting minutes of the hour in 0-55 format
      times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)] // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }
    console.log(times);
}

module.exports = {
    editeSchedule: editeSchedule,
    removeSchedule: removeSchedule
}