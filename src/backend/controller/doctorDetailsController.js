const doctor = require("../database/moduls/doctorModule");
// const userModel = require("../database/moduls/userModul")
const multer = require("multer")
const path = require("path")


//////////store image to local////////////////////////////////////////////
const storage = multer.diskStorage({
  destination: "./client/assets/image/profile",
  filename: (req, file, callback)=>{
      callback(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {fieldSize: 20},
  fileFilter: (req, file, callback)=>{
    const fileType = /jpeg|jpg|png|gif/;
    const extname = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
    const mineType = fileType.test(file.mimetype);

    if(extname && mineType){
      callback(null, true)
    }else{
      callback("Image only")
    }

  }
}).single("profilePicture")



const getDoctorDetails = async (req, res) => {
 
   ////////////////image upload/////////////////////////////////
  upload(req, res, async (err) =>{
    const { description, hospital, achievements, experiences, qualifications, awards, specializations, avgFees } = req.body;
    if(err){
       
    }else{
        var doctorUser = await doctor.findOneAndUpdate({_id: req.session.user._id}, { "$set":{
        description:description,
        profilePicture: req.file,
        hospitals:hospital,
        achievements:achievements,
        experiences:experiences,
        qualifications: qualifications,
        awards: awards,
        specializations: specializations,
        fees: avgFees
      }})
      if(doctorUser){
          res.redirect("/");
        
      }
    }
  })
}

module.exports = {
  getDoctorDetails: getDoctorDetails,
};