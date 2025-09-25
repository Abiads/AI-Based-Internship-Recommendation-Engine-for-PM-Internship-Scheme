// Mock internship data for PM Internship Scheme
export const mockInternships = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "Tech Solutions Pvt Ltd",
    location: "Mumbai, Maharashtra",
    sector: "Technology",
    duration: "6 months",
    stipend: "₹15,000/month",
    skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
    education: ["B.Tech", "BCA", "B.Sc Computer Science"],
    description: "Develop web applications using modern JavaScript frameworks",
    requirements: ["Basic programming knowledge", "Problem-solving skills"],
    type: "Full-time"
  },
  {
    id: 2,
    title: "Digital Marketing Intern",
    company: "MarketPro Agency",
    location: "Delhi, Delhi",
    sector: "Marketing",
    duration: "4 months",
    stipend: "₹12,000/month",
    skills: ["Social Media", "Content Writing", "SEO", "Analytics"],
    education: ["MBA", "B.Com", "BBA", "Any Graduate"],
    description: "Assist in digital marketing campaigns and social media management",
    requirements: ["Creative thinking", "Communication skills"],
    type: "Full-time"
  },
  {
    id: 3,
    title: "Data Analytics Intern",
    company: "DataInsights Corp",
    location: "Bangalore, Karnataka",
    sector: "Analytics",
    duration: "6 months",
    stipend: "₹18,000/month",
    skills: ["Python", "SQL", "Excel", "Statistics", "Data Visualization"],
    education: ["B.Tech", "B.Sc Statistics", "B.Sc Mathematics", "MCA"],
    description: "Analyze business data and create insights for decision making",
    requirements: ["Analytical mindset", "Attention to detail"],
    type: "Full-time"
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "Creative Studios",
    location: "Pune, Maharashtra",
    sector: "Design",
    duration: "5 months",
    stipend: "₹14,000/month",
    skills: ["Figma", "Adobe XD", "Photoshop", "User Research", "Prototyping"],
    education: ["B.Des", "BFA", "B.Tech", "Any Graduate"],
    description: "Design user interfaces and improve user experience",
    requirements: ["Creative skills", "Design thinking"],
    type: "Full-time"
  },
  {
    id: 5,
    title: "Content Writing Intern",
    company: "WordCraft Media",
    location: "Hyderabad, Telangana",
    sector: "Media",
    duration: "4 months",
    stipend: "₹10,000/month",
    skills: ["Writing", "Research", "SEO Writing", "Content Strategy"],
    education: ["BA English", "Journalism", "Mass Communication", "Any Graduate"],
    description: "Create engaging content for various digital platforms",
    requirements: ["Excellent writing skills", "Research abilities"],
    type: "Part-time"
  },
  {
    id: 6,
    title: "Finance Intern",
    company: "FinServ Solutions",
    location: "Chennai, Tamil Nadu",
    sector: "Finance",
    duration: "6 months",
    stipend: "₹16,000/month",
    skills: ["Excel", "Financial Analysis", "Accounting", "Taxation"],
    education: ["B.Com", "BBA Finance", "CA", "CMA"],
    description: "Assist in financial analysis and reporting",
    requirements: ["Numerical skills", "Attention to detail"],
    type: "Full-time"
  },
  {
    id: 7,
    title: "HR Intern",
    company: "PeopleFirst HR",
    location: "Kolkata, West Bengal",
    sector: "Human Resources",
    duration: "5 months",
    stipend: "₹11,000/month",
    skills: ["Communication", "Recruitment", "Employee Relations", "HR Policies"],
    education: ["MBA HR", "BBA", "B.A Psychology", "Any Graduate"],
    description: "Support HR operations and recruitment processes",
    requirements: ["Interpersonal skills", "Organizational abilities"],
    type: "Full-time"
  },
  {
    id: 8,
    title: "Mobile App Development Intern",
    company: "AppMakers Inc",
    location: "Noida, Uttar Pradesh",
    sector: "Technology",
    duration: "6 months",
    stipend: "₹17,000/month",
    skills: ["Flutter", "React Native", "Java", "Kotlin", "Swift"],
    education: ["B.Tech", "MCA", "B.Sc IT"],
    description: "Develop mobile applications for Android and iOS",
    requirements: ["Mobile development interest", "Problem-solving"],
    type: "Full-time"
  },
  {
    id: 9,
    title: "Business Development Intern",
    company: "GrowthMax Consulting",
    location: "Ahmedabad, Gujarat",
    sector: "Business Development",
    duration: "4 months",
    stipend: "₹13,000/month",
    skills: ["Sales", "Market Research", "Client Relations", "Presentation"],
    education: ["MBA", "BBA", "B.Com", "Any Graduate"],
    description: "Identify business opportunities and support client acquisition",
    requirements: ["Communication skills", "Business acumen"],
    type: "Full-time"
  },
  {
    id: 10,
    title: "Graphic Design Intern",
    company: "Visual Arts Studio",
    location: "Jaipur, Rajasthan",
    sector: "Design",
    duration: "5 months",
    stipend: "₹12,500/month",
    skills: ["Photoshop", "Illustrator", "InDesign", "Branding", "Typography"],
    education: ["B.Des", "BFA", "Diploma in Design", "Any Graduate"],
    description: "Create visual designs for marketing materials and branding",
    requirements: ["Creative skills", "Visual design sense"],
    type: "Part-time"
  }
];

// Education options for the form
export const educationOptions = [
  "B.Tech", "BCA", "B.Sc Computer Science", "MCA", "B.Sc IT",
  "MBA", "B.Com", "BBA", "B.Des", "BFA", "BA English",
  "Journalism", "Mass Communication", "B.Sc Statistics",
  "B.Sc Mathematics", "CA", "CMA", "B.A Psychology",
  "Diploma in Design", "Any Graduate", "12th Pass"
];

// Skill options for the form
export const skillOptions = [
  "JavaScript", "React", "Node.js", "HTML", "CSS", "Python", "Java",
  "SQL", "Excel", "Data Analysis", "Social Media", "Content Writing",
  "SEO", "Figma", "Adobe XD", "Photoshop", "Writing", "Communication",
  "Sales", "Marketing", "Finance", "Accounting", "HR", "Design",
  "Flutter", "React Native", "Kotlin", "Swift", "Analytics"
];

// Location options for the form
export const locationOptions = [
  "Mumbai, Maharashtra", "Delhi, Delhi", "Bangalore, Karnataka",
  "Pune, Maharashtra", "Hyderabad, Telangana", "Chennai, Tamil Nadu",
  "Kolkata, West Bengal", "Noida, Uttar Pradesh", "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh", "Bhopal, Madhya Pradesh",
  "Indore, Madhya Pradesh", "Nagpur, Maharashtra", "Surat, Gujarat",
  "Coimbatore, Tamil Nadu", "Kochi, Kerala", "Chandigarh, Punjab"
];

// Interest sectors for the form
export const sectorOptions = [
  "Technology", "Marketing", "Analytics", "Design", "Media",
  "Finance", "Human Resources", "Business Development",
  "Healthcare", "Education", "Government", "Non-Profit"
];