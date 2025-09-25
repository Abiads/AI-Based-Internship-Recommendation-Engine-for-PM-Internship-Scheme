import { useState } from 'react';
import './index.css';
import CandidateForm from './components/CandidateForm';
import InternshipRecommendations from './components/InternshipRecommendations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAIEnhancedRecommendations } from './helpers/recommendationEngine';

function App() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [summary, setSummary] = useState('');
  const [isAIGenerated, setIsAIGenerated] = useState(false);

  const handleFormSubmit = async (candidateData) => {
    try {
      setLoading(true);
      setUserProfile(candidateData);
      
      const result = await getAIEnhancedRecommendations(candidateData);
      
      if (result.recommendations && result.recommendations.length > 0) {
        setRecommendations(result.recommendations);
        setSummary(result.summary || 'Based on your profile, here are the best internship matches for you.');
        setIsAIGenerated(result.isAIGenerated || false);
        toast.success(`Found ${result.recommendations.length} perfect matches for you!`);
      } else {
        toast.error('No matching internships found. Try adjusting your preferences.');
      }
    } catch (error) {
      console.error('Recommendation error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRecommendations(null);
    setUserProfile(null);
    setSummary('');
    setIsAIGenerated(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-x-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 pointer-events-none"></div>
      
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto space-y-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
              PM Internship Recommendation Engine
            </h1>
            <p className="text-xl text-white/90 mb-2">
              Find the perfect internship opportunities tailored just for you
            </p>
            <p className="text-sm text-white/80">
              Smart India Hackathon 2025 | Ministry of Corporate Affairs
            </p>
          </div>

          {/* Main Content */}
          {!recommendations ? (
            <div className="max-w-4xl mx-auto">
              <CandidateForm onSubmit={handleFormSubmit} loading={loading} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
                >
                  ← Search Again
                </button>
              </div>
              
              {/* Recommendations */}
              <InternshipRecommendations
                recommendations={recommendations}
                summary={summary}
                isAIGenerated={isAIGenerated}
                userProfile={userProfile}
              />
            </div>
          )}

          {/* Problem Statement Section */}
          {!recommendations && (
            <section className="mt-12 p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                About This Project
              </h2>

              <div className="space-y-4 text-white/90 text-base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><strong>Problem Statement ID:</strong> 25034</p>
                  <p><strong>Organization:</strong> Ministry of Corporate Affairs</p>
                  <p><strong>Category:</strong> Software</p>
                  <p><strong>Theme:</strong> Smart Education</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mt-6 mb-2">Background</h3>
                  <p className="text-white/80">
                    The PM Internship Scheme receives applications from youth across India,
                    including rural areas, tribal districts, urban slums, and remote colleges.
                    Many candidates are first-generation learners with limited digital exposure
                    and no prior internship experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mt-6 mb-2">Our Solution</h3>
                  <ul className="list-disc list-inside mt-3 space-y-1 text-white/80">
                    <li>Deliver 3–5 personalized recommendations instead of overwhelming users with long lists</li>
                    <li>Accessible design for low digital literacy users with simplicity and clarity</li>
                    <li>Mobile-compatible and ready for regional language support</li>
                    <li>Easy integration with existing PM Internship Scheme portal</li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center w-full bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-base font-medium text-white">
            Developed by{' '}
            <a
              href="https://abhay-portfolio-eta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100 underline transition-colors duration-200"
            >
              Team SRIT
            </a>
            {' '}for Smart India Hackathon 2025
          </p>
          <p className="text-sm text-white/70 mt-1">
            <a
              href="https://www.linkedin.com/in/abhay-gupta-197b17264/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 underline transition-colors duration-200"
            >
              Connect on LinkedIn
            </a>
          </p>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Custom Styles */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
