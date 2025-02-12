const College = require("../models/College");

// Get all colleges (with optional filtering by location and score)
exports.getColleges = async (req, res) => {
  try {
    const { location, minScore } = req.query;
    
    let filter = {};
    if (location) filter.location = location; // Filter by "India" or "Abroad"
    if (minScore) filter.minimumScore = { $lte: minScore }; // Show colleges within score range

    const colleges = await College.find(filter);
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single college by ID
exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    res.status(200).json(college);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add College
exports.addCollege = async (req, res) => {
  try {
    const { name, location, tuitionFee, housingFee, eligibilityCriteria, } = req.body;
    
    if (!name || !location || !tuitionFee || !housingFee || !eligibilityCriteria ) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update College
exports.updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!college) return res.status(404).json({ message: "College not found" });

    res.status(200).json(college);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete College
exports.deleteCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    await college.deleteOne();
    res.status(200).json({ message: "College deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
