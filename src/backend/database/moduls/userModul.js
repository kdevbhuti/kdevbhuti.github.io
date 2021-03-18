const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const userSchema = new mongoose.Schema({ 
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
        type: String
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
    isDoctor: {
        type: Boolean,
        require
    }
});

var userModel = connectDB.model('User', userSchema);


module.exports = userModel;
