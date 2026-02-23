import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import HeroSection from './components/hero/HeroSection.jsx';
import MediaCarousel from './components/showcase/MediaCarousel.jsx';
import ProjectGrid from './components/projects/ProjectGrid.jsx';
import ProjectModal from './components/projects/ProjectModal.jsx';
import WebsitesSection from './components/websites/WebsitesSection.jsx';
import ThreadsSection from './components/twitter/ThreadsSection.jsx';
import TwitterFeed from './components/twitter/TwitterFeed.jsx';
import './App.css';

const SECTIONS = ['showcase', 'projects', 'websites', 'threads'];

export default function App() {
  const [activeSection, setActiveSection] = useState('showcase');
  const [openProjectId, setOpenProjectId] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const sectionRefs = useRef({});

  // Cursor glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const openProject = useCallback((projectId) => {
    setOpenProjectId(projectId);
  }, []);

  const closeProject = useCallback(() => {
    setOpenProjectId(null);
  }, []);

  const setRef = (sectionId) => (el) => {
    sectionRefs.current[sectionId] = el;
  };

  return (
    <div className="app-layout">
      {/* Cursor glow effect */}
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Ambient light effects */}
      <div className="ambient-left" />
      <div className="ambient-right" />

      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={navigate} />

      <div className="main-content">
        {/* Main scrollable content */}
        <div className="content-area">
          {/* Hero */}
          <div ref={setRef('hero')} data-section="hero">
            <HeroSection onExplore={navigate} />
          </div>

          {/* Showcase */}
          <div ref={setRef('showcase')} data-section="showcase" className="section-wrapper">
            <MediaCarousel onProjectClick={openProject} />
          </div>

          <div className="section-divider" />

          {/* Projects */}
          <div ref={setRef('projects')} data-section="projects" className="section-wrapper">
            <ProjectGrid onProjectOpen={openProject} />
          </div>

          <div className="section-divider" />

          {/* Websites */}
          <div ref={setRef('websites')} data-section="websites" className="section-wrapper">
            <WebsitesSection />
          </div>

          <div className="section-divider" />

          {/* Threads & Articles */}
          <div ref={setRef('threads')} data-section="threads" className="section-wrapper">
            <ThreadsSection />
          </div>

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-identity">
                <span className="footer-name">deeaaddd🍼🍼</span>
                <span className="footer-slash">/</span>
                <span className="footer-alt">Olskido</span>
              </div>
              <div className="footer-tagline">
                Content Maker · Meme Architect · Digital Artist
              </div>
              <div className="footer-copy">
                © {new Date().getFullYear()} Olskido. All work is original.
              </div>
            </div>
          </footer>
        </div>

        {/* Twitter Sidebar */}
        <TwitterFeed />
      </div>

      {/* Project Modal */}
      {openProjectId && (
        <ProjectModal
          projectId={openProjectId}
          onClose={closeProject}
        />
      )}
    </div>
  );
}
