const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  academicRecords: {
    cgpa: { type: Number, required: true },
    sop: { type: String, required: true },
  },
  locationPreference: { type: String, enum: ["INDIA", "ABROAD"], required: true },
  collegePreferences: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }],
  aptitudeTestScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("Student", studentSchema);
