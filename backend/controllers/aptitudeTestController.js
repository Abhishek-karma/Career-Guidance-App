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

// Submit Test - Process answers and calculate score
exports.submitTest = async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const answers = req.body.answers; // Array of answers from the user

    // Validate if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch the corresponding questions based on the answers
    const questionIds = answers.map(answer => answer.questionId);
    const questions = await Question.find({ '_id': { $in: questionIds } });

    // Initialize scores
    let verbalScore = 0, quantitativeScore = 0, generalKnowledgeScore = 0;

    // Calculate scores based on the answers
    answers.forEach(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId.toString());
      if (question.correctAnswerIndex === answer.selectedIndex) {
        switch (question.section) {
          case "verbal":
            verbalScore += 1;
            break;
          case "quantitative":
            quantitativeScore += 1;
            break;
          case "general":
            generalKnowledgeScore += 1;
            break;
        }
      }
    });

    // Calculate total score
    const totalScore = verbalScore + quantitativeScore + generalKnowledgeScore;

    // Save the test results
    const aptitudeTestResult = new AptitudeTest({
      studentId: studentId,
      verbalScore,
      quantitativeScore,
      generalKnowledgeScore,
      totalScore,
      date: new Date(),
    });

    await aptitudeTestResult.save();

    // Update student's total test score
    student.aptitudeTestScore = totalScore;
    await student.save();

    res.status(201).json({
      message: 'Aptitude test submitted successfully',
      totalScore,
      verbalScore,
      quantitativeScore,
      generalKnowledgeScore,
    });
  } catch (err) {
    res.status(500).json({ message: "Error processing the test", error: err.message });
  }
};

// View Results - Get the user's test results
exports.viewResults = async (req, res) => {
  try {
    const studentId = req.body.studentId;

    // Fetch the latest test results for the student
    const results = await AptitudeTest.findOne({ studentId: studentId })
      .sort({ createdAt: -1 }) // Get the most recent test result
      .populate('studentId', 'name email'); // Populate student info
    
    if (!results) {
      return res.status(404).json({ message: 'Test results not found' });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
};
