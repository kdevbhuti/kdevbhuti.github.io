const UserModel = require("../database/moduls/userModul");
const DoctorModel = require("../database/moduls/doctorModule");
const PatientModel = require("../database/moduls/patientModel");
const getData = require("./dataProvider")
const uploadImage = require("./multerStorage");

const  editProfile = async (req, res)=>{
    uploadImage(req, res, async (err) =>{
        if(err){
            console.log(err);
        }else{
            let userData = req.body;
           if(req.file){
               userData.profilePicture = req.file;
           }
           const isDoctor = await getData.isDoctor(req.session.user.id)
           if(isDoctor){
                try{
                    const doctor = await DoctorModel.findOneAndUpdate({email: req.session.user.email}, {$set: userData });
                    const user = await UserModel.findOneAndUpdate({_id: req.session.user.id}, {$set: userData})
                    if(user && doctor){
                        res.redirect("/editProfile");
                    }
                }catch(err){
                    console.log(err);
                }
            }else{
                const patient = await PatientModel.findOneAndUpdate({email: req.session.user.email}, {$set: userData });
                const user = await UserModel.findOneAndUpdate({_id: req.session.user.id}, {$set: userData})
                if(user && patient){
                    res.redirect("/editProfile");
                }
            }
        
        }
    })
}

module.exports = {
    editProfile: editProfile
};