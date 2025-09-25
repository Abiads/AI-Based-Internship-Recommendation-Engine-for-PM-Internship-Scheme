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
    skills,
    requirements
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
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header with rank and match score */}
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${rankBadge.color}`}>
          #{rank} {rankBadge.label}
        </div>
        <div className={`px-3 py-1 rounded-full font-bold ${getScoreColor(matchScore)}`}>
          <FaStar className="inline mr-1" />
          {matchScore}% Match
        </div>
      </div>

      {/* Job Title and Company */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <FaBuilding className="text-blue-500" />
          <span className="font-medium">{company}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-green-500" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <FaRupeeSign className="text-yellow-500" />
            {stipend}
          </div>
        </div>
      </div>

      {/* Sector Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
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
              <span className="text-green-500 mt-1">•</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Required Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Required Skills:</h4>
        <div className="flex flex-wrap gap-1">
          {skills.slice(0, 4).map(skill => (
            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
        <FaExternalLinkAlt />
        Apply Now
      </button>
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