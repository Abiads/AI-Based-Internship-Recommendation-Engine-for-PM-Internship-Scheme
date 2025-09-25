import { mockInternships } from '../data/mockInternships.js';

// Rule-based recommendation engine for internships
export const getInternshipRecommendations = (userProfile) => {
  const { education, skills, interests, location, preferredType } = userProfile;
  
  console.log('User profile received:', userProfile);
  
  // Calculate match score for each internship
  const scoredInternships = mockInternships.map(internship => {
    let score = 0;
    let reasons = [];

    // Education matching (30% weight)
    const educationMatch = internship.education.some(edu => 
      edu.toLowerCase().includes(education.toLowerCase()) || 
      education.toLowerCase().includes(edu.toLowerCase()) ||
      edu === "Any Graduate"
    );
    if (educationMatch) {
      score += 30;
      reasons.push("Education matches requirements");
    }

    // Skills matching (40% weight)
    const skillMatches = skills.filter(skill => 
      internship.skills.some(reqSkill => 
        reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    );
    const skillScore = (skillMatches.length / Math.max(skills.length, 1)) * 40;
    score += skillScore;
    if (skillMatches.length > 0) {
      reasons.push(`${skillMatches.length} matching skills: ${skillMatches.join(', ')}`);
    }

    // Interest/Sector matching (20% weight)
    const sectorMatch = interests.some(interest => 
      internship.sector.toLowerCase().includes(interest.toLowerCase()) ||
      interest.toLowerCase().includes(internship.sector.toLowerCase())
    );
    if (sectorMatch) {
      score += 20;
      reasons.push("Matches your interest areas");
    }

    // Location matching (10% weight)
    const locationMatch = internship.location.toLowerCase().includes(location.toLowerCase()) ||
                         location.toLowerCase().includes(internship.location.toLowerCase());
    if (locationMatch) {
      score += 10;
      reasons.push("Located in your preferred area");
    }

    // Type preference matching (bonus points)
    if (preferredType && internship.type === preferredType) {
      score += 5;
      reasons.push(`Matches your ${preferredType.toLowerCase()} preference`);
    }

    return {
      ...internship,
      matchScore: Math.round(score),
      matchReasons: reasons
    };
  });

  // Sort by match score and return top 5
  const recommendations = scoredInternships
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  console.log('Generated recommendations:', recommendations);
  return recommendations;
};

// AI-enhanced recommendations using Gemini API (fallback to rule-based if API fails)
export const getAIEnhancedRecommendations = async (userProfile) => {
  const apiKey = import.meta.env.VITE_GPT_API_KEY;
  
  // Always use rule-based for now, then enhance with AI if available
  const ruleBasedResults = getInternshipRecommendations(userProfile);
  console.log('Rule-based results:', ruleBasedResults);
  
  // If no API key, use rule-based recommendations
  if (!apiKey) {
    return {
      recommendations: ruleBasedResults,
      summary: "Recommendations generated using our matching algorithm",
      isAIGenerated: false
    };
  }

  try {
    const prompt = `
You are an expert career advisor for PM Internship Scheme. Based on the candidate profile below, provide 3-5 internship recommendations from the given list with match scores and reasons.

Candidate Profile:
- Education: ${userProfile.education}
- Skills: ${userProfile.skills.join(', ')}
- Interests: ${userProfile.interests.join(', ')}
- Location: ${userProfile.location}
- Type Preference: ${userProfile.preferredType || 'Any'}

Available Internships:
${mockInternships.map(internship => 
  `${internship.id}. ${internship.title} at ${internship.company} (${internship.location}) - ${internship.sector} - Requires: ${internship.skills.join(', ')}`
).join('\n')}

Provide response in this JSON format:
{
  "recommendations": [
    {
      "id": 1,
      "matchScore": 85,
      "matchReasons": ["reason1", "reason2"]
    }
  ],
  "summary": "Brief explanation of why these internships are recommended"
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      throw new Error('AI API failed');
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Try to parse AI response, fallback to rule-based if parsing fails
    try {
      const aiResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, ''));
      const enhancedRecommendations = aiResponse.recommendations.map(rec => {
        const internship = mockInternships.find(i => i.id === rec.id);
        return {
          ...internship,
          matchScore: rec.matchScore,
          matchReasons: rec.matchReasons
        };
      }).filter(Boolean);

      return {
        recommendations: enhancedRecommendations,
        summary: aiResponse.summary,
        isAIGenerated: true
      };
    } catch (parseError) {
      console.warn('Failed to parse AI response, using rule-based recommendations');
      return {
        recommendations: ruleBasedResults,
        summary: "Recommendations generated using our matching algorithm (AI parse error)",
        isAIGenerated: false
      };
    }
  } catch (error) {
    console.warn('AI recommendation failed, using rule-based fallback:', error.message);
    return {
      recommendations: ruleBasedResults,
      summary: "Recommendations generated using our matching algorithm (AI fallback)",
      isAIGenerated: false
    };
  }
};