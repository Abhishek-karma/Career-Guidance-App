const AptitudeTest = require("../models/AptitudeTest");
const Student = require("../models/Student");
const Question = require("../models/Question");

// Start Test - Fetch 10 random questions
exports.startTest = async (req, res) => {
  try {
    // Fetch 10 random questions
    const questions = await Question.aggregate([
      { $sample: { size: 10 } }, // Get 10 random questions
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Return the questions to the user
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
};

exports.submitTest = async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const answers = req.body.answers;

    // Validate student existence
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch questions for the given answers
    const questionIds = answers.map(answer => answer.questionId);
    const questions = await Question.find({ '_id': { $in: questionIds } });

    let correctAnswers = 0;
    answers.forEach(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId.toString());
      if (question && question.correctAnswerIndex === answer.selectedIndex) {
        correctAnswers++;
      }
    });

    // Scale score out of 100
    const totalQuestions = questions.length;
    const totalScore = Math.round((correctAnswers / totalQuestions) * 100); 

    // Save test result
    const aptitudeTestResult = new AptitudeTest({
      studentId,
      totalScore,
      date: new Date(),
    });

    await aptitudeTestResult.save();

    // Update student's aptitude score
    student.aptitudeTestScore = totalScore;
    await student.save();

    res.status(201).json({
      message: 'Aptitude test submitted successfully',
      totalScore,  // Score out of 100
    });
  } catch (err) {
    res.status(500).json({ message: "Error processing the test", error: err.message });
  }
};


exports.getResults = async (req, res) => {
  try {
    const { studentId } = req.query;

    // Validate studentId
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Fetch the latest test result for the student
    const result = await AptitudeTest.findOne({ studentId })
      .sort({ createdAt: -1 }) // Get the most recent result
      .select("totalScore verbalScore quantitativeScore generalKnowledgeScore");

    if (!result) {
      return res.status(404).json({ message: "No test results found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching test results:", err);
    res.status(500).json({ message: "Server Error" });
  }
};