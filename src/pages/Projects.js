import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Projects.css";

const LOCAL_PROJECTS = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal portfolio built with React and animations.",
    tech: ["React", "Framer Motion"],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: 2,
    title: "E-commerce UI",
    description: "Modern responsive e-commerce frontend UI.",
    tech: ["React", "CSS"],
    liveUrl: "",
    repoUrl: "",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ No fetchProjects dependency warning because function is inside useEffect
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // If you later want API, replace this line with fetch logic.
      setProjects(LOCAL_PROJECTS);

      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="projects-page">
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Projects</h1>
          <p>Some things I’ve built recently.</p>

          <Link to="/" className="btn-back">
            ← Back Home
          </Link>
        </motion.div>

        {loading ? (
          <div className="projects-state">Loading...</div>
        ) : (
          <div className="projects-grid">
            {projects.map((p, idx) => (
              <motion.div
                key={p.id ?? idx}
                className="project-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>

                {Array.isArray(p.tech) && p.tech.length > 0 && (
                  <div className="project-tags">
                    {p.tech.map((t, i) => (
                      <span key={i} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  {p.liveUrl && (
                    <a
                      className="btn-link"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      className="btn-link"
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
