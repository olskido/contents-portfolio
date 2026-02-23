import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, TYPE_LABELS, TYPE_COLORS } from '../../data/projects.js';
import WebsitePreview from '../websites/WebsitePreview.jsx';
import './ProjectModal.css';

const ProjectModal = ({ projectId, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showWebsite, setShowWebsite] = useState(false);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    const activeMedia = project?.media[activeMediaIndex];
    if (videoRef.current) {
      if (activeMedia?.type === 'video' && activeMedia?.src) {
        videoRef.current.muted = isMuted;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [activeMediaIndex, isMuted, project]);

  if (!project) return null;

  const { title, subtitle, type, tags, description, media, articles, websiteUrl, color, accentColor, year } = project;
  const typeColor = TYPE_COLORS[type] || color;
  const currentMedia = media[activeMediaIndex];

  const renderCurrentMedia = () => {
    if (!currentMedia) return null;

    if (currentMedia.type === 'video' && currentMedia.src) {
      return (
        <video
          ref={videoRef}
          key={currentMedia.id}
          src={currentMedia.src}
          muted={isMuted}
          loop
          playsInline
          controls={false}
          className="pm-main-media pm-video"
        />
      );
    }
    if (currentMedia.type === 'image' && currentMedia.src) {
      return (
        <img
          key={currentMedia.id}
          src={currentMedia.src}
          alt={currentMedia.caption}
          className="pm-main-media pm-image"
        />
      );
    }
    return (
      <div className="pm-main-placeholder" style={{ '--color': color }}>
        <span className="pm-placeholder-emoji">{currentMedia.placeholder}</span>
        <p className="pm-placeholder-caption">{currentMedia.caption}</p>
        <span className="pm-placeholder-note">
          Add media path in src/data/projects.js
        </span>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="project-modal" ref={modalRef} style={{ '--type-color': typeColor, '--project-color': color }}>

        {/* Header */}
        <div className="pm-header">
          <div className="pm-header-left">
            <span className="tag" style={{ background: `${typeColor}18`, color: typeColor, borderColor: `${typeColor}40` }}>
              {TYPE_LABELS[type]}
            </span>
            <span className="pm-year">{year}</span>
          </div>
          <button className="pm-close" onClick={onClose} title="Close (Esc)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="pm-body">
          {/* Left: Main Display */}
          <div className="pm-left">
            {/* Title */}
            <div className="pm-title-block">
              <h2 className="pm-title">{title}</h2>
              <p className="pm-subtitle">{subtitle}</p>
            </div>

            {/* Main Media Viewer */}
            <div className="pm-media-viewer">
              {renderCurrentMedia()}

              {/* Video controls */}
              {currentMedia?.type === 'video' && (
                <div className="pm-video-controls">
                  <button className="carousel-ctrl-btn" onClick={() => setIsMuted(m => !m)}>
                    {isMuted ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                        Sound Off
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                        Sound On
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Navigation arrows */}
              {media.length > 1 && (
                <>
                  <button
                    className="pm-nav-arrow pm-nav-prev"
                    onClick={() => setActiveMediaIndex(p => (p - 1 + media.length) % media.length)}
                    disabled={media.length <= 1}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6" />
                    </svg>
                  </button>
                  <button
                    className="pm-nav-arrow pm-nav-next"
                    onClick={() => setActiveMediaIndex(p => (p + 1) % media.length)}
                    disabled={media.length <= 1}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Caption */}
              {currentMedia?.caption && (
                <div className="pm-caption">{currentMedia.caption}</div>
              )}
            </div>

            {/* Thumbnail strip */}
            {media.length > 1 && (
              <div className="pm-thumbs">
                {media.map((m, i) => (
                  <button
                    key={m.id}
                    className={`pm-thumb ${i === activeMediaIndex ? 'active' : ''}`}
                    onClick={() => setActiveMediaIndex(i)}
                  >
                    {m.src ? (
                      m.type === 'video'
                        ? <video src={m.src} className="pm-thumb-media" />
                        : <img src={m.src} alt="" className="pm-thumb-media" />
                    ) : (
                      <div className="pm-thumb-placeholder">{m.placeholder}</div>
                    )}
                    {m.type === 'video' && (
                      <div className="pm-thumb-video-icon">▶</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="pm-right">
            {/* Description */}
            <div className="pm-info-card">
              <div className="pm-info-label">About this project</div>
              <p className="pm-description">{description}</p>
              <div className="pm-tags">
                {tags.map(tag => (
                  <span key={tag} className="tag tag-cream">{tag}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="pm-stats-row">
              <div className="pm-stat">
                <span className="pm-stat-value">{media.length}</span>
                <span className="pm-stat-label">Files</span>
              </div>
              <div className="pm-stat">
                <span className="pm-stat-value">{articles.length}</span>
                <span className="pm-stat-label">Articles</span>
              </div>
              <div className="pm-stat">
                <span className="pm-stat-value">{websiteUrl ? '1' : '0'}</span>
                <span className="pm-stat-label">Website</span>
              </div>
            </div>

            {/* Articles / Threads */}
            {articles.length > 0 && (
              <div className="pm-info-card">
                <div className="pm-info-label">Articles & Threads</div>
                <div className="pm-articles-list">
                  {articles.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pm-article-link"
                    >
                      <div className="pm-article-platform">{article.platform}</div>
                      <div className="pm-article-title">{article.title}</div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Website Preview */}
            {websiteUrl && (
              <div className="pm-info-card pm-website-section">
                <div className="pm-info-label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
                  </svg>
                  Live Website
                </div>
                <button
                  className="pm-website-toggle btn btn-ghost"
                  onClick={() => setShowWebsite(p => !p)}
                >
                  {showWebsite ? 'Hide Preview' : 'Show Live Preview'}
                </button>
                {showWebsite && (
                  <WebsitePreview url={websiteUrl} />
                )}
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary pm-visit-btn"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
