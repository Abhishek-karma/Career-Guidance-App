import { Link } from "react-router-dom";
import { GraduationCap, Building2, BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import universityImg from "../assets/images/university.jpg";
import careerImg from "../assets/images/career.jpg";
import studentsImg from "../assets/images/students.jpg";
import educationImg from "../assets/images/educational.jpg";
import careerAssessmentImg from "../assets/images/Career Assessment.jpg";

const features = [
  { icon: GraduationCap, title: "Top Universities", description: "Access information about leading institutions.", img: universityImg },
  { icon: Building2, title: "Smart Filtering", description: "Find colleges based on fees, rankings & eligibility.", img: careerImg },
  { icon: BookOpen, title: "Career Assessment", description: "Take an aptitude test for career guidance.", img: careerAssessmentImg },
  { icon: CheckCircle, title: "Direct Applications", description: "Apply to colleges with real-time tracking.", img: universityImg }
];

const steps = [
  { title: "Create Your Account", description: "Register as a student or administrator.", num: "01" },
  { title: "Explore Opportunities", description: "Browse through universities and programs.", num: "02" },
  { title: "Assessment & Guidance", description: "Complete our test for recommendations.", num: "03" },
  { title: "Apply & Track", description: "Submit applications and monitor status.", num: "04" }
];

const Wave = ({ color = "gray-800", height = "h-12" }) => (
  <svg className={`w-full ${height} text-${color}`} viewBox="0 0 1440 320" fill="currentColor">
    <path d="M0,64L60,69.3C120,75,240,85,360,112C480,139,600,181,720,192C840,203,960,181,1080,149.3C1200,117,1320,75,1380,53.3L1440,32V320H0Z" />
  </svg>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-cover bg-center" style={{ backgroundImage: `url(${educationImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-black bg-opacity-50 p-10 rounded-lg"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">Career Guidance Platform</h1>
          <p className="mt-4 text-lg text-gray-200">Empowering students to make informed academic decisions.</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link to="/student/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition transform hover:scale-105">Student Login</Link>
            <Link to="/admin/login" className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition transform hover:scale-105">Admin Login</Link>


          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 group"
            >
              <img src={feature.img} alt={feature.title} className="rounded-md mb-4 group-hover:scale-105 transition duration-300" />
              <div className="flex items-center gap-3">
                <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-400 transition" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} // Animate only once when in viewport
          transition={{ duration: 0.5, ease: "easeInOut" }} // Added easing
          className="relative flex items-start gap-4 p-4 bg-gray-100 rounded-lg hover:bg-blue-100 transition duration-300 ease-in-out" // Added transition for hover
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full">
            {step.num}
            {index < steps.length - 1 && (
              <div className="absolute w-1 h-12 bg-blue-500 left-1/2 top-full transform -translate-x-1/2"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3> {/* Improved text contrast */}
            <p className="text-gray-600">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12 bg-gray-800 text-gray-300">
        <p>Begin your journey towards a successful career today.</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="text-blue-400 hover:text-white transition">LinkedIn</a>
          <a href="#" className="text-blue-400 hover:text-white transition">Twitter</a>
          <a href="#" className="text-blue-400 hover:text-white transition">YouTube</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
