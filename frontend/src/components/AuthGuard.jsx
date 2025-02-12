import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user has a valid token

  return token ? children : <Navigate to="/student/login" replace />;
};

export default AuthGuard;
