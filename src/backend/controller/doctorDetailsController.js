const doctor = require("../database/moduls/doctorModule");
const userModel = require("../database/moduls/userModul")
const storeImage = require("./multerStorage");



const getDoctorDetails = async (req, res) => {
  storeImage(req, res, async (err) =>{
    const { description, hospital, achievements, experiences, qualifications, awards, specializations, avgFees } = req.body;
    if(err){
       console.log(err);
    }else{
        var doctorUser = new doctor({
        email: req.session.user.email,
        description:description,
        profilePicture: req.file,
        hospitals:hospital,
        achievements:achievements,
        experiences:experiences,
        qualifications: qualifications,
        awards: awards,
        specializations: specializations,
        fees: avgFees,
        doctor: await userModel.findOne({_id: req.session.user.id})
      });
      const doctorData =  await doctorUser.save();
      if(doctorData){
          req.session.user.profilePicture = doctorData.profilePicture ? doctorData.profilePicture.filename : "default_profilepic.jpg";
          res.redirect("/");
      }
    }
  })
}

module.exports = {
  getDoctorDetails: getDoctorDetails,
};