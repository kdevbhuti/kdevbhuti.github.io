const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const patientSchema = new mongoose.Schema({
    email:{
        type: String,
        require
    },
    profilePicture:{
        type: Object
    },
    timezone:{
        type: String
    },
    houseArea :{
        type: String
    },
    colony_Street_Locality: {
        type: String
    },
    patient:  {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const patientModel = connectDB.model('Patient', patientSchema);
module.exports = patientModel;
