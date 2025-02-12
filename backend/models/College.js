const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, enum: ["India", "Abroad"], required: true }, 
  tuitionFee: { type: Number, required: true },
  housingFee: { type: Number, required: true },
  eligibilityCriteria: {
    cgpa: { type: Number, required: true },
    entranceExamScore: { type: Number, required: true},
  },
  courses: [
    {
      name: { type: String, required: true }, // Course name
      duration: { type: String, required: true }, // Example: "4 years"
      fee: { type: Number, required: true }, // Course-specific fee
    },
  ],
  scholarshipSchemes: { type: [String], default: [] }, // Ensuring array format
  campusFacilities: { type: [String], default: [] },
  placementOptions: { type: [String], default: [] },
});

module.exports = mongoose.model("College", collegeSchema);
