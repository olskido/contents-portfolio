import React, { useState, useMemo } from 'react';
import { PROJECTS, TYPE_LABELS, TYPE_COLORS } from '../../data/projects.js';
import ProjectFolder from './ProjectFolder.jsx';
import './ProjectGrid.css';

const FILTERS = ['All', 'meme', 'art', 'thread', 'website', 'mixed'];

const ProjectGrid = ({ onProjectOpen }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid'); // 'grid' | 'list'

  const filtered = useMemo(() => {
    let result = PROJECTS;
    if (activeFilter !== 'All') {
      result = result.filter(p => p.type === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeFilter, searchQuery]);

  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <section className="project-grid-section">
      {/* Header */}
      <div className="pg-header">
        <div className="pg-header-left">
          <span className="tag tag-amber">All Work</span>
          <h2 className="heading-text pg-title">Projects</h2>
          <span className="pg-count">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</span>
        </div>

        <div className="pg-header-right">
          {/* Search */}
          <div className="pg-search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pg-search-input"
            />
          </div>

          {/* View toggle */}
          <div className="pg-view-toggle">
            <button className={`btn-icon ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button className={`btn-icon ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="pg-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`pg-filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
            style={activeFilter === f && f !== 'All' ? { '--fc': TYPE_COLORS[f] } : {}}
          >
            {f === 'All' ? 'All Projects' : TYPE_LABELS[f] || f}
            <span className="pg-filter-count">
              {f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.type === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="pg-divider" />

      {/* Featured Row */}
      {featured.length > 0 && (
        <div className="pg-section">
          <div className="pg-section-label">
            <span className="pg-section-line" />
            <span>Featured</span>
            <span className="pg-section-line" />
          </div>
          <div className={`pg-featured-row ${view}`}>
            {featured.map((project, i) => (
              <ProjectFolder
                key={project.id}
                project={project}
                featured
                index={i}
                view={view}
                onClick={() => onProjectOpen(project.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Rest */}
      {rest.length > 0 && (
        <div className="pg-section">
          {featured.length > 0 && (
            <div className="pg-section-label">
              <span className="pg-section-line" />
              <span>More Work</span>
              <span className="pg-section-line" />
            </div>
          )}
          <div className={`pg-grid ${view}`}>
            {rest.map((project, i) => (
              <ProjectFolder
                key={project.id}
                project={project}
                featured={false}
                index={i}
                view={view}
                onClick={() => onProjectOpen(project.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="pg-empty">
          <span className="pg-empty-emoji">🔍</span>
          <p>No projects match your search.</p>
          <button className="btn btn-ghost" onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectGrid;
