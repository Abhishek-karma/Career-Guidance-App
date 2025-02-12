import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, School, Clipboard, Mail, User, LogOut, Menu, X } from "lucide-react";
import HomePage from "../studentComponents/StudentHomePage";
import CollegesPage from "../studentComponents/CollegesPage";
import TestPage from "../studentComponents/TestPage";
import ContactPage from "../studentComponents/ContactPage";
import AboutPage from "../studentComponents/AboutPage";

const StudentDashBoard = () => {
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/student/login"); 
  };

  // Close mobile menu when a link is clicked
  const handleNavItemClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-semibold text-blue-600">Student Portal</h1>

          {/* Desktop Navigation Items (hidden on mobile) */}
          <div className="hidden md:flex space-x-6">
            <NavItem icon={<Home size={20} />} text="Home" active={activePage === "home"} onClick={() => handleNavItemClick("home")} />
            <NavItem icon={<School size={20} />} text="Colleges" active={activePage === "colleges"} onClick={() => handleNavItemClick("colleges")} />
            <NavItem icon={<Clipboard size={20} />} text="Test" active={activePage === "test"} onClick={() => handleNavItemClick("test")} />
            <NavItem icon={<Mail size={20} />} text="Contact" active={activePage === "contact"} onClick={() => handleNavItemClick("contact")} />
            <NavItem icon={<User size={20} />} text="About" active={activePage === "about"} onClick={() => handleNavItemClick("about")} />
          </div>
        </div>

        {/* Mobile Menu Button (visible only on mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logout Button (visible on all screens) */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg text-red-500 hover:bg-gray-200 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </nav>

      {/* Mobile Menu (visible only on mobile) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <NavItem icon={<Home size={20} />} text="Home" active={activePage === "home"} onClick={() => handleNavItemClick("home")} />
          <NavItem icon={<School size={20} />} text="Colleges" active={activePage === "colleges"} onClick={() => handleNavItemClick("colleges")} />
          <NavItem icon={<Clipboard size={20} />} text="Test" active={activePage === "test"} onClick={() => handleNavItemClick("test")} />
          <NavItem icon={<Mail size={20} />} text="Contact" active={activePage === "contact"} onClick={() => handleNavItemClick("contact")} />
          <NavItem icon={<User size={20} />} text="About" active={activePage === "about"} onClick={() => handleNavItemClick("about")} />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full text-red-500 hover:bg-gray-200 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto ">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md min-h-screen">
          {activePage === "home" && <HomePage />}
          {activePage === "colleges" && <CollegesPage />}
          {activePage === "test" && <TestPage />}

          {activePage === "contact" && <ContactPage />}
          {activePage === "about" && <AboutPage />}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg w-full text-left transition-all ${
        active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default StudentDashBoard;