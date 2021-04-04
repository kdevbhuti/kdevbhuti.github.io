const mongooes = require("mongoose");
const connectDB = require("../mongoose");

const scheduleSchema = new mongooes.Schema({
    weekDay: {
      type: String,
      require  
    },
    endTime:{
        type: TimeRanges
    },
    hospitalName:{
        type: String
    },
    doctor: {type: mongooes.Schema.Types.ObjectId, ref: "User"},
    patient: {type: mongooes.Schema.Types.ObjectId, ref: "User"}
})

const scheduleModel = connectDB.model("Schedule", scheduleSchema);
module.exports = scheduleModel;