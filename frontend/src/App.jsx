import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Tailwind CSS
import { Toaster } from 'react-hot-toast';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import HomePage from './pages/HomePage';
import StudentDashBoard from './pages/StudentDashBoard';
import AuthGuard from './components/AuthGuard';
import AdminAuthGuard from './components/AdminAuthGuard';
import ContactPage from "./studentComponents/ContactPage";
import AboutPage from "./studentComponents/AboutPage";
import TestPage from "./studentComponents/TestPage";
import ResultPage from "./studentComponents/ResultPage";
import CollegesPage from './studentComponents/CollegesPage';
import AdminDashBoard from './pages/AdminDashBoard';
import AdminStudentsPage from './adminComponents/AdminStudentsPage';
import AdminCollegesPage from './adminComponents/AdminCollegesPage';
import AddCollegePage from './adminComponents/AddCollegePage';
import CollegeEditPage from './adminComponents/CollegeEditPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test-results" element={<ResultPage />} />
        <Route path="/student/login" element={<StudentLoginPage />} />
        <Route path="/student/register" element={<StudentRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/admin/colleges" element={<AdminCollegesPage />} />
        <Route path="/admin/students" element={<AdminStudentsPage />} />
        <Route path="/admin/colleges/add" element={<AddCollegePage />} />
        <Route path="/admin/colleges/edit/:id" element={<CollegeEditPage />} />
        {/* Protect Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <AuthGuard>
              <StudentDashBoard />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminAuthGuard>
              <AdminDashBoard />
            </AdminAuthGuard>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
