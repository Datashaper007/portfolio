const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');

// Real projects from Amit's resume
const projects = [
  {
    title: "MySehat.ai - Healthcare Platform",
    description: "Built a comprehensive React-based healthcare application with scalable, modular components and optimized user flows. Implemented dynamic data visualization with charts and dashboards, enabling stakeholders to make data-driven decisions. Reduced API calls by 25% through efficient state management using React hooks and Context API.",
    shortDescription: "React-based healthcare platform with data visualization",
    technologies: ["React.js", "JavaScript", "REST API", "Chart.js", "Context API", "HTML", "CSS"],
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    githubUrl: "https://github.com/amityadav",
    liveUrl: "https://mysehat.ai",
    featured: true,
    order: 1
  },
  {
    title: "Sehat Dr Labike Portal",
    description: "Developed a scalable React application for healthcare services. Optimized frontend performance, reducing page load times by 30%, boosting Core Web Vitals and retention. Integrated RESTful API endpoints ensuring secure data transmission and seamless client-server synchronization.",
    shortDescription: "High-performance healthcare service platform",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800",
    githubUrl: "https://github.com/amityadav",
    liveUrl: "https://sehat.drlabike.in",
    featured: true,
    order: 2
  },
  {
    title: "eAccuster Support Portal",
    description: "Maintained and enhanced PHP-based support portal ensuring 99.9% uptime and seamless backend integration. Debugged and resolved critical production issues, reducing system downtime by 35%. Refactored legacy codebase improving code maintainability by 40%.",
    shortDescription: "Enterprise support portal with high availability",
    technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "jQuery"],
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    githubUrl: "https://github.com/amityadav",
    liveUrl: "https://accustersupport.com",
    featured: true,
    order: 3
  },
  {
    title: "Internal Web Portals (3 Projects)",
    description: "Designed and developed frontend for 3 responsive internal web portals focusing on clean layouts, reusable components, and improved staff efficiency. Enhanced workflows resulting in 20% improvement in user interaction efficiency and reduced error rates.",
    shortDescription: "Responsive internal portals for enhanced productivity",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap"],
    category: "frontend",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    githubUrl: "https://github.com/amityadav",
    featured: false,
    order: 4
  },
  {
    title: "WordPress Website Enhancements",
    description: "Worked on 4 WordPress websites, customizing themes, optimizing UI elements, and improving user experience. Implemented intuitive navigation, responsive design, and enhanced functionality to boost user engagement.",
    shortDescription: "Custom WordPress solutions for better engagement",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    category: "frontend",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    githubUrl: "https://github.com/amityadav",
    featured: false,
    order: 5
  },
  {
    title: "Custom Websites from Scratch",
    description: "Full web development from inception to deployment. Generated 3 fresh websites using HTML, CSS, JavaScript, and design tools like Figma and Canva. Delivered clean, user-centric interfaces tailored to client needs with full device compatibility.",
    shortDescription: "Custom-built websites with modern design",
    technologies: ["HTML", "CSS", "JavaScript", "Figma", "Canva"],
    category: "frontend",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    githubUrl: "https://github.com/amityadav",
    featured: false,
    order: 6
  }
];

// Real skills from Amit's resume
const skills = [
  // Frontend
  { name: "React.js", category: "frontend", proficiency: 90, order: 1 },
  { name: "JavaScript (ES6+)", category: "frontend", proficiency: 90, order: 2 },
  { name: "HTML5", category: "frontend", proficiency: 95, order: 3 },
  { name: "CSS3", category: "frontend", proficiency: 95, order: 4 },
  { name: "WordPress", category: "frontend", proficiency: 85, order: 5 },
  { name: "Responsive Design", category: "frontend", proficiency: 90, order: 6 },
  
  // Backend
  { name: "Node.js", category: "backend", proficiency: 85, order: 1 },
  { name: "Express.js", category: "backend", proficiency: 85, order: 2 },
  { name: "PHP", category: "backend", proficiency: 80, order: 3 },
  { name: "RESTful APIs", category: "backend", proficiency: 90, order: 4 },
  { name: "API Integration", category: "backend", proficiency: 85, order: 5 },
  
  // Database
  { name: "MongoDB", category: "database", proficiency: 85, order: 1 },
  { name: "SQL", category: "database", proficiency: 80, order: 2 },
  { name: "MySQL", category: "database", proficiency: 80, order: 3 },
  { name: "Database Design", category: "database", proficiency: 75, order: 4 },
  
  // Tools
  { name: "Git & GitHub", category: "tools", proficiency: 90, order: 1 },
  { name: "Jira", category: "tools", proficiency: 85, order: 2 },
  { name: "Slack", category: "tools", proficiency: 85, order: 3 },
  { name: "Power BI", category: "tools", proficiency: 75, order: 4 },
  { name: "DNS Management", category: "tools", proficiency: 70, order: 5 },
  { name: "Figma", category: "tools", proficiency: 80, order: 6 },
  { name: "Canva", category: "tools", proficiency: 85, order: 7 },
  
  // Other
  { name: "Debugging & Testing", category: "other", proficiency: 90, order: 1 },
  { name: "Performance Optimization", category: "other", proficiency: 85, order: 2 },
  { name: "Cross-browser Compatibility", category: "other", proficiency: 90, order: 3 },
  { name: "Agile/Scrum", category: "other", proficiency: 80, order: 4 }
];

// Real experience from Amit's resume
const experiences = [
  {
    company: "Accuster Technologies Pvt. Ltd",
    position: "Software Engineer",
    duration: "November 2024 - Present",
    description: "Building responsive, user-focused applications at a technology solutions company. Maintained PHP-based portals (eaccuster.com, accustersupport.com) ensuring uptime and performance. Built React-based applications (mysehat.ai, sehat.drlabike.in) with scalable components. Collaborated on 10+ cross-functional projects, led usability testing improving task success rates by 20%. Optimized frontend performance reducing page load times by 30%. Enhanced data visualization improving engagement by 15%. Debugged critical production issues reducing downtime by 35%.",
    technologies: ["React.js", "PHP", "Node.js", "MongoDB", "JavaScript", "HTML", "CSS"],
    type: "work",
    order: 1
  },
  {
    company: "Freelance Projects",
    position: "Frontend Developer & Web Developer",
    duration: "November 2024 - August 2025",
    description: "Delivered multiple web development projects including WordPress enhancements for 4 websites, created 3 custom websites from scratch using HTML/CSS/JavaScript, performed QA testing and frontend updates for client platforms, and developed 3 internal web portals. Improved user interaction efficiency by 20% through workflow optimization.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "React.js", "Figma", "Canva"],
    type: "freelance",
    order: 2
  },
  {
    company: "Integral University",
    position: "Bachelor of Computer Application",
    duration: "2021 - 2024",
    description: "Completed Bachelor's degree in Computer Applications from Integral University, Lucknow. Gained comprehensive knowledge in programming, web development, database management, and software engineering principles. Built strong foundation in full-stack development technologies.",
    technologies: ["Programming", "Web Development", "Database Management", "Software Engineering"],
    type: "education",
    order: 3
  },
  {
    company: "SVN Inter College",
    position: "Secondary Education (XIIth)",
    duration: "2017",
    description: "Completed Higher Secondary Education from SVN Inter College, Kalan Sultanpur. Developed strong analytical and problem-solving skills.",
    technologies: [],
    type: "education",
    order: 4
  },
  {
    company: "S.T Thomas Inter College",
    position: "Secondary Education (Xth)",
    duration: "2015",
    description: "Completed Secondary Education from S.T Thomas Inter College, Shahganj Jaunpur. Built foundational academic skills.",
    technologies: [],
    type: "education",
    order: 5
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});

    // Insert new data
    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experiences);

    console.log('✅ Database seeded successfully!');
    console.log(`- ${projects.length} projects added`);
    console.log(`- ${skills.length} skills added`);
    console.log(`- ${experiences.length} experiences added`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();