import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState({}); // Maps student _id to their test result (totalScore)
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingResults, setLoadingResults] = useState(true);
  const [error, setError] = useState("");

  // Fetch students from backend
  const fetchStudents = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("No token found");
      setLoadingStudents(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get-students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (err) {
      setError("Error fetching students: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingStudents(false);
    }
  }, []);

  // Fetch test results for each student using the params option
  const fetchResults = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token || students.length === 0) {
      setLoadingResults(false);
      return;
    }
    try {
      const resultsMap = {};
      for (const student of students) {
        try {
          const response = await axios.get("http://localhost:5000/api/aptitude-test/results", {
            headers: { Authorization: `Bearer ${token}` },
            params: { studentId: student._id },
          });
          resultsMap[student._id] = response.data.totalScore ?? "N/A";
        } catch (err) {
          // If an error occurs, mark this student's result as "N/A"
          resultsMap[student._id] = "N/A";
        }
      }
      setResults(resultsMap);
    } catch (err) {
      setError("Error fetching test results: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingResults(false);
    }
  }, [students]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (students.length > 0) {
      fetchResults();
    } else {
      setLoadingResults(false);
    }
  }, [students, fetchResults]);

  if (loadingStudents) return <div className="text-center py-8">Loading students...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">All Students</h1>
      {students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-lg font-semibold">
                  Name: <span className="font-normal">{student.name}</span>
                </p>
                <p className="text-lg font-semibold">
                  Email: <span className="font-normal">{student.email}</span>
                </p>
                <p className="text-lg font-semibold">
                  CGPA: <span className="font-normal">{student.academicRecords?.cgpa ?? "N/A"}</span>
                </p>
                <p className="text-lg font-semibold">
                  Location Preference: <span className="font-normal">{student.locationPreference}</span>
                </p>
              </div>
              <div className="mt-4 border-t pt-4 text-lg font-semibold">
                <p>
                  Test Total Score:{" "}<span className="font-normal">
                    {loadingResults ? "Loading..." : (results[student._id] ?? "N/A")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No students found</p>
      )}
    </div>
  );
};

export default AdminStudentsPage;
