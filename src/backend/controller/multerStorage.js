
const multer = require("multer")
const path = require("path");

//////////store image for profile picture////////////////////////////////////////////
const storageProfilePic = multer.diskStorage({
    destination: path.join(__dirname, "../../client/assets/image/profile"),
    filename: (req, file, callback)=>{
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname) )
    }
})
  
const uploadProfile = multer({
  storage: storageProfilePic,
  limits: {fieldSize: 200},
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
})

///////////////////////////////For Medical reports/////////////////////////////
const storageMadicalReport = multer.diskStorage({
  destination: path.join(__dirname, "../../client/assets/image/records"),
  filename: (req, file, callback)=>{
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname) )
  }
})


const uploadMedicalReport = multer({
  storage: storageMadicalReport,
  limits: {fieldSize: 200},
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
})


module.exports = {
  uploadProfile,
  uploadMedicalReport
}