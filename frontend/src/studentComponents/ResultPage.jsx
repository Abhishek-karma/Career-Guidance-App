// ResultPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(location.state || null);

  // Fetch results if not passed via state
  useEffect(() => {
    if (!results) {
      const fetchResults = async () => {
        try {
          const studentId = JSON.parse(localStorage.getItem("user"))._id;
          const response = await axios.get("http://localhost:5000/api/aptitude-test/results", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            params: { studentId },
          });
          setResults(response.data);
        } catch (err) {
          console.error("Error fetching results:", err);
        }
      };
      fetchResults();
    }
  }, [results]);

  if (!results) {
    return <div className="text-center py-8">Loading results...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Test Results</h1>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Total Score:</p>
            <p className="text-lg">{results.totalScore}/10</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Verbal Score:</p>
            <p className="text-lg">{results.verbalScore}/10</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Quantitative Score:</p>
            <p className="text-lg">{results.quantitativeScore}/10</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">General Knowledge Score:</p>
            <p className="text-lg">{results.generalKnowledgeScore}/10</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="mt-8 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultPage;