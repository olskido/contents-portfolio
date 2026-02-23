import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../data/projects.js';
import avatarImg from '../../assets/avatar.png';
import './Navbar.css';

const Navbar = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'showcase', label: 'Showcase' },
    { id: 'projects', label: 'Projects' },
    { id: 'websites', label: 'Websites' },
    { id: 'threads', label: 'Threads' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo / Identity */}
        <div className="navbar-identity" onClick={() => onNavigate('showcase')}>
          <div className="navbar-avatar-wrap">
            <img src={avatarImg} alt="Olskido" className="navbar-avatar" />
            <div className="navbar-avatar-ring" />
          </div>
          <div className="navbar-names">
            <span className="navbar-display">{SITE_CONFIG.displayName}</span>
            <span className="navbar-alt">{SITE_CONFIG.altName}</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
              {activeSection === link.id && <span className="navbar-link-dot" />}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="navbar-right">
          <a
            href={SITE_CONFIG.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-twitter-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.774-8.906L1.64 2.25h6.856l4.265 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            <span>{SITE_CONFIG.twitterHandle}</span>
          </a>
          <button className="navbar-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`mobile-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          ))}
          <a href={SITE_CONFIG.twitterUrl} target="_blank" rel="noopener noreferrer" className="mobile-twitter">
            Follow on X
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
