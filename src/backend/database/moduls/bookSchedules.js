const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const bookScheduleSchema = new mongoose.Schema({
    patientName: {
        type: String
    },
    doctorName: {
        type: String,
    },
    patientEmail:{
        type: String
    },
    phoneNumber:{
        type: Number
    },
    allternativePhoneNumber:{
        type: Number
    },
    time:{
        type: String
    },
    date:{
        type: Date
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

var bookScheduleModel = connectDB.model('BookedSchedule', bookScheduleSchema);

module.exports = bookScheduleModel;