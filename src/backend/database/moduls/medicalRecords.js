const mongoose = require("mongoose");
const connectDB = require("../mongoose");

const medicalRecordSchema = new mongoose.Schema({
    reportTitle: {
        type: String
    },
    patientName: {
        type: String
    },
    reportDate: {
        type: Date
    },
    reportType: {
        type: String
    },
    reportImage: {
        type:[Object]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

var medicalRecord = connectDB.model("MedicalRecord", medicalRecordSchema);
module.exports = medicalRecord;