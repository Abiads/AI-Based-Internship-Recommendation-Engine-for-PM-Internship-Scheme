import React, { useState } from 'react';
import { FaUser, FaGraduationCap, FaTools, FaHeart, FaMapMarkerAlt, FaClock, FaSearch, FaUpload, FaFileAlt, FaTimes, FaMagic } from 'react-icons/fa';
import { educationOptions, skillOptions, locationOptions, sectorOptions } from '../data/mockInternships';
import parseResume from '../helpers/parseResume';
import { sendToAI } from '../helpers/sendToAI';

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
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeProcessing, setResumeProcessing] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleResumeUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }

    setResumeFile(file);
    setResumeProcessing(true);
    
    try {
      // Parse resume
      const resumeText = await parseResume(file);
      
      // Send to AI for analysis
      const aiResult = await sendToAI(resumeText);
      setResumeAnalysis(aiResult);
      
    } catch (error) {
      console.error('Resume processing error:', error);
      alert('Failed to process resume. Please try again or fill the form manually.');
    } finally {
      setResumeProcessing(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResumeUpload(e.dataTransfer.files[0]);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeAnalysis(null);
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
        {/* Resume Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaMagic className="text-yellow-500" />
              Smart Resume Analysis (Optional)
            </label>
            {resumeFile && (
              <button
                type="button"
                onClick={removeResume}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          {!resumeFile ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => e.target.files[0] && handleResumeUpload(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={resumeProcessing}
              />
              <div className="flex flex-col items-center space-y-2">
                <FaUpload className="text-3xl text-gray-400" />
                <p className="text-gray-600 font-medium">
                  Upload your resume for smart form filling
                </p>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to select (PDF or DOCX)
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-green-600 text-xl" />
                <div className="flex-1">
                  <p className="font-medium text-green-800">{resumeFile.name}</p>
                  <p className="text-sm text-green-600">
                    {resumeProcessing ? 'Processing resume...' : 'Resume processed successfully!'}
                  </p>
                </div>
                {resumeProcessing && (
                  <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                )}
              </div>
              
              {resumeAnalysis && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <FaMagic className="text-yellow-500" />
                    AI Resume Analysis
                  </h4>
                  <div className="text-sm text-gray-700 prose prose-sm">
                    <div dangerouslySetInnerHTML={{ __html: resumeAnalysis.raw.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
          className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform ${
            isFormValid && !loading
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <div className="relative">
                <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full"></div>
                <div className="absolute inset-0 animate-ping h-6 w-6 border-2 border-white/30 rounded-full"></div>
              </div>
              <span className="animate-pulse">Finding Perfect Matches...</span>
            </>
          ) : (
            <>
              <FaSearch className="text-lg group-hover:animate-bounce" />
              <span>Find My Dream Internships</span>
              <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                AI Powered
              </div>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;