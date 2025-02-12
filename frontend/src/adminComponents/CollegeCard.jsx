import React from 'react';

const CollegeCard = ({ college }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg pb-12 items-center justify-center">
      {/* College Name and Location */}
      <div className="px-6 py-4 bg-blue-500 text-white rounded-t-lg">
        <h2 className="text-2xl font-bold">{college.name}</h2>
        <p className="text-sm">{college.location}</p>
      </div>
      <div className="px-6 py-4 bg-white rounded-t-lg">
        {/* Fees Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Fees</h3>
          <p>Tuition Fee: ₹{college.tuitionFee?.toLocaleString()}</p>
          <p>Housing Fee: ₹{college.housingFee?.toLocaleString()}</p>
        </div>

        {/* Eligibility Criteria */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
          <p>CGPA: {college.eligibilityCriteria.cgpa}</p>
          <p>Entrance Exam Score: {college.eligibilityCriteria.entranceExamScore}</p>
        </div>

        {/* Courses Offered */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Courses Offered</h3>
          {college.courses.map((course, index) => (
            <div key={index} className="mb-2">
              <p className="font-medium">{course.name}</p>
              <p>Duration: {course.duration}</p>
              <p>Fee: ₹{course.fee?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Campus Facilities */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Campus Facilities</h3>
          {college.campusFacilities.length > 0 ? (
            <ul className="list-disc list-inside">
              {college.campusFacilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          ) : (
            <p>No facilities listed.</p>
          )}
        </div>

        {/* Placement Options */}
        <div>
          <h3 className="text-lg font-semibold">Placement Options</h3>
          {college.placementOptions.length > 0 ? (
            <ul className="list-disc list-inside">
              {college.placementOptions.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          ) : (
            <p>No placement options listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
