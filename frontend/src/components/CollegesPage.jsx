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

  // Fetch all colleges and student's registered colleges
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, studentRes] = await Promise.all([
          axios.get("http://localhost:5000/api/colleges"),
          axios.get("http://localhost:5000/api/students/profile", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
        ]);
        
        setColleges(collegesRes.data);
        setRegisteredColleges(studentRes.data.collegePreferences || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleRegister = async (collegeId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/register-college",
        { collegeId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      
      setRegisteredColleges(res.data.student.collegePreferences);
      setSelectedCollege(null); // Close details view after registration
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Registered Colleges</h2>
      <RegisteredColleges colleges={registeredColleges} />

      <h2 className="text-2xl font-bold my-6">All Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map(college => (
          <CollegeCard 
            key={college._id}
            college={college}
            onViewDetails={() => setSelectedCollege(college)}
            isRegistered={registeredColleges.some(rc => rc._id === college._id)}
          />
        ))}
      </div>

      {selectedCollege && (
        <CollegeDetails 
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
          onRegister={handleRegister}
          isRegistered={registeredColleges.some(rc => rc._id === selectedCollege._id)}
        />
      )}
    </div>
  );
};

export default CollegesPage;