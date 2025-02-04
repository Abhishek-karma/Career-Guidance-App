const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const College = require("../models/College");
const { getEligibleColleges } = require("../services/collegeService");
const AptitudeTest = require('../models/AptitudeTest');


exports.register = async (req, res) => {
  const { name, email, password, academicRecords, locationPreference } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (student) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    student = new Student({
      name,
      email,
      password: hashedPassword,
      academicRecords,
      locationPreference,
    });

    await student.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, studentId: student._id, name: student.name });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update location preference
exports.updateLocationPreference = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { locationPreference: req.body.location },
      { new: true }
    ).select("-password");
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getEligibleColleges = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    const colleges = await getEligibleColleges(student);
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Register for college

exports.registerCollege = async (req, res) => {
  try {
    const { collegeId } = req.body;
    const studentId = req.student?.id;

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized. Student not found." });
    }

    if (!collegeId) {
      return res.status(400).json({ message: "College ID is required." });
    }

    const collegeExists = await College.findById(collegeId);
    if (!collegeExists) {
      return res.status(404).json({ message: "College not found." });
    }

    const student = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { collegePreferences: collegeId } }, // Ensures unique entries
      { new: true }
    ).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "College registered successfully", student });
  } catch (err) {
    console.error("Error in registerCollege:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


