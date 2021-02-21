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
    }
});

var userModel = connectDB.model('User', userSchema);

module.exports = userModel;