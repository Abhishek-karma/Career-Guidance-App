import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisteredColleges from "./RegisteredColleges";
import ProfilePage from "./ProfilePage"; // Import the ProfilePage component

const StudentHomePage = () => {
  const [profile, setProfile] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [registeredColleges, setRegisteredColleges] = useState([]);
  const [recommendedColleges, setRecommendedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required. Please log in.");

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch profile first
        const { data: profileData } = await axios.get(
          "http://localhost:5000/api/students/profile",
          { headers }
        );

        setProfile(profileData);

        // Fetch other data only if profileData._id exists
        if (profileData?._id) {
          fetchAdditionalData(profileData._id, headers);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fetchAdditionalData = async (studentId, headers) => {
    try {
      // Fetch test results
      const { data: resultsData } = await axios.get(
        "http://localhost:5000/api/aptitude-test/results",
        { headers, params: { studentId } }
      );
      setTestResults(resultsData || null);

      // Fetch recommended colleges
      const { data: recommendationsData } = await axios.get(
        "http://localhost:5000/api/students/recommendations",
        { headers, params: { studentId } }
      );
      setRecommendedColleges(recommendationsData.recommendedColleges || []);

      // Fetch registered colleges from profile again
      const { data: updatedProfile } = await axios.get(
        "http://localhost:5000/api/students/profile",
        { headers }
      );
      setRegisteredColleges(updatedProfile.collegePreferences || []);
    } catch (err) {
      console.error("Error fetching additional data:", err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <ProfilePage />

      {/* Test Results Section */}
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-lg font-bold mb-2">Test Results</h2>
        {testResults ? (
          <div className="space-y-2">
            <p><strong>Total Score:</strong> {testResults.totalScore || "N/A"}</p>
            <p><strong>Verbal Score:</strong> {testResults.verbalScore || "N/A"}</p>
            <p><strong>Quantitative Score:</strong> {testResults.quantitativeScore || "N/A"}</p>
            <p><strong>General Knowledge Score:</strong> {testResults.generalKnowledgeScore || "N/A"}</p>
          </div>
        ) : (
          <p className="text-gray-500">No test results available.</p>
        )}
      </div>

      {/* Registered Colleges Section */}
      <RegisteredColleges colleges={registeredColleges} />

      {/* Recommended Colleges Section */}
      <div className="border rounded-lg p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">Recommended for You</h2>
        {recommendedColleges.length > 0 ? (
          recommendedColleges.map((college) => (
            <div key={college._id} className="flex items-center justify-between p-2 hover:bg-gray-50">
              <span>{college.name}</span>
              <button
                onClick={() => navigate(`/colleges/${college._id}`)}
                className="text-blue-500"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentHomePage;
