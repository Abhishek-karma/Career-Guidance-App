const College = require("../models/College");

// Get all colleges
exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ ranking: 1 });
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single college
exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    res.status(200).json(college);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update College
exports.updateCollege = async (req, res) => {
    try {
      const college = await College.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(college);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete College
  exports.deleteCollege = async (req, res) => {
    try {
      await College.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "College deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Add College
exports.addCollege = async (req, res) => {
    try {
      const college = new College(req.body);
      await college.save();
      res.status(201).json(college);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  