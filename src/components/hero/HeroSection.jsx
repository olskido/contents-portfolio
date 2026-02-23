import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG, PROJECTS } from '../../data/projects.js';
import avatarImg from '../../assets/avatar.png';
import './HeroSection.css';

const HeroSection = ({ onExplore }) => {
  const canvasRef = useRef(null);

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.05;
        this.color = Math.random() > 0.7 ? '212, 131, 42' : '240, 235, 227';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const stats = [
    { value: PROJECTS.length, label: 'Projects' },
    { value: '∞', label: 'Memes Dropped' },
    { value: '2D', label: 'Art Style' },
    { value: '🍼', label: 'Always' },
  ];

  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Background decorative text */}
      <div className="hero-bg-text" aria-hidden>OLSKIDO</div>

      <div className="hero-inner">
        {/* Left: Identity */}
        <div className="hero-identity" style={{ animationDelay: '0.1s' }}>
          <div className="hero-avatar-container">
            <div className="hero-avatar-glow" />
            <div className="hero-avatar-ring-outer" />
            <div className="hero-avatar-ring-inner" />
            <img src={avatarImg} alt="Olskido" className="hero-avatar" />
            <div className="hero-avatar-badge">
              <span>🍼</span>
            </div>
          </div>

          <div className="hero-name-block">
            <div className="hero-tag-row">
              <span className="tag tag-amber">Content Maker</span>
              <span className="tag tag-cream">Meme Architect</span>
            </div>
            <h1 className="hero-display-name">{SITE_CONFIG.displayName}</h1>
            <div className="hero-alt-name">
              <span className="hero-alt-slash">/</span>
              <span className="hero-alt">{SITE_CONFIG.altName}</span>
            </div>
            <p className="hero-bio">{SITE_CONFIG.bio}</p>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onExplore('projects')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              View All Projects
            </button>
            <a href={SITE_CONFIG.twitterUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.774-8.906L1.64 2.25h6.856l4.265 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
              Follow on X
            </a>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="hero-stats-block">
          <div className="hero-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat-card" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-marquee-container">
            <div className="hero-marquee">
              {['MEMES', 'ART', 'THREADS', 'CAMPAIGNS', 'WEBSITES', 'VIDEOS', 'CONTENT', 'CULTURE', 'MEMES', 'ART', 'THREADS', 'CAMPAIGNS', 'WEBSITES', 'VIDEOS', 'CONTENT', 'CULTURE'].map((t, i) => (
                <span key={i} className="hero-marquee-item">
                  {t} <span className="hero-marquee-dot">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint">
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
