import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../services/api';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();
      
      const grouped = data.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {});

      setSkills(grouped);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitles = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    tools: 'Tools & Others'
  };

  return (
    <div className="skills-page">
      <section className="skills-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SKILLS & EXPERTISE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="skills-subtitle"
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </div>
      </section>

      <section className="skills-content">
        <div className="container">
          {loading ? (
            <div className="loading">Loading skills...</div>
          ) : (
            Object.entries(skills).map(([category, categorySkills], catIndex) => (
              <motion.div
                key={category}
                className="skills-category"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h2 className="category-title">{categoryTitles[category]}</h2>
                <div className="skills-grid">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      className="skill-card"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="skill-header">
                        <h3 className="skill-name">{skill.name}</h3>
                        <span className="skill-percentage">{skill.proficiency}%</span>
                      </div>
                      <div className="skill-bar-container">
                        <motion.div
                          className="skill-bar"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Skills;
