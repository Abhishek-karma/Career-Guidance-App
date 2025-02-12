import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CollegeCard from './CollegeCard'; // Adjust the import path as needed
import 'react-toastify/dist/ReactToastify.css';

const AdminCollegesPage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const fetchColleges = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/colleges', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setColleges(data);
    } catch (err) {
      toast.error('Error fetching colleges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [token]);

  const handleDeleteCollege = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/colleges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('College deleted successfully');
      fetchColleges();
    } catch (err) {
      toast.error('Error deleting college');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 mb-10">Admin Colleges</h1>
      <button
        onClick={() => navigate('/admin/colleges/add')}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add College
      </button>
      {loading ? (
        <p>Loading colleges...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div key={college._id} className="relative group">
              <CollegeCard college={college} />
              {/* Overlay appears at the bottom on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <button
                  onClick={() => navigate(`/admin/colleges/edit/${college._id}`, { state: { college } })}
                  className="w-28 px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCollege(college._id)}
                  className="w-28 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCollegesPage;
