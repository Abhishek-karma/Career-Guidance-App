const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Question = require("../models/Question");
const College = require("../models/College");

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

exports.getAdminStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments(); // Fetch total students
    const totalColleges = await College.countDocuments(); // Fetch total colleges

    const admin = await Admin.findById(req.user.id).select("username");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      adminName: admin.username,
      totalStudents,
      totalColleges,
      message: "Admin stats fetched successfully"
    });
 
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};



exports.createQuestions = async (req, res) => {
  try {
    const { questions } = req.body;

    // Validate input
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions must be a non-empty array" });
    }

    // Validate each question
    for (const question of questions) {
      if (
        !question.section ||
        !question.questionText ||
        !question.options ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        question.correctAnswerIndex === undefined
      ) {
        return res.status(400).json({ message: "Invalid question format" });
      }
    }

    // Insert questions into the database
    const createdQuestions = await Question.insertMany(questions);

    res.status(201).json({
      message: "Questions created successfully",
      questions: createdQuestions,
    });
  } catch (error) {
    console.error("Error creating questions:", error);
    res.status(500).json({ message: "Failed to create questions", error: error.message });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions", error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Failed to delete question", error: error.message });
  }
};
