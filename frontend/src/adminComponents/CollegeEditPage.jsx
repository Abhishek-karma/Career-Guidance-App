import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CollegeEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const token = localStorage.getItem('adminToken');

  // State to hold the fetched college details (from router state or API)
  const [collegeDetails, setCollegeDetails] = useState(state?.college || null);
  // Local form state (initialized after collegeDetails is available)
  const [college, setCollege] = useState(null);

  // If collegeDetails not provided via state, fetch from API
  useEffect(() => {
    if (!collegeDetails) {
      axios
        .get(`http://localhost:5000/api/admin/colleges/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCollegeDetails(response.data);
        })
        .catch((error) => {
          toast.error('Error fetching college details');
          navigate('/admin/colleges');
        });
    }
  }, [collegeDetails, id, token, navigate]);

  // Once collegeDetails is available, initialize the local form state
  useEffect(() => {
    if (collegeDetails) {
      setCollege({
        name: collegeDetails.name || '',
        location: collegeDetails.location || 'India',
        tuitionFee: collegeDetails.tuitionFee || '',
        housingFee: collegeDetails.housingFee || '',
        eligibilityCriteria: {
          cgpa: collegeDetails.eligibilityCriteria?.cgpa || '',
          entranceExamScore: collegeDetails.eligibilityCriteria?.entranceExamScore || '',
        },
        courses:
          collegeDetails.courses && collegeDetails.courses.length > 0
            ? collegeDetails.courses
            : [{ name: '', duration: '', fee: '' }],
        scholarshipSchemes: collegeDetails.scholarshipSchemes
          ? collegeDetails.scholarshipSchemes.join(', ')
          : '',
        campusFacilities: collegeDetails.campusFacilities
          ? collegeDetails.campusFacilities.join(', ')
          : '',
        placementOptions: collegeDetails.placementOptions
          ? collegeDetails.placementOptions.join(', ')
          : '',
      });
    }
  }, [collegeDetails]);

  // If local state not ready, show a loading message
  if (!college) return <p>Loading...</p>;

  // Handlers for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cgpa' || name === 'entranceExamScore') {
      setCollege((prev) => ({
        ...prev,
        eligibilityCriteria: {
          ...prev.eligibilityCriteria,
          [name]: value,
        },
      }));
    } else {
      setCollege((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...college.courses];
    updatedCourses[index][name] = value;
    setCollege((prev) => ({ ...prev, courses: updatedCourses }));
  };

  const addCourseField = () => {
    setCollege((prev) => ({
      ...prev,
      courses: [...prev.courses, { name: '', duration: '', fee: '' }],
    }));
  };

  // Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Prepare payload: convert comma-separated fields into arrays and numbers as needed
    const updatedPayload = {
      name: college.name,
      location: college.location,
      tuitionFee: Number(college.tuitionFee),
      housingFee: Number(college.housingFee),
      eligibilityCriteria: {
        cgpa: Number(college.eligibilityCriteria.cgpa),
        entranceExamScore: Number(college.eligibilityCriteria.entranceExamScore),
      },
      courses: college.courses.map((course) => ({
        name: course.name,
        duration: course.duration,
        fee: Number(course.fee),
      })),
      scholarshipSchemes: college.scholarshipSchemes
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item),
      campusFacilities: college.campusFacilities
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item),
      placementOptions: college.placementOptions
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item),
    };

    try {
      await axios.put(`http://localhost:5000/api/admin/colleges/${collegeDetails._id}`, updatedPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('College updated successfully');
      navigate('/admin/colleges');
    } catch (error) {
      toast.error('Error updating college');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Edit College</h1>
      <form onSubmit={handleUpdate} className="max-w-3xl mx-auto bg-gray-100 p-6 rounded shadow">
        {/* Basic Information */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">College Name</label>
          <input
            type="text"
            name="name"
            value={college.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <select
              name="location"
              value={college.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="India">India</option>
              <option value="Abroad">Abroad</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Tuition Fee</label>
            <input
              type="number"
              name="tuitionFee"
              value={college.tuitionFee}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Housing Fee</label>
            <input
              type="number"
              name="housingFee"
              value={college.housingFee}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        {/* Eligibility Criteria */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Minimum CGPA</label>
              <input
                type="number"
                step="0.1"
                name="cgpa"
                value={college.eligibilityCriteria.cgpa}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Entrance Exam Score</label>
              <input
                type="number"
                name="entranceExamScore"
                value={college.eligibilityCriteria.entranceExamScore}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>
        {/* Courses Offered */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Courses Offered</h2>
          {college.courses.map((course, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <label className="block mb-1 font-medium">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={course.duration}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Fee</label>
                <input
                  type="number"
                  name="fee"
                  value={course.fee}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCourseField}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Add Another Course
          </button>
        </div>
        {/* Scholarship Schemes */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Scholarship Schemes (comma separated)</label>
          <input
            type="text"
            name="scholarshipSchemes"
            value={college.scholarshipSchemes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Campus Facilities */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Campus Facilities (comma separated)</label>
          <input
            type="text"
            name="campusFacilities"
            value={college.campusFacilities}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Placement Options */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Placement Options (comma separated)</label>
          <input
            type="text"
            name="placementOptions"
            value={college.placementOptions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default CollegeEditPage;
