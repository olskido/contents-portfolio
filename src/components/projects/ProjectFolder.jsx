import React, { useState, useEffect, useRef } from 'react';
import { TYPE_LABELS, TYPE_COLORS } from '../../data/projects.js';
import './ProjectFolder.css';

const ProjectFolder = ({ project, featured, index, view, onClick }) => {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cycleRef = useRef(null);
  const videoRef = useRef(null);

  const { media, type, color, accentColor } = project;
  const currentMedia = media[cycleIndex] || media[0];

  // Cycle through media on hover
  useEffect(() => {
    if (isHovered && media.length > 1) {
      cycleRef.current = setInterval(() => {
        setCycleIndex(prev => (prev + 1) % media.length);
      }, 1800);
    } else {
      clearInterval(cycleRef.current);
      if (!isHovered) setCycleIndex(0);
    }
    return () => clearInterval(cycleRef.current);
  }, [isHovered, media.length]);

  // Handle video
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered && currentMedia?.type === 'video') {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isHovered, currentMedia]);

  const typeColor = TYPE_COLORS[type] || color;
  const typeLabel = TYPE_LABELS[type] || type;

  const renderPreview = () => {
    if (!currentMedia) return <div className="pf-empty-preview">📁</div>;

    if (currentMedia.type === 'video' && currentMedia.src) {
      return (
        <video
          ref={videoRef}
          src={currentMedia.src}
          muted
          loop
          playsInline
          className="pf-media"
        />
      );
    }
    if (currentMedia.type === 'image' && currentMedia.src) {
      return <img src={currentMedia.src} alt={currentMedia.caption} className="pf-media" />;
    }
    // Placeholder
    return (
      <div className="pf-placeholder" style={{ '--color': color, '--accent': accentColor }}>
        <span className="pf-placeholder-emoji">{currentMedia.placeholder}</span>
        <div className="pf-placeholder-grid">
          {media.slice(0, 4).map((m, i) => (
            <div key={i} className="pf-placeholder-cell">{m.placeholder}</div>
          ))}
        </div>
      </div>
    );
  };

  if (view === 'list') {
    return (
      <div
        className="pf-list-item"
        onClick={onClick}
        style={{ '--type-color': typeColor, animationDelay: `${index * 0.05}s` }}
      >
        <div className="pf-list-preview">
          {renderPreview()}
        </div>
        <div className="pf-list-info">
          <div className="pf-list-header">
            <h3 className="pf-list-title">{project.title}</h3>
            <span className="tag" style={{ background: `${typeColor}18`, color: typeColor, borderColor: `${typeColor}40` }}>
              {typeLabel}
            </span>
          </div>
          <p className="pf-list-subtitle">{project.subtitle}</p>
          <p className="pf-list-desc">{project.description}</p>
          <div className="pf-list-tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag tag-cream">{tag}</span>
            ))}
          </div>
        </div>
        <div className="pf-list-meta">
          <span className="pf-list-year">{project.year}</span>
          <span className="pf-list-count">{project.media.length} files</span>
          {project.websiteUrl && <span className="tag tag-amber">Website</span>}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`project-folder ${featured ? 'featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        '--type-color': typeColor,
        '--project-color': color,
        animationDelay: `${index * 0.07}s`
      }}
    >
      {/* Folder tab */}
      <div className="pf-tab">
        <span className="pf-tab-type" style={{ color: typeColor }}>{typeLabel}</span>
        <span className="pf-tab-year">{project.year}</span>
      </div>

      {/* Media preview area */}
      <div className="pf-preview-area">
        {renderPreview()}

        {/* Hover overlay */}
        <div className={`pf-hover-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="pf-hover-actions">
            <div className="pf-hover-open">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Open Folder
            </div>
          </div>
        </div>

        {/* Media count badge */}
        <div className="pf-count-badge">
          {media.length} {media.length === 1 ? 'file' : 'files'}
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="pf-featured-badge">★ Featured</div>
        )}

        {/* Cycling indicator */}
        {isHovered && media.length > 1 && (
          <div className="pf-cycle-dots">
            {media.map((_, i) => (
              <span
                key={i}
                className={`pf-cycle-dot ${i === cycleIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* Website indicator */}
        {project.websiteUrl && (
          <div className="pf-website-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Web
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pf-info">
        <div className="pf-info-top">
          <h3 className="pf-title">{project.title}</h3>
          <div className="pf-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <p className="pf-subtitle">{project.subtitle}</p>
        <div className="pf-tags">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag tag-cream">{tag}</span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="pf-accent-line" />
    </div>
  );
};

export default ProjectFolder;
