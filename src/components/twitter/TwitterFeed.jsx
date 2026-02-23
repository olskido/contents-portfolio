import React, { useState } from 'react';
import { SITE_CONFIG } from '../../data/projects.js';
import './TwitterFeed.css';

const MOCK_TWEETS = [
  {
    id: 1,
    content: "Just dropped a new piece of art for the AWIF project. It's been an incredible journey building this from the ground up! Check out awif-solana.vercel.app 👀🔥",
    date: "2h",
    url: "https://twitter.com/olskiddo/status/1"
  },
  {
    id: 2,
    content: "If you're not paying attention to the Soluna-movement, you're missing out. 🚀",
    date: "5h",
    url: "https://twitter.com/olskiddo/status/2"
  },
  {
    id: 3,
    content: "Building something special. Keep your eyes peeled for the next Blocklord update. ⚔️🛡️",
    date: "1d",
    url: "https://twitter.com/olskiddo/status/3"
  },
  {
    id: 4,
    content: "Runner motion visuals are looking insane! Can't wait to share the final cut. 🏃⚡",
    date: "2d",
    url: "https://twitter.com/olskiddo/status/4"
  },
  {
    id: 5,
    content: "Therian origin lore is getting deep... who else is ready for the video script? 📖🐺",
    date: "3d",
    url: "https://twitter.com/olskiddo/status/5"
  }
];

const TwitterFeed = () => {
  const [tab, setTab] = useState('tweets');

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
      <div className="ts-feed-container scroll-y" style={{ padding: '10px' }}>
        {MOCK_TWEETS.map(tweet => (
          <div key={tweet.id} className="custom-tweet-card" style={{ marginBottom: '15px', padding: '12px', border: '1px solid #333', borderRadius: '12px', backgroundColor: '#000', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4fc3f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#000' }}>
                  {SITE_CONFIG.displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>{SITE_CONFIG.displayName}</div>
                  <div style={{ color: '#888', fontSize: '13px' }}>{SITE_CONFIG.twitterHandle} · {tweet.date}</div>
                </div>
              </div>
              <a href={tweet.url} target="_blank" rel="noopener noreferrer" style={{ color: '#888', padding: '4px' }} title="View on X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </a>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#e7e9ea' }}>
              {tweet.content}
            </div>
          </div>
        ))}
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
