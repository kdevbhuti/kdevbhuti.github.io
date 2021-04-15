const mongooes = require("mongoose");
const connectDB = require("../mongoose");

const scheduleSchema = new mongooes.Schema({
    weekDay: {
      type: String,
      require  
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
        }],
    doctor: {type: mongooes.Schema.Types.ObjectId, ref: "User"},
})

const scheduleModel = connectDB.model("Schedule", scheduleSchema);
module.exports = scheduleModel;