import React from 'react';
import { PROJECTS } from '../../data/projects.js';
import './ThreadsSection.css';

const PLATFORM_ICONS = {
  'X/Twitter': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.774-8.906L1.64 2.25h6.856l4.265 5.633L18.244 2.25z" />
    </svg>
  ),
  Medium: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
};

const ThreadsSection = () => {
  const projectsWithArticles = PROJECTS.filter(p => p.articles && p.articles.length > 0);
  const allArticles = projectsWithArticles.flatMap(p =>
    p.articles.map(a => ({ ...a, projectTitle: p.title, projectColor: p.color, projectId: p.id }))
  );

  const threadProjects = PROJECTS.filter(p => p.type === 'thread' || p.type === 'article');

  return (
    <section className="threads-section">
      <div className="thr-header">
        <span className="tag tag-amber">Written Work</span>
        <h2 className="heading-text thr-title">Threads & Articles</h2>
        <span className="thr-count">{allArticles.length} piece{allArticles.length !== 1 ? 's' : ''}</span>
      </div>

      {allArticles.length === 0 ? (
        <div className="thr-empty">
          <span>✍️</span>
          <p>Add articles and threads to your projects in <code>src/data/projects.js</code></p>
        </div>
      ) : (
        <div className="thr-layout">
          {/* Featured Articles */}
          <div className="thr-main">
            <div className="thr-section-label">All Articles & Threads</div>
            <div className="thr-list">
              {allArticles.map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thr-article-card"
                  style={{ '--ac': article.projectColor, animationDelay: `${i * 0.05}s` }}
                >
                  <div className="thr-article-left">
                    <div
                      className="thr-article-platform-badge"
                      style={{ background: `${article.projectColor}18`, borderColor: `${article.projectColor}40`, color: article.projectColor }}
                    >
                      {PLATFORM_ICONS[article.platform]}
                      {article.platform}
                    </div>
                    <h3 className="thr-article-title">{article.title}</h3>
                    <div className="thr-article-project">From: {article.projectTitle}</div>
                  </div>
                  <div className="thr-article-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="thr-sidebar">
            <div className="thr-sidebar-card">
              <div className="thr-sidebar-title">Writing Stats</div>
              <div className="thr-stat-list">
                <div className="thr-stat-item">
                  <span className="thr-stat-value">{allArticles.length}</span>
                  <span className="thr-stat-label">Total Pieces</span>
                </div>
                <div className="thr-stat-item">
                  <span className="thr-stat-value">{projectsWithArticles.length}</span>
                  <span className="thr-stat-label">Projects Covered</span>
                </div>
                <div className="thr-stat-item">
                  <span className="thr-stat-value">
                    {[...new Set(allArticles.map(a => a.platform))].length}
                  </span>
                  <span className="thr-stat-label">Platforms</span>
                </div>
              </div>
            </div>

            <div className="thr-sidebar-card">
              <div className="thr-sidebar-title">Platforms</div>
              {[...new Set(allArticles.map(a => a.platform))].map(platform => (
                <div key={platform} className="thr-platform-row">
                  <div className="thr-platform-icon">{PLATFORM_ICONS[platform]}</div>
                  <span>{platform}</span>
                  <span className="thr-platform-count">
                    {allArticles.filter(a => a.platform === platform).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ThreadsSection;
