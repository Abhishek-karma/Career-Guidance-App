import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaUserGraduate, FaUniversity, FaCog } from "react-icons/fa";

const AdminHomePage = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({ totalStudents: 0, totalColleges: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken"); // Get token from localStorage

      const { data } = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdminName(data.adminName);
      setStats({ totalStudents: data.totalStudents, totalColleges: data.totalColleges });

      setError(""); // Clear previous errors
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="p-6 space-y-6">
      {/* Admin Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-700">Welcome, {adminName} 🎉</h2>
        <p className="text-gray-500">Manage student enrollments and college data efficiently.</p>
      </div>

      {/* Statistics Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Students */}
          <div className="flex items-center bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <FaUserGraduate className="text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Students</h3>
              <p className="text-3xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>

          {/* Total Colleges */}
          <div className="flex items-center bg-green-500 text-white p-6 rounded-lg shadow-md">
            <FaUniversity className="text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Colleges</h3>
              <p className="text-3xl font-bold">{stats.totalColleges}</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Instructions Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
          <FaCog className="mr-2" /> Admin Instructions
        </h3>
        <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
          <li>📌 Monitor student registrations and college enrollments.</li>
          <li>📌 Add, update, or remove college details from the database.</li>
          <li>📌 Ensure accurate student eligibility evaluations.</li>
          <li>📌 Manage aptitude test results and student performance data.</li>
          <li>📌 Use analytics to track system performance and engagement.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHomePage;
