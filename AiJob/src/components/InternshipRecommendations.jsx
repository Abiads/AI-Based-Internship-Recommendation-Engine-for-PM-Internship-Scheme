import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaRupeeSign, FaStar, FaCheckCircle, FaExternalLinkAlt, FaRobot, FaCog } from 'react-icons/fa';

const InternshipCard = ({ internship, rank }) => {
  const {
    title,
    company,
    location,
    sector,
    duration,
    stipend,
    description,
    matchScore,
    matchReasons,
    skills
  } = internship;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRankBadge = (rank) => {
    const badges = {
      1: { label: 'Best Match', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' },
      2: { label: 'Great Match', color: 'bg-gradient-to-r from-blue-400 to-purple-500' },
      3: { label: 'Good Match', color: 'bg-gradient-to-r from-green-400 to-blue-500' }
    };
    return badges[rank] || { label: `Match ${rank}`, color: 'bg-gradient-to-r from-gray-400 to-gray-500' };
  };

  const rankBadge = getRankBadge(rank);

  return (
    <div className="group bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with rank and match score */}
        <div className="flex items-center justify-between mb-4">
          <div className={`px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg ${rankBadge.color} transform group-hover:scale-105 transition-transform duration-200`}>
            <FaStar className="inline mr-1" />
            #{rank} {rankBadge.label}
          </div>
          <div className={`px-4 py-2 rounded-full font-bold shadow-md transform group-hover:scale-105 transition-transform duration-200 ${getScoreColor(matchScore)}`}>
            {matchScore}% Match
          </div>
        </div>

        {/* Job Title and Company */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">{title}</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FaBuilding className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
            <span className="font-medium">{company}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1 group-hover:text-red-600 transition-colors duration-200">
              <FaMapMarkerAlt className="text-red-500" />
              {location}
            </div>
            <div className="flex items-center gap-1 group-hover:text-green-600 transition-colors duration-200">
              <FaClock className="text-green-500" />
              {duration}
            </div>
            <div className="flex items-center gap-1 group-hover:text-yellow-600 transition-colors duration-200">
              <FaRupeeSign className="text-yellow-500" />
              {stipend}
            </div>
          </div>
        </div>

        {/* Sector Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium shadow-sm group-hover:shadow-md transition-shadow duration-200">
            {sector}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>

        {/* Match Reasons */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
            <FaCheckCircle className="text-green-500" />
            Why this matches you:
          </h4>
          <ul className="space-y-1">
            {matchReasons.map((reason, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-1 font-bold">•</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Required Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map(skill => (
              <span key={skill} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-shadow duration-200">
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full text-xs font-medium">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700">
          <FaExternalLinkAlt className="group-hover:animate-bounce" />
          Apply Now
        </button>
      </div>
    </div>
  );
};

const InternshipRecommendations = ({ recommendations, summary, isAIGenerated, userProfile }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          {isAIGenerated ? (
            <FaRobot className="text-3xl text-purple-600" />
          ) : (
            <FaCog className="text-3xl text-blue-600" />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Personalized Internship Recommendations
            </h2>
            <p className="text-sm text-gray-600">
              {isAIGenerated ? 'AI-powered recommendations' : 'Smart algorithm recommendations'}
            </p>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">Your Profile:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><strong>Education:</strong> {userProfile.education}</div>
            <div><strong>Location:</strong> {userProfile.location}</div>
            <div><strong>Skills:</strong> {userProfile.skills.join(', ')}</div>
            <div><strong>Interests:</strong> {userProfile.interests.join(', ')}</div>
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Recommendation Summary:</h3>
            <p className="text-yellow-700 text-sm">{summary}</p>
          </div>
        )}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map((internship, index) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            rank={index + 1}
          />
        ))}
      </div>

      {/* Footer Tips */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Next Steps:
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">1.</span>
            Review each recommendation and match percentage carefully
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">2.</span>
            Click "Apply Now" to visit the official PM Internship Portal
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">3.</span>
            Prepare your documents: resume, certificates, and cover letter
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">4.</span>
            Apply early as internships have limited seats
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InternshipRecommendations;