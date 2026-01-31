import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaAward, FaRocket, FaHeart, FaLaptopCode, FaUsers, FaChartLine } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stats = [
    { icon: FaRocket, value: '30%', label: 'Faster Load Times' },
    { icon: FaChartLine, value: '35%', label: 'Less Downtime' },
    { icon: FaUsers, value: '20%', label: 'Better UX' },
    { icon: FaCode, value: '10+', label: 'Projects' }
  ];

  const journey = [
    {
      year: '2024 - Present',
      type: 'work',
      icon: FaBriefcase,
      title: 'Software Engineer',
      company: 'Accuster Technologies Pvt. Ltd',
      location: 'New Delhi',
      description: 'Building responsive, user-focused applications at a technology solutions company.',
      highlights: [
        'Maintained PHP-based portals (eaccuster.com, accustersupport.com) ensuring 99.9% uptime',
        'Built React applications (mysehat.ai, sehat.drlabike.in) with scalable components',
        'Collaborated on 10+ cross-functional projects with PM, developers, and QA teams',
        'Led usability testing sessions, improving task success rates by 20%',
        'Optimized frontend performance, reducing page load times by 30%',
        'Enhanced data visualization, improving user engagement by 15%',
        'Reduced system downtime by 35% through proactive debugging'
      ],
      skills: ['React.js', 'PHP', 'Node.js', 'MongoDB', 'JavaScript']
    },
    {
      year: 'Nov 2024 - Aug 2025',
      type: 'freelance',
      icon: FaLaptopCode,
      title: 'Frontend Developer & Web Developer',
      company: 'Freelance Projects',
      location: 'Remote',
      description: 'Delivered multiple web development projects for various clients.',
      highlights: [
        'Enhanced 4 WordPress websites with custom themes and optimized UI',
        'Created 3 custom websites from scratch using HTML/CSS/JavaScript',
        'Developed 3 internal web portals with responsive design',
        'Performed QA testing and frontend updates for client platforms',
        'Improved user interaction efficiency by 20% through workflow optimization'
      ],
      skills: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'Figma', 'Canva']
    },
    {
      year: '2021 - 2024',
      type: 'education',
      icon: FaGraduationCap,
      title: 'Bachelor of Computer Application',
      company: 'Integral University',
      location: 'Lucknow, U.P',
      description: 'Gained comprehensive knowledge in programming, web development, and software engineering.',
      highlights: [
        'Strong foundation in full-stack development technologies',
        'Studied programming, web development, and database management',
        'Built practical projects and applications',
        'Participated in coding competitions and hackathons'
      ],
      skills: ['Programming', 'Web Development', 'Database Management']
    },
    {
      year: '2017',
      type: 'education',
      icon: FaGraduationCap,
      title: 'Secondary Education (XIIth)',
      company: 'SVN Inter College',
      location: 'Kalan Sultanpur',
      description: 'Completed Higher Secondary Education with strong analytical skills.',
      highlights: [
        'Developed strong analytical and problem-solving skills',
        'Built foundational academic excellence'
      ],
      skills: []
    },
    {
      year: '2015',
      type: 'education',
      icon: FaGraduationCap,
      title: 'Secondary Education (Xth)',
      company: 'S.T Thomas Inter College',
      location: 'Shahganj Jaunpur',
      description: 'Completed Secondary Education with solid academic foundation.',
      highlights: [
        'Built foundational academic skills',
        'Developed interest in technology'
      ],
      skills: []
    }
  ];

  const achievements = [
    {
      icon: FaRocket,
      title: 'Performance Optimization',
      description: 'Reduced page load times by 30% and improved Core Web Vitals'
    },
    {
      icon: FaChartLine,
      title: 'System Reliability',
      description: 'Decreased system downtime by 35% through proactive debugging'
    },
    {
      icon: FaUsers,
      title: 'User Experience',
      description: 'Improved task success rates by 20% through usability testing'
    },
    {
      icon: FaAward,
      title: 'Team Collaboration',
      description: 'Successfully delivered 10+ cross-functional projects'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section with Photo */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Photo Section */}
            <motion.div 
              className="photo-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="photo-frame">
                {/* Animated Border */}
                <motion.div 
                  className="photo-border"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Glowing Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="photo-particle"
                    style={{
                      top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
                      left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}

                {/* Profile Photo - Replace with your actual photo */}
                <div className="photo-wrapper">
                  <img 
                    src="./assets/amit.jpeg" 
                    alt="Amit Yadav"
                    className="profile-photo"
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div 
                    className="photo-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <FaCode className="overlay-icon" />
                    <p>Software Engineer</p>
                  </motion.div>
                </div>

                {/* Status Badge */}
                <motion.div 
                  className="status-badge"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="status-dot"></span>
                  Available
                </motion.div>
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1 
                className="about-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Hi, I'm <span className="highlight">Amit Yadav</span>
              </motion.h1>

              <motion.h2 
                className="about-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Software Engineer • MERN Stack Developer
              </motion.h2>

              <motion.p 
                className="about-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                I'm a skilled web developer with expertise in building responsive, user-focused 
                applications and a strong aptitude for debugging mobile and web apps. Currently 
                working at <span className="company-name">Accuster Technologies Pvt. Ltd</span>, 
                where I've successfully reduced page load times by 30%, improved task success 
                rates by 20%, and decreased system downtime by 35%.
              </motion.p>

              <motion.p 
                className="about-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                I'm passionate about creating seamless user experiences, optimizing performance, 
                and collaborating with cross-functional teams to deliver high-quality solutions. 
                Based in <span className="location">New Delhi, India</span>, I'm always eager to 
                take on new challenges and contribute to innovative projects.
              </motion.p>

              {/* Contact Info */}
              <motion.div 
                className="contact-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <a href="mailto:data.shaper.007@gmail.com">data.shaper.007@gmail.com</a>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <a href="tel:+919616260449">+91 96162 60449</a>
                </div>
                <div className="info-item">
                  <span className="info-label">Location:</span>
                  <span>Ghitorni, New Delhi, India</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <motion.div 
            className="stats-grid-about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card-about"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <stat.icon className="stat-icon-about" />
                <div className="stat-value-about">{stat.value}</div>
                <div className="stat-label-about">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey-section">
        <div className="container">
          <motion.h2 
            className="section-title-about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Professional Journey
          </motion.h2>

          <div className="timeline">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                className={`timeline-item ${item.type}`}
                initial={{ 
                  opacity: 0, 
                  x: isMobile ? -50 : (i % 2 === 0 ? -100 : 100),
                  scale: 0.8
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  delay: i * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="timeline-marker">
                  <item.icon />
                </div>

                <motion.div 
                  className="timeline-content"
                  initial={{ 
                    opacity: 0,
                    rotateY: isMobile ? 0 : (i % 2 === 0 ? -15 : 15)
                  }}
                  whileInView={{ 
                    opacity: 1,
                    rotateY: 0
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15 + 0.3,
                    duration: 0.8
                  }}
                  whileHover={{ 
                    scale: isMobile ? 1.02 : 1.03,
                    boxShadow: isMobile 
                      ? '0 20px 40px rgba(255, 51, 102, 0.3)'
                      : (i % 2 === 0 
                        ? '-20px 30px 60px rgba(255, 51, 102, 0.3)' 
                        : '20px 30px 60px rgba(0, 212, 255, 0.3)')
                  }}
                >
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <div className="timeline-company">{item.company}</div>
                  <div className="timeline-location">{item.location}</div>
                  <p className="timeline-description">{item.description}</p>

                  {item.highlights.length > 0 && (
                    <ul className="timeline-highlights">
                      {item.highlights.map((highlight, hi) => (
                        <motion.li 
                          key={hi}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: hi * 0.05 }}
                        >
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {item.skills.length > 0 && (
                    <div className="timeline-skills">
                      {item.skills.map((skill, si) => (
                        <span key={si} className="skill-tag-timeline">{skill}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="achievements-section">
        <div className="container">
          <motion.h2 
            className="section-title-about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Achievements
          </motion.h2>

          <div className="achievements-grid">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                className="achievement-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="achievement-icon">
                  <achievement.icon />
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Values */}
      <section className="values-section">
        <div className="container">
          <motion.div 
            className="values-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-about">What Drives Me</h2>
            <div className="values-grid">
              <motion.div 
                className="value-card"
                whileHover={{ scale: 1.05 }}
              >
                <FaHeart className="value-icon" />
                <h3>Passion for Quality</h3>
                <p>I believe in writing clean, maintainable code and delivering solutions that exceed expectations.</p>
              </motion.div>

              <motion.div 
                className="value-card"
                whileHover={{ scale: 1.05 }}
              >
                <FaUsers className="value-icon" />
                <h3>Collaborative Spirit</h3>
                <p>I thrive in team environments and enjoy collaborating with designers, developers, and stakeholders.</p>
              </motion.div>

              <motion.div 
                className="value-card"
                whileHover={{ scale: 1.05 }}
              >
                <FaRocket className="value-icon" />
                <h3>Continuous Learning</h3>
                <p>Technology evolves rapidly, and I'm committed to staying current with the latest tools and best practices.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;