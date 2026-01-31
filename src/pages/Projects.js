import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Projects.css";

/**
 * ✅ HOW TO USE
 * Option A (recommended): Use local data
 *   1) Create: src/data/projects.js
 *   2) Export an array: export const projectsData = [...]
 *   3) Set USE_LOCAL_DATA = true
 *
 * Option B: Fetch from API
 *   1) Set USE_LOCAL_DATA = false
 *   2) Set PROJECTS_API_URL to your endpoint that returns JSON array
 */

// 🔧 Choose where projects come from:
const USE_LOCAL_DATA = true;

// 🔧 If using API, put your endpoint here:
const PROJECTS_API_URL = ""; // example: "https://your-domain.com/api/projects"

// (Optional) Local fallback data if you don't create src/data/projects.js yet:
const FALLBACK_LOCAL_PROJECTS = [
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
    description: "Modern responsive e-commerce frontend.",
    tech: ["React", "CSS"],
    liveUrl: "",
    repoUrl: "",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Memoized local data loader (prevents hook dependency warnings)
  const loadLocalProjects = useMemo(() => {
    return async () => {
      try {
        // If you create src/data/projects.js, we'll try to import it:
        // export const projectsData = [...]
        const mod = await import("../data/projects");
        const data = mod?.projectsData;

        if (Array.isArray(data)) return data;
        return FALLBACK_LOCAL_PROJECTS;
      } catch (e) {
        // If file doesn't exist, use fallback
        return FALLBACK_LOCAL_PROJECTS;
      }
    };
  }, []);

  // Memoized API loader (prevents hook dependency warnings)
  const loadApiProjects = useMemo(() => {
    return async () => {
      if (!PROJECTS_API_URL) {
        throw new Error(
          "PROJECTS_API_URL is empty. Set it or switch USE_LOCAL_DATA = true."
        );
      }

      const res = await fetch(PROJECTS_API_URL);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("API response must be an array of projects.");
      }

      return data;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const data = USE_LOCAL_DATA
          ? await loadLocalProjects()
          : await loadApiProjects();

        if (!mounted) return;
        setProjects(data);
      } catch (err) {
        if (!mounted) return;
        setError(err?.message || "Failed to load projects.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [loadLocalProjects, loadApiProjects]);

  return (
    <div className="projects-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="projects-header"
        >
          <h1>Projects</h1>
          <p>Some of the work I’ve built recently.</p>

          <div className="projects-actions">
            <Link to="/" className="btn-back">
              ← Back Home
            </Link>
          </div>
        </motion.div>

        {loading && (
          <div className="projects-state">
            <p>Loading projects…</p>
          </div>
        )}

        {!loading && error && (
          <div className="projects-state">
            <p style={{ color: "crimson" }}>{error}</p>
            <p>
              Tip: If you want a quick build, keep <b>USE_LOCAL_DATA = true</b>.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="projects-state">
            <p>No projects found.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((p, idx) => (
              <motion.div
                key={p.id ?? idx}
                className="project-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="project-title">{p.title || "Untitled Project"}</h3>

                {p.description && (
                  <p className="project-desc">{p.description}</p>
                )}

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
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-link"
                    >
                      Live
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-link"
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
