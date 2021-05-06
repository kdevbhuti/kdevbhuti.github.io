const getData = require("./dataProvider")

const records = async(req, res) =>{
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        var allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
    }else{
        var allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
    }
    res.render("medicalRecords", {user :allUserDetails, status: req.flash('status')});
}


module.exports = {
    records
}