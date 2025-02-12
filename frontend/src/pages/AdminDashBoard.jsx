import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, School, Users, Clipboard, LogOut, Menu, X } from "lucide-react";
import AdminHomePage from "../adminComponents/AdminHomePage";
import AdminCollegesPage from "../adminComponents/AdminCollegesPage";
import AdminStudentsPage from "../adminComponents/AdminStudentsPage";
import AdminQuestionsPage from "../adminComponents/AdminQuestionsPage";

const AdminDashBoard = () => {
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function for admin
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Store admin token with a unique key
    navigate("/admin/login");
  };

  // When a navigation item is clicked, update the active page and close the mobile menu
  const handleNavItemClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-semibold text-blue-600">Admin Portal</h1>

          {/* Desktop Navigation Items (hidden on mobile) */}
          <div className="hidden md:flex space-x-6">
            <NavItem
              icon={<Home size={20} />}
              text="Home"
              active={activePage === "home"}
              onClick={() => handleNavItemClick("home")}
            />
            <NavItem
              icon={<School size={20} />}
              text="Colleges"
              active={activePage === "colleges"}
              onClick={() => handleNavItemClick("colleges")}
            />
            <NavItem
              icon={<Users size={20} />}
              text="Students"
              active={activePage === "students"}
              onClick={() => handleNavItemClick("students")}
            />
            <NavItem
              icon={<Clipboard size={20} />}
              text="Questions"
              active={activePage === "questions"}
              onClick={() => handleNavItemClick("questions")}
            />
          </div>
        </div>

        {/* Mobile Menu Button (visible only on mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logout Button (visible on desktop) */}
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
          <NavItem
            icon={<Home size={20} />}
            text="Home"
            active={activePage === "home"}
            onClick={() => handleNavItemClick("home")}
          />
          <NavItem
            icon={<School size={20} />}
            text="Colleges"
            active={activePage === "colleges"}
            onClick={() => handleNavItemClick("colleges")}
          />
          <NavItem
            icon={<Users size={20} />}
            text="Students"
            active={activePage === "students"}
            onClick={() => handleNavItemClick("students")}
          />
          <NavItem
            icon={<Clipboard size={20} />}
            text="Questions"
            active={activePage === "questions"}
            onClick={() => handleNavItemClick("questions")}
          />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full text-red-500 hover:bg-gray-200 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md min-h-screen">
          {activePage === "home" && <AdminHomePage />}
          {activePage === "colleges" && <AdminCollegesPage />}
          {activePage === "students" && <AdminStudentsPage />}
          {activePage === "questions" && <AdminQuestionsPage />}
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

export default AdminDashBoard;
