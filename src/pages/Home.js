import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaCode, FaLaptopCode, FaRocket, FaStar, FaBolt } from 'react-icons/fa';
import './Home.css';

const HomeFinal = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesignerMode, setIsDesignerMode] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Track mouse for parallax on illustration
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Toggle between designer and developer mode
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDesignerMode(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-final">
      {/* Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="hero-final">
        <div className="container">
          <div className="hero-content-final">
            {/* Badge */}
            <motion.div
              className="hero-badge-final"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.span 
                className="badge-dot"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available for opportunities
            </motion.div>

            {/* Title with staggered animation */}
            <div className="title-wrapper">
              <motion.h1 
                className="hero-title-final"
                initial="hidden"
                animate="visible"
              >
                {['Hi,', "I'm", 'Amit','Yadav'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                    className={i === 2 ? 'highlight-name' : ''}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Animated Role */}
            <motion.div 
              className="role-container-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.h2 
                className="role-text-final"
                animate={{ 
                  color: isDesignerMode ? '#ff3366' : '#00d4ff'
                }}
                transition={{ duration: 1 }}
              >
                Software Engineer
                <motion.span 
                  className="role-line"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="hero-description-final"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              I craft responsive, user-focused applications with expertise in debugging and optimization. 
              Currently building amazing things at <span className="company-highlight">Accuster Technologies</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-cta-final"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/projects" className="btn-final btn-primary-final">
                  <span>View My Work</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="btn-final btn-secondary-final">
                  <span>Let's Talk</span>
                  <FaEnvelope />
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="hero-social-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {[
                { icon: FaGithub, link: 'https://github.com/amityadav' },
                { icon: FaLinkedin, link: 'https://linkedin.com/in/amityadav' },
                { icon: FaEnvelope, link: 'mailto:data.shaper.007@gmail.com' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Animated SVG Illustration - Similar to Adham's */}
          <motion.div
            className="hero-illustration"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
          >
            <svg 
              viewBox="0 0 500 500" 
              className="developer-illustration"
              onClick={() => setIsDesignerMode(!isDesignerMode)}
            >
              {/* Background Circle */}
              <motion.circle
                cx="250"
                cy="250"
                r="200"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />

              {/* Rotating Gears (for Developer) */}
              <motion.g
                animate={{ 
                  rotate: isDesignerMode ? 0 : 360,
                  opacity: isDesignerMode ? 0 : 1
                }}
                transition={{ duration: 1 }}
                style={{ originX: '250px', originY: '250px' }}
              >
                <circle cx="180" cy="180" r="30" fill="#00d4ff" opacity="0.3" />
                <circle cx="320" cy="320" r="25" fill="#00d4ff" opacity="0.3" />
              </motion.g>

              {/* Design Brush (for Designer) */}
              <motion.g
                animate={{ 
                  rotate: isDesignerMode ? 0 : -45,
                  x: isDesignerMode ? 0 : -50,
                  y: isDesignerMode ? 0 : 50,
                  opacity: isDesignerMode ? 1 : 0
                }}
                transition={{ duration: 1 }}
              >
                <rect x="140" y="140" width="8" height="80" fill="#ff3366" rx="4" />
                <path d="M 144 140 L 134 120 L 154 120 Z" fill="#ff3366" />
              </motion.g>

              {/* Person - Body */}
              <motion.ellipse
                cx="250"
                cy="280"
                rx="70"
                ry="90"
                fill="url(#gradient2)"
                animate={{ 
                  ry: isDesignerMode ? 90 : 95
                }}
                transition={{ duration: 1 }}
              />

              {/* Person - Head */}
              <motion.circle
                cx="250"
                cy="200"
                r="60"
                fill="url(#gradient3)"
                animate={{
                  r: isDesignerMode ? 60 : 58
                }}
                transition={{ duration: 1 }}
              />

              {/* Hair */}
              <motion.path
                d="M 190 200 Q 200 150, 250 140 Q 300 150, 310 200"
                fill="#1a1a1a"
                animate={{
                  d: isDesignerMode 
                    ? "M 190 200 Q 200 150, 250 140 Q 300 150, 310 200"
                    : "M 190 195 Q 200 145, 250 135 Q 300 145, 310 195"
                }}
                transition={{ duration: 1 }}
              />

              {/* Eyes */}
              <motion.g
                animate={{
                  y: isDesignerMode ? 0 : 3
                }}
                transition={{ duration: 1 }}
              >
                <circle cx="230" cy="195" r="5" fill="#1a1a1a" />
                <circle cx="270" cy="195" r="5" fill="#1a1a1a" />
              </motion.g>

              {/* Smile */}
              <motion.path
                d="M 230 220 Q 250 235, 270 220"
                stroke="#1a1a1a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: isDesignerMode
                    ? "M 230 220 Q 250 235, 270 220"
                    : "M 230 218 Q 250 230, 270 218"
                }}
                transition={{ duration: 1 }}
              />

              {/* Laptop (Developer Mode) */}
              <motion.g
                animate={{
                  opacity: isDesignerMode ? 0 : 1,
                  y: isDesignerMode ? 20 : 0
                }}
                transition={{ duration: 1 }}
              >
                <rect x="190" y="320" width="120" height="80" rx="5" fill="#2a2a2a" />
                <rect x="200" y="330" width="100" height="60" fill="#00d4ff" opacity="0.3" />
                <rect x="180" y="400" width="140" height="5" rx="2" fill="#2a2a2a" />
                {/* Code lines on laptop */}
                <line x1="210" y1="345" x2="260" y2="345" stroke="#00d4ff" strokeWidth="2" />
                <line x1="210" y1="355" x2="280" y2="355" stroke="#00d4ff" strokeWidth="2" />
                <line x1="210" y1="365" x2="240" y2="365" stroke="#00d4ff" strokeWidth="2" />
              </motion.g>

              {/* Design Tools (Designer Mode) */}
              <motion.g
                animate={{
                  opacity: isDesignerMode ? 1 : 0,
                  y: isDesignerMode ? 0 : 20
                }}
                transition={{ duration: 1 }}
              >
                {/* Pen tool */}
                <path d="M 160 340 L 170 380 L 175 378 L 165 338 Z" fill="#ff3366" />
                {/* Color palette */}
                <circle cx="340" cy="360" r="8" fill="#ff3366" />
                <circle cx="360" cy="360" r="8" fill="#00d4ff" />
                <circle cx="350" cy="380" r="8" fill="#ffcc00" />
              </motion.g>

              {/* Floating Code Brackets (Developer) */}
              <motion.g
                animate={{
                  opacity: isDesignerMode ? 0 : [0, 1, 1, 0],
                  y: isDesignerMode ? 0 : [0, -30, -30, 0],
                  x: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <text x="140" y="150" fontSize="40" fill="#00d4ff" opacity="0.6">{'<'}</text>
                <text x="340" y="150" fontSize="40" fill="#00d4ff" opacity="0.6">{'>'}</text>
              </motion.g>

              {/* Floating Design Elements (Designer) */}
              <motion.g
                animate={{
                  opacity: isDesignerMode ? [0, 1, 1, 0] : 0,
                  y: isDesignerMode ? [0, -30, -30, 0] : 0,
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <circle cx="380" cy="180" r="6" fill="#ff3366" opacity="0.6" />
                <rect x="115" y="180" width="12" height="12" fill="#ffcc00" opacity="0.6" />
              </motion.g>

              {/* Particle Effects */}
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={250 + Math.cos(i * Math.PI / 4) * 180}
                  cy={250 + Math.sin(i * Math.PI / 4) * 180}
                  r="3"
                  fill={isDesignerMode ? "#ff3366" : "#00d4ff"}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    r: [3, 6, 3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3366" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ff3366" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="gradient3">
                  <stop offset="0%" stopColor="#ffd4a3" />
                  <stop offset="100%" stopColor="#ffb86c" />
                </radialGradient>
              </defs>
            </svg>

            {/* Toggle Label */}
            <motion.div 
              className="toggle-label"
              animate={{
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              Click to toggle!
            </motion.div>

            {/* Mode Indicator */}
            <motion.div 
              className="mode-indicator"
              animate={{
                backgroundColor: isDesignerMode ? '#ff3366' : '#00d4ff'
              }}
            >
              {isDesignerMode ? '🎨 Designer' : '💻 Developer'}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator-final"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="scroll-line-final"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section-final">
        <div className="container">
          <motion.div 
            className="stats-grid-final"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { value: '30%', label: 'Faster Load Times', icon: FaRocket, color: '#ff3366' },
              { value: '35%', label: 'Less Downtime', icon: FaCode, color: '#00d4ff' },
              { value: '20%', label: 'Better UX', icon: FaLaptopCode, color: '#ffcc00' },
              { value: '10+', label: 'Projects', icon: FaStar, color: '#00ff88' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card-final"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div 
                  className="stat-icon-final"
                  style={{ color: stat.color }}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon />
                </motion.div>
                <div className="stat-value-final">{stat.value}</div>
                <div className="stat-label-final">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-section-final" style={{ y: y1 }}>
        <div className="container">
          <motion.h2
            className="section-title-final"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technologies I Work With
          </motion.h2>

          <div className="tech-grid-final">
            {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'PHP', 'HTML5', 'CSS3', 'WordPress', 'Git'].map((tech, i) => (
              <motion.div
                key={tech}
                className="tech-item-final"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ 
                  scale: 1.15,
                  boxShadow: "0 10px 30px rgba(255, 51, 102, 0.3)"
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFinal;