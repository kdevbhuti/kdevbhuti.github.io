const DoctorSchedule =  require("../database/moduls/doctorSchudeModel");
const UserModel = require("../database/moduls/userModul");
const getData = require("./dataProvider");

const editeSchedule = async (req, res)=>{
    const { day, hospitalName, startTime, endTime, interval} = req.body;
    if(typeof(day) === "string"){
        var days = [day];
    }else{
        var days = day;
    }
    const isScheduleCreated = await checkSchedule(startTime, endTime, req.session.user.id, days);
    const schedules = getScheduleTime(startTime, endTime, interval);
    if(!isScheduleCreated){
        req.flash('status', ['Failure', "Time already scheduled."]);
        res.redirect("/editSchedule");
        // const doctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
        // const schedules = await getData.getDoctorSchedules(req.session.user.id);
        // res.render("edit-schedule",{user: doctorDetails, schedules: schedules, status: "Failure", message: "Time already scheduled."});
        return
    }
    var doctorSchude = [];
    for(var i=0; i<days.length;i++){
        var date = nextDayAndTime(days[i]);
        doctorSchude.push({
            weekDay: days[i],
            date: date,
            hospitalName: hospitalName,
            startTime: startTime,
            endTime: endTime,
            interval: interval,
            isActive: true,
            schedules: schedules,
            doctor: await UserModel.findOne({_id: req.session.user.id})
        })
    }
        try{
            const schedule = await DoctorSchedule.insertMany(doctorSchude);
            if(schedule){
                req.flash('status', ['Success', "Schedule successfully created."]);
                res.redirect("/editSchedule");
                // const doctorDetails = await getData.getAllDoctorDetails(req.session.user.id);
                // const schedules = await getData.getDoctorSchedules(req.session.user.id);
                // res.render("edit-schedule",{user: doctorDetails, schedules: schedules, status: "Success", message: "Schedule successfully created."});
            }
        }catch(err){
            console.log(err);
        }
    
  
}

async function removeSchedule(req, res){
    try{
        const deleteSchedule =  await DoctorSchedule.deleteOne({_id: req.query.schedule_id});
        if(deleteSchedule){
            req.flash('status', ["Success", "Schedule is successfully deleted."]);
            res.redirect("/editSchedule");
        }
    }
    catch(err){
        req.flash('status', ["Success", "deleteSchedule Fail."]);
        res.redirect("/editSchedule");
    }
    
}

function getScheduleTime(startTime, endTime, interval){
    var getStartMin = convertInToMinute(startTime);// start time in minute
    var getEndMin = convertInToMinute(endTime);//end Time in minute
    var timeInterval = parseInt(interval, 10); //minutes interval
    var times = []; // time array
    
    var ap = ['AM', 'PM']; // AM-PM
   
    
    //loop to increment the time and push results in array
    for (let i=0; getStartMin <= getEndMin; i++) {
      var hh = Math.floor(getStartMin/60); // getting hours of day in 0-24 format
      var mm = (getStartMin%60); // getting minutes of the hour in 0-55 format
      times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + " " + ap[Math.floor(hh/12)] // pushing data in array in [00:00 - 12:00 AM/PM format]
      getStartMin = getStartMin + timeInterval;
    }

    var scheduleTime = []; 

    for(var i=0; i<times.length-1; i++){
        scheduleTime.push({
            time: times[i] + " - "+ times[i+1],
            isActive: true
        })
    }
    return scheduleTime;
}

function convertInToMinute(time){
    let splitTime = time.split(" ");
    let hour = parseInt(splitTime[0].split(":")[0], 10);
    let min =  parseInt(splitTime[0].split(":")[1], 10);
    if(time.split(" ")[1] === "pm"){
         var timeMin = (hour+12)*60 + min;
     }else{
         var timeMin = hour*60 + min;
     }
     return timeMin;
}


//checking schedule allredy created or not///////////////////////////
async function checkSchedule(startTime, endTime, userId, days){
    for(var j=0; j<days.length; j++){
        const schedules =  await getData.getDoctorSchedulesByDay(userId, days[j]);
        var startMin = convertInToMinute(startTime);
        var endMin = convertInToMinute(endTime);
        for(let i=0; i<schedules.length; i++){
            var dbStartTime = convertInToMinute(schedules[i].startTime);
            var dbEndTime = convertInToMinute(schedules[i].endTime);
            if (Math.min(startMin, endMin) < Math.max(dbStartTime, dbEndTime) && Math.max(startMin, endMin) > Math.min(dbStartTime, dbEndTime)) {
                return false
            }
        }
    }
    return true;
}

function nextDayAndTime(weekDay, hour= 0, minute = 0) {
    const dayArray = ["Sunday", "Monday", "Twesday", "Wednesday", "Thusday", "Friday", "Saterday"];
    var dayOfWeek = dayArray.findIndex(day => day === weekDay);
    var now = new Date()
    var result = new Date(
                   now.getFullYear(),
                   now.getMonth(),
                   now.getDate() + (7 + dayOfWeek - now.getDay()) % 7,
                   hour,
                   minute)
  
    if (result < now)
      result.setDate(result.getDate() + 7)
    
    return result
  }

module.exports = {
    editeSchedule: editeSchedule,
    removeSchedule: removeSchedule
}