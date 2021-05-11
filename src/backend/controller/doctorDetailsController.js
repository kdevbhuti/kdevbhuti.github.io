const doctor = require("../database/moduls/doctorModule");
const userModel = require("../database/moduls/userModul");
const DoctorScheduleModel = require("../database/moduls/doctorSchudeModel");

const getDoctorDetails = async (req, res) => {
    const {
      description,
      hospital,
      achievements,
      experiences,
      qualifications,
      awards,
      specializations,
      avgFees,
    } = req.body;
   
      var doctorUser = new doctor({
        description: description,
        profilePicture: req.file,
        hospitals: hospital,
        achievements: achievements,
        experiences: experiences,
        qualifications: qualifications,
        awards: awards,
        specializations: specializations,
        fees: avgFees,
        doctor: await userModel.findOne({ _id: req.session.user.id }),
        schedule: await DoctorScheduleModel.find({
          userId: req.session.user.id,
        }),
      });
      const doctorData = await doctorUser.save();
      if (doctorData) {
        res.redirect("/");
      }
};

module.exports = {
  getDoctorDetails: getDoctorDetails,
};
