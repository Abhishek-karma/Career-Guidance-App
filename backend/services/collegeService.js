const College = require("../models/College");

exports.getEligibleColleges = async (student) => {
  return College.find({
    "eligibilityCriteria.cgpa": { $lte: student.academicRecords.cgpa },
    "eligibilityCriteria.entranceExamScore": { $lte: student.aptitudeTestScore },
    location: student.locationPreference === "INDIA" ? /India/i : { $not: /India/i }
  }).sort({ ranking: 1 });
};