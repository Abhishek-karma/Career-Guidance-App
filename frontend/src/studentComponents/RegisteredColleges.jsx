// RegisteredColleges.jsx
const RegisteredColleges = ({ colleges }) => {
    if (colleges.length === 0) return null;
  
    return (
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colleges.map(college => (
            <div key={college._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{college.name}</h3>
              <p className="text-gray-600">{college.location}</p>
              <p className="text-sm text-blue-500">Registered</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default RegisteredColleges;