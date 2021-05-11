const getData = require("./dataProvider");
const BookedScheduleModel = require("../database/moduls/bookSchedules");

const allAppointments = async(req, res)=>{
    try{
        const isDoctor = await getData.isDoctor(req.session.user.id);
        if(isDoctor){
            var alluserDetails = await getData.getAllDoctorDetails(req.session.user.id);
            
        }else{
            var alluserDetails = await getData.getAllPatientDetails(req.session.user.id);
        }
        const bookAppointment = await BookedScheduleModel.find({patientId: req.session.user.id}); 
        // res.send(bookAppointment);
        res.render("allAppointments", {user: alluserDetails, bookAppointment: bookAppointment, status: req.flash('status')});
    }catch(err){
        console.log(err)
    }
}

module.exports ={
    allAppointments
}