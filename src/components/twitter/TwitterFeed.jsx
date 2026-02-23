import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../data/projects.js';
import './TwitterFeed.css';

const TwitterFeed = () => {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('tweets'); // 'tweets' | 'replies'

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.onload = () => {
      setLoaded(true);
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (loaded && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [tab, loaded]);

  const handle = SITE_CONFIG.twitterHandle.replace('@', '');

  return (
    <aside className="twitter-sidebar">
      {/* Header */}
      <div className="ts-header">
        <div className="ts-header-top">
          <div className="ts-title-group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--x-blue)' }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.774-8.906L1.64 2.25h6.856l4.265 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            <span className="ts-title">Live Feed</span>
          </div>
          <a
            href={SITE_CONFIG.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ts-follow-btn"
          >
            Follow
          </a>
        </div>

        <div className="ts-handle">{SITE_CONFIG.twitterHandle}</div>

        {/* Tab switcher */}
        <div className="ts-tabs">
          {['tweets', 'replies'].map(t => (
            <button
              key={t}
              className={`ts-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Embed */}
      <div className="ts-feed-container scroll-y">
        {!loaded && (
          <div className="ts-loading">
            <div className="ts-loading-skeleton">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="ts-skeleton-tweet" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="ts-sk-avatar" />
                  <div className="ts-sk-content">
                    <div className="ts-sk-line ts-sk-name" />
                    <div className="ts-sk-line ts-sk-text" />
                    <div className="ts-sk-line ts-sk-text ts-sk-short" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render real widget to ensure engagements and replies update */}
        <a
          key={tab}
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="8"
          href={tab === 'replies'
            ? `https://twitter.com/${handle}?ref_src=twsrc%5Etfw` // replies are not exclusively supported without API, but this shows the main feed correctly
            : `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`}
          style={{ display: loaded ? 'block' : 'none' }}
        >
          Tweets by {SITE_CONFIG.twitterHandle}
        </a>
      </div>

      {/* Footer */}
      <div className="ts-footer">
        <a
          href={SITE_CONFIG.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ts-view-all"
        >
          View full profile on X
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </aside>
  );
};

export default TwitterFeed;
