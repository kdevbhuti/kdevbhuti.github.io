const mongoose = require("mongoose");


function connectDB(){
    mongoose.connect('mongodb://localhost:27017/Tvastra', { useNewUrlParser:true, useUnifiedTopology: true }).then(()=>{
        console.log("Database Connected");
    }).catch((error)=>{
        console.log("Database not connected");
    });
}

module.exports = connectDB;

