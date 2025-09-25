import React, { useState } from 'react';
import { FaUser, FaGraduationCap, FaTools, FaHeart, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import { educationOptions, skillOptions, locationOptions, sectorOptions } from '../data/mockInternships';

const CandidateForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: [],
    interests: [],
    location: '',
    preferredType: 'Full-time'
  });

  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill) && formData.skills.length < 5) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
      setShowSkillSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest].slice(0, 3) // Max 3 interests
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.education && formData.skills.length > 0 && formData.interests.length > 0 && formData.location) {
      onSubmit(formData);
    }
  };

  const filteredSkills = skillOptions.filter(skill =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !formData.skills.includes(skill)
  );

  const isFormValid = formData.education && formData.skills.length > 0 && 
                     formData.interests.length > 0 && formData.location;

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <FaUser className="text-3xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaUser className="text-blue-500" />
            Full Name (Optional)
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Education */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaGraduationCap className="text-green-500" />
            Education <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select your education</option>
            {educationOptions.map(edu => (
              <option key={edu} value={edu}>{edu}</option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaTools className="text-purple-500" />
            Skills <span className="text-red-500">*</span> 
            <span className="text-gray-500 text-xs">({formData.skills.length}/5)</span>
          </label>
          
          {/* Selected Skills */}
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Skill Input */}
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => {
                setSkillInput(e.target.value);
                setShowSkillSuggestions(true);
              }}
              onFocus={() => setShowSkillSuggestions(true)}
              placeholder="Type to search and add skills..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={formData.skills.length >= 5}
            />
            
            {/* Skill Suggestions */}
            {showSkillSuggestions && skillInput && filteredSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                {filteredSkills.slice(0, 8).map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-150"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaHeart className="text-red-500" />
            Areas of Interest <span className="text-red-500">*</span>
            <span className="text-gray-500 text-xs">({formData.interests.length}/3)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sectorOptions.map(sector => (
              <button
                key={sector}
                type="button"
                onClick={() => toggleInterest(sector)}
                className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                  formData.interests.includes(sector)
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-red-25'
                }`}
                disabled={!formData.interests.includes(sector) && formData.interests.length >= 3}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaMapMarkerAlt className="text-orange-500" />
            Preferred Location <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select preferred location</option>
            {locationOptions.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Internship Type */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaClock className="text-indigo-500" />
            Internship Type Preference
          </label>
          <div className="flex gap-4">
            {['Full-time', 'Part-time'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredType"
                  value={type}
                  checked={formData.preferredType === type}
                  onChange={(e) => handleInputChange('preferredType', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
            isFormValid && !loading
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Finding Perfect Matches...
            </>
          ) : (
            <>
              <FaSearch />
              Find My Internships
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;