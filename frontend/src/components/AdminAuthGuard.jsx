import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminAuthGuard = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken'); // Check if the admin has a valid token

  return adminToken ? children : <Navigate to="/admin/login" replace />;
};

export default AdminAuthGuard;
