import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getExperience } from '../services/api';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const data = await getExperience();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      work: 'Work Experience',
      education: 'Education',
      freelance: 'Freelance'
    };
    return labels[type] || type;
  };

  return (
    <div className="experience-page">
      <section className="experience-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            EXPERIENCE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="experience-subtitle"
          >
            My professional journey and educational background
          </motion.p>
        </div>
      </section>

      <section className="experience-content">
        <div className="container">
          {loading ? (
            <div className="loading">Loading experience...</div>
          ) : (
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="experience-type">{getTypeLabel(exp.type)}</div>
                    <h3 className="experience-position">{exp.position}</h3>
                    <div className="experience-company">{exp.company}</div>
                    <div className="experience-duration">{exp.duration}</div>
                    <p className="experience-description">{exp.description}</p>
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="experience-tech">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;
