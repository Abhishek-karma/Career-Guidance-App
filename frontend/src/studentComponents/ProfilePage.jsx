import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudentProfile,
  updateLocation,
  selectStudent,
  selectLocation,
  selectStudentStatus,
  selectStudentError
} from '../store/studentSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const student = useSelector(selectStudent);
  const storedLocation = useSelector(selectLocation);
  const status = useSelector(selectStudentStatus);
  const error = useSelector(selectStudentError);

  const [selectedLocation, setSelectedLocation] = useState(storedLocation || "INDIA");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(fetchStudentProfile(token));
  }, [dispatch]);

  useEffect(() => {
    if (storedLocation) setSelectedLocation(storedLocation);
  }, [storedLocation]);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    const token = localStorage.getItem('token');
    if (token) dispatch(updateLocation({ location: newLocation, token }));
  };

  if (status === 'loading') return <div className="text-center py-6">Loading...</div>;
  if (status === 'failed') return <div className="text-center py-6 text-red-500">Error: {error}</div>;
  if (!student) return <div className="text-center py-6">No student data available.</div>;

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
      <p className="text-lg"><strong>Name:</strong> {student.name}</p>
      <p className="text-lg"><strong>Email:</strong> {student.email}</p>
      <p className="text-lg"><strong>CGPA:</strong> {student.academicRecords.cgpa}</p>
      <p className="text-lg"><strong>SOP:</strong> {student.academicRecords.sop}</p>

      {/* Location Dropdown */}
      <div className="mt-4">
        <label className="block font-medium text-gray-700">Location Preference</label>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="INDIA">INDIA</option>
          <option value="ABROAD">ABROAD</option>
        </select>
      </div>
    </div>
  );
};

export default ProfilePage;
