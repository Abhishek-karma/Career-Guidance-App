// CollegesPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import CollegeCard from "../studentComponents/CollegeCard";
import CollegeDetails from "../studentComponents/CollegeDetails";
import RegisteredColleges from "../studentComponents/RegisteredColleges";

const CollegesPage = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [registeredColleges, setRegisteredColleges] = useState([]);
  const [error, setError] = useState(null);

  // Initial fetch: all colleges and student profile (which includes registered colleges)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required. Please log in.");

        // Fetch all colleges and student's profile concurrently
        const [collegesRes, studentRes] = await Promise.all([
          axios.get("http://localhost:5000/api/colleges"),
          axios.get("http://localhost:5000/api/students/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        
        setColleges(collegesRes.data);
        setRegisteredColleges(studentRes.data.collegePreferences || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  // Polling: re-fetch the student's profile (for updated registered colleges) every 5 seconds
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const pollRegisteredColleges = async () => {
      try {
        const studentRes = await axios.get("http://localhost:5000/api/students/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRegisteredColleges(studentRes.data.collegePreferences || []);
      } catch (err) {
        console.error("Error polling registered colleges:", err);
      }
    };

    const intervalId = setInterval(pollRegisteredColleges, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // (Optional) Polling for all colleges every 10 seconds (if colleges list is dynamic)
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const collegesRes = await axios.get("http://localhost:5000/api/colleges");
        setColleges(collegesRes.data);
      } catch (err) {
        console.error("Error polling all colleges:", err);
      }
    };

    const intervalId = setInterval(fetchColleges, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Optimistic registration: update the UI immediately on registration click
  const handleRegister = async (collegeId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    // Save previous registered colleges for rollback
    const previousRegisteredColleges = [...registeredColleges];

    // Optimistically update the UI:
    // If the college is not already registered, add it to the state.
    if (!registeredColleges.some((college) => college._id === collegeId)) {
      // Find the college object from selectedCollege (or from the colleges list)
      const collegeToRegister =
        selectedCollege || colleges.find((college) => college._id === collegeId);
      setRegisteredColleges([...registeredColleges, collegeToRegister]);
    }

    // Immediately close the details modal
    setSelectedCollege(null);

    try {
      // Make the API call to register the college
      const res = await axios.post(
        "http://localhost:5000/api/students/register-college",
        { collegeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // On success, update the state using the server response.
      setRegisteredColleges(res.data.student.collegePreferences);
    } catch (err) {
      console.error("Registration failed:", err);
      // Roll back the optimistic update if the API call fails
      setRegisteredColleges(previousRegisteredColleges);
      alert("Registration failed. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Registered Colleges</h2>
      <RegisteredColleges colleges={registeredColleges} />

      <h2 className="text-2xl font-bold my-6">All Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <CollegeCard
            key={college._id}
            college={college}
            onViewDetails={() => setSelectedCollege(college)}
            isRegistered={registeredColleges.some(
              (rc) => rc._id === college._id
            )}
          />
        ))}
      </div>

      {selectedCollege && (
        <CollegeDetails
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
          onRegister={handleRegister}
          isRegistered={registeredColleges.some(
            (rc) => rc._id === selectedCollege._id
          )}
        />
      )}
    </div>
  );
};

export default CollegesPage;
