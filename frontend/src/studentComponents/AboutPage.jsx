// AboutPage.jsx
import { Users, BookOpen, Target, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg  p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          About Career Guidance
        </h1>

        <div className="space-y-8">
          {/* Mission Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              At Career Guidance, our mission is to empower students and young
              professionals to make informed career decisions by providing
              personalized guidance, resources, and tools tailored to their
              aspirations and skills.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Personalized Guidance</h3>
                  <p className="text-gray-600">
                    Tailored advice based on your academic background and career
                    goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <BookOpen className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Comprehensive Resources</h3>
                  <p className="text-gray-600">
                    Access to a wide range of resources, including college
                    information, scholarships, and career paths.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Target className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Goal Setting</h3>
                  <p className="text-gray-600">
                    Tools to help you set and achieve your career and academic
                    goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Heart className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Supportive Community</h3>
                  <p className="text-gray-600">
                    Join a community of like-minded individuals and mentors to
                    support your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Our Team</h2>
            <p className="text-gray-600">
              Our team consists of experienced career counselors, educators, and
              industry professionals who are passionate about helping you succeed.
              We are dedicated to providing the best guidance and support for your
              career journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;