const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  housingFee: { type: Number, required: true },
  eligibilityCriteria: {
    cgpa: { type: Number, required: true },
    entranceExamScore: { type: Number, required: true },
  },
  ranking: { type: Number, required: true },
  scholarshipSchemes: [{ type: String }],
  campusFacilities: [{ type: String }],
  placementOptions: [{ type: String }],
});

module.exports = mongoose.model("College", collegeSchema);