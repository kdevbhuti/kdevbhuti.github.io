const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const doctorSchema = new mongoose.Schema({ 
    name:{
        type: String,
    }, 
    email: {
     type: String,
     unique: true
    },
    password:{
        type: String
    },
    gender:{
        type: String
    },
    date:{
        type: Date
    },
    phoneNumber:{
        type: Number,
        unique: true
    },
    city: {
        type: String
    },
    state:{
        type: String
    },
    country:{
        type: String
    },
    userType: {
        type: String
    },
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
    fees:{
        type: Number
    }
});

var doctorModel = connectDB.model('Doctor', doctorSchema);

module.exports = doctorModel;