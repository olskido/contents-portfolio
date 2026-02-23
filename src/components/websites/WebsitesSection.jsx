import React, { useState } from 'react';
import { PROJECTS } from '../../data/projects.js';
import WebsitePreview from '../websites/WebsitePreview.jsx';
import './WebsitesSection.css';

const WebsitesSection = () => {
  const [activeProject, setActiveProject] = useState(null);

  const webProjects = PROJECTS.filter(p => p.websiteUrl);
  const allWithWeb = PROJECTS.filter(p => p.websiteUrl);

  const selected = allWithWeb.find(p => p.id === activeProject) || allWithWeb[0] || null;

  if (allWithWeb.length === 0) {
    return (
      <section className="websites-section">
        <div className="ws-header">
          <span className="tag tag-amber">Web Work</span>
          <h2 className="heading-text ws-title">Websites</h2>
        </div>
        <div className="ws-empty">
          <span>💻</span>
          <p>Add your websites in <code>src/data/projects.js</code> using the <code>websiteUrl</code> field</p>
        </div>
      </section>
    );
  }

  return (
    <section className="websites-section">
      {/* Header */}
      <div className="ws-header">
        <div className="ws-header-left">
          <span className="tag tag-amber">Web Work</span>
          <h2 className="heading-text ws-title">Websites</h2>
          <span className="ws-count">{allWithWeb.length} site{allWithWeb.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="ws-layout">
        {/* Sidebar: project list */}
        <div className="ws-sidebar">
          {allWithWeb.map((project, i) => (
            <button
              key={project.id}
              className={`ws-project-item ${selected?.id === project.id ? 'active' : ''}`}
              onClick={() => setActiveProject(project.id)}
              style={{ '--wc': project.color, animationDelay: `${i * 0.06}s` }}
            >
              <div className="ws-project-icon">
                {project.media[0]?.placeholder || '💻'}
              </div>
              <div className="ws-project-info">
                <div className="ws-project-title">{project.title}</div>
                <div className="ws-project-url">{project.websiteUrl}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          ))}

          <div className="ws-sidebar-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Some sites block embedding. Click "Open" to visit directly.
          </div>
        </div>

        {/* Main preview */}
        <div className="ws-preview-area">
          {selected ? (
            <>
              <div className="ws-preview-header">
                <div className="ws-preview-meta">
                  <h3 className="ws-preview-title">{selected.title}</h3>
                  <p className="ws-preview-desc">{selected.description}</p>
                  <div className="ws-preview-tags">
                    {selected.tags.map(tag => (
                      <span key={tag} className="tag tag-cream">{tag}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={selected.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Open Site
                </a>
              </div>
              <WebsitePreview key={selected.id} url={selected.websiteUrl} standalone />
            </>
          ) : (
            <div className="ws-select-prompt">
              <span>👈</span>
              <p>Select a website to preview</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;
