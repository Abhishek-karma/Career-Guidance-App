const College = require("../models/College");
const AptitudeTest = require("../models/AptitudeTest");

exports.getEligibleColleges = async (student) => {
  try {
    const latestTest = await AptitudeTest.findOne({ studentId: student._id })
      .sort({ createdAt: -1 }) 
      .select("totalScore");

    if (!latestTest) {
      return []; 
    }

    const studentScore = latestTest.totalScore;
    const studentLocation = student.locationPreference; 

    const colleges = await College.find({
      location: studentLocation, 
      minimumScore: { $lte: studentScore }, 
    });

    return colleges;
  } catch (error) {
    console.error("Error fetching eligible colleges:", error);
    return [];
  }
};
