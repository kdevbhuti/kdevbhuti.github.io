const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const scheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    weekDay: {
      type: String,
      require  
    },
    date:{
        type: Date
    },
    hospitalName:{
        type: String
    },
    startTime:{
        type: String
    },
    endTime:{
        type: String
    },
    interval:{
        type: Number
    },
    isActive:{
        type: Boolean
    },
    schedules: [{
            time:{
                type: String
            },
            isActive:{
                type: Boolean
            },
            isBooked: {
                type: Boolean
            }
        }],
})

const scheduleModel = connectDB.model("Schedule", scheduleSchema);
module.exports = scheduleModel;