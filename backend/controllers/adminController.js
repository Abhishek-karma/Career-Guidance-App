const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Question = require("../models/Question");


// Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Registration
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createQuestions = async (req, res) => {
  try {
    if (!Array.isArray(req.body.questions) || req.body.questions.length === 0) {
      return res.status(400).json({ message: "Invalid request, questions must be a non-empty array" });
    }

    // Insert multiple questions at once using `insertMany`
    const questions = await Question.insertMany(req.body.questions);

    res.status(201).json({
      message: "Questions added successfully",
      questions
    });
  } catch (err) {
    res.status(400).json({
      message: "Validation failed",
      error: err.message
    });
  }
};
