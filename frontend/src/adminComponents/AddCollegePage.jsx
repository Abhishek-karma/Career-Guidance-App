import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCollegePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  
  const [newCollege, setNewCollege] = useState({
    name: '',
    location: 'India',
    tuitionFee: '',
    housingFee: '',
    eligibilityCriteria: {
      cgpa: '',
      entranceExamScore: ''
    },
    courses: [{ name: '', duration: '', fee: '' }],
    scholarshipSchemes: '',  // Comma separated string
    campusFacilities: '',    // Comma separated string
    placementOptions: ''     // Comma separated string
  });

  // Handle changes for top-level and nested fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cgpa' || name === 'entranceExamScore') {
      setNewCollege(prev => ({
        ...prev,
        eligibilityCriteria: {
          ...prev.eligibilityCriteria,
          [name]: value
        }
      }));
    } else {
      setNewCollege(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle changes for course fields
  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const courses = [...newCollege.courses];
    courses[index][name] = value;
    setNewCollege(prev => ({ ...prev, courses }));
  };

  // Add a new course input row
  const addCourseField = () => {
    setNewCollege(prev => ({
      ...prev,
      courses: [...prev.courses, { name: '', duration: '', fee: '' }]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma separated fields into arrays and trim extra spaces
    const scholarshipSchemesArray = newCollege.scholarshipSchemes
      .split(',')
      .map(item => item.trim())
      .filter(item => item);
    const campusFacilitiesArray = newCollege.campusFacilities
      .split(',')
      .map(item => item.trim())
      .filter(item => item);
    const placementOptionsArray = newCollege.placementOptions
      .split(',')
      .map(item => item.trim())
      .filter(item => item);

    // Prepare the payload with proper number conversion
    const payload = {
      name: newCollege.name,
      location: newCollege.location,
      tuitionFee: Number(newCollege.tuitionFee),
      housingFee: Number(newCollege.housingFee),
      eligibilityCriteria: {
        cgpa: Number(newCollege.eligibilityCriteria.cgpa),
        entranceExamScore: Number(newCollege.eligibilityCriteria.entranceExamScore)
      },
      courses: newCollege.courses.map(course => ({
        name: course.name,
        duration: course.duration,
        fee: Number(course.fee)
      })),
      scholarshipSchemes: scholarshipSchemesArray,
      campusFacilities: campusFacilitiesArray,
      placementOptions: placementOptionsArray
    };

    try {
      await axios.post('http://localhost:5000/api/admin/add-colleges', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('College added successfully');
      navigate('/admin/colleges'); // Navigate back to the college listing page
    } catch (error) {
      toast.error('Error adding college');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Add College</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-100 p-6 rounded shadow">
        {/* Basic Information */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">College Name</label>
          <input
            type="text"
            name="name"
            value={newCollege.name}
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
              value={newCollege.location}
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
              value={newCollege.tuitionFee}
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
              value={newCollege.housingFee}
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
                value={newCollege.eligibilityCriteria.cgpa}
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
                value={newCollege.eligibilityCriteria.entranceExamScore}
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
          {newCollege.courses.map((course, index) => (
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
          <label className="block mb-1 font-medium">
            Scholarship Schemes (comma separated)
          </label>
          <input
            type="text"
            name="scholarshipSchemes"
            value={newCollege.scholarshipSchemes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Campus Facilities */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Campus Facilities (comma separated)
          </label>
          <input
            type="text"
            name="campusFacilities"
            value={newCollege.campusFacilities}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Placement Options */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Placement Options (comma separated)
          </label>
          <input
            type="text"
            name="placementOptions"
            value={newCollege.placementOptions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Add College
        </button>
      </form>
    </div>
  );
};

export default AddCollegePage;
