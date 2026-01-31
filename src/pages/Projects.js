import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { getProjects } from '../services/api';
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from API using service
      const data = await getProjects();
      
      console.log('Projects loaded:', data);
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter projects by category
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Get unique categories
  const categories = ["all", ...new Set(projects.map(p => p.category))];

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              My Projects
            </motion.h1>
            <motion.p
              className="projects-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              A collection of my recent work showcasing web applications, 
              websites, and development projects.
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="projects-content">
        <div className="container">
          {loading ? (
            <div className="projects-loading">
              <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p>Loading amazing projects...</p>
            </div>
          ) : error ? (
            <motion.div
              className="projects-error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaCode className="error-icon" />
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button 
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              className="projects-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>No projects found in this category.</p>
            </motion.div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || index}
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(255, 51, 102, 0.3)"
                  }}
                >
                  {/* Project Image */}
                  {project.image && (
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      <div className="project-overlay">
                        <span className="category-badge">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-tech">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project Links */}
                    <div className="project-links">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub />
                          <span>Code</span>
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link primary"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaExternalLinkAlt />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                    </div>
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

export default Projects;