const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const College = require("../models/College");
const { getEligibleColleges } = require("../services/collegeService");
const AptitudeTest = require("../models/AptitudeTest");

exports.register = async (req, res) => {
  try {
    const { name, email, password, academicRecords, locationPreference } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingStudent = await Student.findOne({ email }).lean();
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      academicRecords,
      locationPreference,
    });

    await student.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error("Error in student registration:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const student = await Student.findOne({ email }).select("+password").lean();
    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      token,
      user: {
        _id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (err) {
    console.error("Error in student login:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .populate("collegePreferences", "name location") // Select only necessary fields
      .select("-password")
      .lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.updateLocationPreference = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { locationPreference: location },
      { new: true }
    ).select("-password").lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("Error updating location preference:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getEligibleColleges = async (student) => {
  try {
    // Fetch the latest aptitude test score for the student
    const latestTest = await AptitudeTest.findOne({ studentId: student._id })
      .sort({ createdAt: -1 })
      .select("totalScore");

    if (!latestTest) {
      // No aptitude test found – you might decide to handle this case differently
      return [];
    }

    const aptitudeScore = latestTest.totalScore; // Student's latest aptitude test score

    // Check if eligibilityCriteria and entranceExamScore exist
    if (!student.eligibilityCriteria || student.eligibilityCriteria.entranceExamScore == null) {
      console.error("Student eligibility criteria or entrance exam score is missing");
      return []; // or throw an error, or return a message as needed
    }

    const studentEntranceScore = student.eligibilityCriteria.entranceExamScore;
    const studentLocation = student.locationPreference; // Student's preferred location

    // Find colleges matching the criteria:
    // - The student's aptitude score is >= the college's required aptitude test score.
    // - The student's entrance exam score is >= the college's required entrance exam score.
    // - The college is in the student's preferred location.
    const colleges = await College.find({
      location: studentLocation,
      "eligibilityCriteria.aptitudeTestScore": { $lte: aptitudeScore },
      "eligibilityCriteria.entranceExamScore": { $lte: studentEntranceScore },
    });

    return colleges;
  } catch (error) {
    console.error("Error fetching eligible colleges:", error);
    return [];
  }
};


exports.registerCollege = async (req, res) => {
  try {
    const { collegeId } = req.body;
    const studentId = req.student?.id;

    if (!studentId) return res.status(401).json({ message: "Unauthorized. Student not found." });
    if (!collegeId) return res.status(400).json({ message: "College ID is required." });

    const collegeExists = await College.findById(collegeId).lean();
    if (!collegeExists) return res.status(404).json({ message: "College not found." });

    const student = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { collegePreferences: collegeId } }, // Ensures no duplicate registrations
      { new: true }
    ).select("-password").lean();

    if (!student) return res.status(404).json({ message: "Student not found." });

    res.status(200).json({ message: "College registered successfully", student });
  } catch (err) {
    console.error("Error in registerCollege:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


exports.getRecommendedColleges = async (req, res) => {
  try {
    const studentId = req.student.id;
    if (!studentId) {
      return res.status(400).json({ message: "Student ID not provided" });
    }

    const student = await Student.findById(studentId).populate("collegePreferences");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const latestTest = await AptitudeTest.findOne({ studentId: student._id })
      .sort({ createdAt: -1 })
      .select("totalScore");

    if (!latestTest) {
      return res.status(400).json({ message: "Aptitude test score not found" });
    }

    const aptitudeScore = latestTest.totalScore;

    // Simplified comparison focusing only on entrance exam scores
    const recommendedColleges = student.collegePreferences.filter(college => {
      const collegeEntranceScore = college.eligibilityCriteria.entranceExamScore;
      
      // Validate score types
      if (typeof aptitudeScore !== 'number' || typeof collegeEntranceScore !== 'number') {
        console.log('Invalid score types detected');
        return false;
      }

      return aptitudeScore >= collegeEntranceScore;
    });

    if (recommendedColleges.length > 0) {
      return res.status(200).json({ recommendedColleges });
    } else {
      return res.status(200).json({ message: "No colleges match your score criteria." });
    }

  } catch (error) {
    console.error("Error fetching recommendations", error);
    return res.status(500).json({ message: "Error fetching recommendations", error: error.message });
  }
};



