import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    section: "verbal",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch all questions from the backend
  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/admin/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: name === "correctAnswerIndex" ? parseInt(value) : value,
    }));
  };

  // Handle changes for question options
  const handleOptionChange = (index, value) => {
    setNewQuestion((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  // Validate the new question before submission
  const validateQuestion = () => {
    if (!newQuestion.questionText.trim()) {
      toast.error("Question text is required");
      return false;
    }
    if (newQuestion.options.some((opt) => !opt.trim())) {
      toast.error("All options must be filled");
      return false;
    }
    if (newQuestion.correctAnswerIndex < 0 || newQuestion.correctAnswerIndex > 3) {
      toast.error("Correct answer index must be between 0-3");
      return false;
    }
    return true;
  };

  // Handle form submission to add a new question
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateQuestion()) return;

    setIsAdding(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        "http://localhost:5000/api/admin/questions",
        { questions: [newQuestion] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Question added successfully");
      setNewQuestion({
        section: "verbal",
        questionText: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      });
      await fetchQuestions(); // Refresh the list of questions
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add question");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading questions...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Manage Questions</h1>

      {/* Add Question Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <select
              name="section"
              value={newQuestion.section}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="verbal">Verbal</option>
              <option value="quantitative">Quantitative</option>
              <option value="general">General</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Question Text</label>
            <input
              type="text"
              name="questionText"
              value={newQuestion.questionText}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the question"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {newQuestion.options.map((opt, index) => (
              <input
                key={index}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Option ${index + 1}`}
                required
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correct Answer Index</label>
            <input
              type="number"
              name="correctAnswerIndex"
              value={newQuestion.correctAnswerIndex}
              onChange={handleInputChange}
              min="0"
              max="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isAdding ? "Adding..." : "Add Question"}
          </button>
        </form>
      </div>

      {/* List of Existing Questions */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Questions</h2>
        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {q.section}
                  </span>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
                <p className="font-semibold mb-2 text-gray-800">{q.questionText}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded ${
                        i === q.correctAnswerIndex
                          ? "bg-green-100 border border-green-500"
                          : "bg-white border"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminQuestionsPage;