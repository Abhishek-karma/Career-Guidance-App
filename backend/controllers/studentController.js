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
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { $addToSet: { collegePreferences: collegeId } },
      { new: true }
    ).select("-password");
    
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

