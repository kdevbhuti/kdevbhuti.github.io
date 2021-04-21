const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const doctorSchema = new mongoose.Schema({ 
    description:{
        type: String,
    }, 
    profilePicture: {
     type: Object,
    },
    hospitals:{
        type: [String]
    },
    achievements:{
        type: [String]
    },
    experiences:{
        type: Number
    },
    qualifications:{
        type: [String],
    },
    awards: {
        type: [String]
    },
    specializations:{
        type: [String]
    },
    treatments:{
        type: [String]
    },
    fees:{
        type: Number
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
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    schedule: [{type: mongoose.Schema.Types.ObjectId, ref: "Schedule"}]
});

var doctorModel = connectDB.model('Doctor', doctorSchema);

module.exports = doctorModel;