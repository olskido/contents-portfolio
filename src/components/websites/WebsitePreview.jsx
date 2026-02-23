import React, { useState, useRef } from 'react';
import './WebsitePreview.css';

const WebsitePreview = ({ url, standalone = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeDevice, setIframeDevice] = useState('desktop');
  const iframeRef = useRef(null);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => { setIsLoading(false); setHasError(true); };

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className={`website-preview ${standalone ? 'standalone' : ''}`}>
      {/* Browser Chrome */}
      <div className="wp-chrome">
        <div className="wp-chrome-dots">
          <span className="wp-dot wp-dot-red" />
          <span className="wp-dot wp-dot-yellow" />
          <span className="wp-dot wp-dot-green" />
        </div>
        <div className="wp-url-bar">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="wp-url-text">{url}</span>
        </div>
        <div className="wp-device-toggle">
          {['desktop', 'tablet', 'mobile'].map(d => (
            <button
              key={d}
              className={`wp-device-btn ${iframeDevice === d ? 'active' : ''}`}
              onClick={() => setIframeDevice(d)}
              title={d.charAt(0).toUpperCase() + d.slice(1)}
            >
              {d === 'desktop' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                </svg>
              )}
              {d === 'tablet' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              )}
              {d === 'mobile' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              )}
            </button>
          ))}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="wp-open-btn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
          Open
        </a>
      </div>

      {/* Frame Container */}
      <div className="wp-frame-container">
        <div
          className="wp-frame-inner"
          style={{ maxWidth: deviceWidths[iframeDevice] }}
        >
          {isLoading && (
            <div className="wp-loading">
              <div className="wp-loading-bar">
                <div className="wp-loading-fill" />
              </div>
              <span>Loading preview...</span>
            </div>
          )}
          {hasError && (
            <div className="wp-error">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>Preview not available</p>
              <span>Some sites block embedding. Use "Open" to visit directly.</span>
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: '8px', fontSize: '12px' }}>
                Visit Site
              </a>
            </div>
          )}
          {!hasError && (
            <iframe
              ref={iframeRef}
              src={url}
              className={`wp-iframe ${isLoading ? 'loading' : ''}`}
              onLoad={handleLoad}
              onError={handleError}
              title={`Preview of ${url}`}
              sandbox="allow-same-origin allow-scripts allow-forms"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsitePreview;
