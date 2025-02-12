import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/aptitude-test/start-test", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.data || response.data.length === 0) {
          alert("No questions available.");
          return;
        }

        setQuestions(response.data);

        // Load answers from sessionStorage if available
        const savedAnswers = sessionStorage.getItem("selectedAnswers");
        if (savedAnswers) {
          setSelectedAnswers(JSON.parse(savedAnswers));
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        alert("Failed to load questions. Please try again.");
      }
    };
    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (selectedIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex]._id,
      selectedIndex,
    };
    setSelectedAnswers(updatedAnswers);
    sessionStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      // Ensure user data exists in localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("Please login again");
        navigate("/student/login");
        return;
      }

      const user = JSON.parse(userData); // Parse user object safely
      if (!user?._id) {
        throw new Error("User ID not found");
      }

      // Prepare test submission data
      const requestData = {
        studentId: user._id,
        answers: selectedAnswers.filter(a => a.selectedIndex !== undefined), // Ensure answers are defined
      };

      if (requestData.answers.length === 0) {
        alert("Please answer at least one question before submitting.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/aptitude-test/submit-test",
        requestData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (!response.data) {
        throw new Error("Server returned empty response.");
      }

      navigate("/test-results", { state: response.data });
    } catch (err) {
      console.error("Error submitting test:", err.response?.data || err.message);
      alert("Failed to submit test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (questions.length === 0) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Aptitude Test</h1>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="mb-6 mt-4">
          <p className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p className="text-gray-600">{currentQuestion.questionText}</p>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left px-4 py-2 rounded-lg border ${selectedAnswers[currentQuestionIndex]?.selectedIndex === index ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitTest}
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Test"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
