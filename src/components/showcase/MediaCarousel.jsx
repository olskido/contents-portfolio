import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SHOWCASE_ITEMS, PROJECTS } from '../../data/projects.js';
import './MediaCarousel.css';

const MediaCarousel = ({ onProjectClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef({});
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const progressStartRef = useRef(null);

  const items = SHOWCASE_ITEMS;
  const DURATION = 7000; // 7 seconds per item

  const goTo = useCallback((index) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % items.length);
    setProgress(0);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + items.length) % items.length);
    setProgress(0);
  }, [items.length]);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(timerRef.current);
      cancelAnimationFrame(progressRef.current);
      return;
    }

    const start = Date.now() - (progress / 100) * DURATION;

    const animateProgress = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(animateProgress);
      } else {
        goNext();
      }
    };

    progressRef.current = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(progressRef.current);
    };
  }, [activeIndex, isPlaying, goNext]);

  // Video control
  useEffect(() => {
    const activeItem = items[activeIndex];
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;
      if (parseInt(key) === activeIndex) {
        if (activeItem.type === 'video' && activeItem.src) {
          video.muted = isMuted;
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isMuted, items]);

  const activeItem = items[activeIndex];
  const activeProject = PROJECTS.find(p => p.id === activeItem?.projectId);

  const renderMedia = (item, index) => {
    const isActive = index === activeIndex;

    if (item.type === 'video' && item.src) {
      return (
        <video
          key={item.id}
          ref={el => videoRefs.current[index] = el}
          src={item.src}
          muted={isMuted}
          loop
          playsInline
          className={`carousel-media carousel-video ${isActive ? 'active' : ''}`}
        />
      );
    }

    if (item.type === 'image' && item.src) {
      return (
        <img
          key={item.id}
          src={item.src}
          alt={item.label}
          className={`carousel-media carousel-image ${isActive ? 'active' : ''}`}
        />
      );
    }

    // Placeholder for demo
    return (
      <div
        key={item.id}
        className={`carousel-media carousel-placeholder ${isActive ? 'active' : ''}`}
        style={{ '--project-color': activeProject?.color || '#d4832a' }}
      >
        <span className="placeholder-emoji">{item.placeholder}</span>
        <span className="placeholder-label">{item.label}</span>
        <span className="placeholder-hint">Add your media in src/data/projects.js</span>
      </div>
    );
  };

  return (
    <section className="media-carousel">
      {/* Section Header */}
      <div className="carousel-header">
        <div className="carousel-header-left">
          <span className="tag tag-amber">Live Showcase</span>
          <h2 className="heading-text" style={{ fontSize: '22px', color: 'var(--cream)' }}>
            Featured Work
          </h2>
        </div>
        <div className="carousel-controls-top">
          <button className="btn-icon" onClick={goPrev} title="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button className="btn-icon" onClick={() => setIsPlaying(p => !p)} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
          <button className="btn-icon" onClick={goNext} title="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="carousel-stage">
        {/* Media Stack */}
        <div className="carousel-media-stack">
          {items.map((item, index) => renderMedia(item, index))}

          {/* Gradient overlays */}
          <div className="carousel-overlay-bottom" />
          <div className="carousel-overlay-left" />

          {/* Info overlay */}
          <div className="carousel-info-overlay">
            {activeProject && (
              <div className="carousel-info">
                <div className="carousel-info-tags">
                  {activeProject.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag tag-cream">{tag}</span>
                  ))}
                </div>
                <h3 className="carousel-info-title">{activeItem?.label}</h3>
                <p className="carousel-info-project">{activeProject.title}</p>
              </div>
            )}
          </div>

          {/* Bottom controls bar */}
          <div className="carousel-bottom-bar">
            {/* Sound control (only relevant for videos) */}
            {activeItem?.type === 'video' && (
              <button
                className="carousel-ctrl-btn"
                onClick={() => setIsMuted(m => !m)}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
                <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
              </button>
            )}

            {/* View project */}
            {activeProject && (
              <button
                className="carousel-ctrl-btn carousel-ctrl-primary"
                onClick={() => onProjectClick(activeProject.id)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span>Open Project</span>
              </button>
            )}

            {/* Progress */}
            <div className="carousel-progress-wrap">
              <div className="carousel-progress-bar">
                <div
                  className="carousel-progress-fill"
                  style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                />
              </div>
              <span className="carousel-counter">{activeIndex + 1} / {items.length}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="carousel-thumbs">
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`carousel-thumb ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              style={{ '--tc': PROJECTS.find(p => p.id === item.projectId)?.color || '#d4832a' }}
            >
              {item.src ? (
                item.type === 'video' ? (
                  <video src={item.src} className="thumb-media" />
                ) : (
                  <img src={item.src} alt="" className="thumb-media" />
                )
              ) : (
                <div className="thumb-placeholder">{item.placeholder}</div>
              )}
              {index === activeIndex && (
                <div className="thumb-active-indicator">
                  <div className="thumb-progress" style={{ height: `${progress}%` }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCarousel;
