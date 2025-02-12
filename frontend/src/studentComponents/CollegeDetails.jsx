// CollegeDetails.jsx
const CollegeDetails = ({ college, onClose, onRegister, isRegistered }) => {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{college.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
  
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Location:</strong> {college.location}</p>
              {/* <p><strong>Ranking:</strong> #{college.ranking}</p> */}
              <p><strong>Tuition Fee:</strong> ${college.tuitionFee}</p>
              <p><strong>Housing Fee:</strong> ${college.housingFee}</p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
              <p>Minimum CGPA: {college.eligibilityCriteria.cgpa}</p>
              <p>Entrance Exam Score: {college.eligibilityCriteria.entranceExamScore}</p>
            </div>
  
            {college.scholarshipSchemes?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Scholarship Schemes</h3>
                <ul className="list-disc pl-6">
                  {college.scholarshipSchemes.map((scheme, index) => (
                    <li key={index}>{scheme}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
  
          {!isRegistered && (
            <button
              onClick={() => onRegister(college._id)}
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default CollegeDetails;