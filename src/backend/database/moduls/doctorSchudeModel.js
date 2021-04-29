const mongooes = require("mongoose");
const connectDB = require("../mongoose");

const scheduleSchema = new mongooes.Schema({
    userId: {
        type: mongooes.Schema.Types.ObjectId,
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