const MedicalRecord = require("../database/moduls/medicalRecords")
const moment = require("moment")
const getData = require("./dataProvider");
const medicalRecord = require("../database/moduls/medicalRecords");

const records = async(req, res) =>{
    const isDoctor = await getData.isDoctor(req.session.user.id);
    if(isDoctor){
        var allUserDetails = await getData.getAllDoctorDetails(req.session.user.id);
    }else{
        var allUserDetails = await getData.getAllPatientDetails(req.session.user.id);
    }
    let medicalReports = await MedicalRecord.find({userId: req.session.user.id}).select("_id reportTitle patientName reportDate reportType")
   
    // res.send(medicalReports)
    res.render("medicalRecords", {user :allUserDetails, medicalReports: medicalReports , status: req.flash('status')});
}

const storeMadicalReport = async(req, res)=>{
    console.log(req.body, req.files)
    const { title, patientName, reportDate, reportType } = req.body;
    let report = new MedicalRecord({
        reportTitle: title,
        patientName: patientName,
        reportDate: moment(reportDate),
        reportType: reportType,
        reportImage: req.files,
        userId: req.session.user.id
    })
    try{
        let saveReport = await report.save();
        if(saveReport){
            req.flash ('status', ['Success', "Medical report updated."]);
            res.redirect("/medicalRecords");
        }
    }catch(err){
        console.log(err);
    }
}


const deleteRecord = async(req, res)=>{
    const  { reportId } = req.query;
    const deleteReport = await MedicalRecord.remove({_id: reportId});
    if(deleteReport.ok === 1){
        req.flash ('status', ['Success', "Medical report successfuly deleted."]);
        res.redirect("/medicalRecords");
    }
}

module.exports = {
    records,
    storeMadicalReport,
    deleteRecord
}