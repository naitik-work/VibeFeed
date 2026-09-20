import React, { useState } from 'react';
import './Avatar.scss';

export const Avatar = ({
  src,
  alt = 'User avatar',
  username = '',
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  hasStory = false,
  isOnline = false,
  className = '',
  onClick
}) => {
  const [imgError, setImgError] = useState(false);

  // Fallback initial
  const initial = username ? username.charAt(0).toUpperCase() : 'V';

  // Default fallback image if src fails or is not given
  const defaultFallback = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`;

  return (
    <div
      className={`vibe-avatar-wrapper vibe-avatar-wrapper--${size} ${hasStory ? 'has-story' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="vibe-avatar">
        {!imgError && (src || defaultFallback) ? (
          <img
            src={src || defaultFallback}
            alt={alt || username}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="vibe-avatar__fallback">{initial}</span>
        )}
      </div>
      {isOnline && <span className="vibe-avatar__online-badge" />}
    </div>
  );
};

export default Avatar;
