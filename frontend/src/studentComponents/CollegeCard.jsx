// CollegeCard.jsx
const CollegeCard = ({ college, onViewDetails, isRegistered }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
        <p className="text-gray-600 mb-2">{college.location}</p>
        {/* <p className="text-lg font-bold mb-4">Ranking: #{college.ranking}</p> */}
        
        <div className="flex justify-between items-center">
          <button 
            onClick={onViewDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </button>
          {isRegistered && (
            <span className="text-green-500 font-medium">Already Registered</span>
          )}
        </div>
      </div>
    );
  };
  
  export default CollegeCard;