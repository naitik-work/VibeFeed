import React from 'react';
import './Skeleton.scss';

export const Skeleton = ({
  variant = 'text', // 'text' | 'circular' | 'rectangular' | 'post' | 'user'
  width,
  height,
  className = '',
  count = 1
}) => {
  if (variant === 'post') {
    return (
      <div className={`vibe-skeleton-post ${className}`}>
        <div className="vibe-skeleton-post__header">
          <div className="vibe-skeleton vibe-skeleton--circular" style={{ width: 42, height: 42 }} />
          <div className="vibe-skeleton-post__header-text">
            <div className="vibe-skeleton vibe-skeleton--text" style={{ width: 120, height: 16 }} />
            <div className="vibe-skeleton vibe-skeleton--text" style={{ width: 70, height: 12 }} />
          </div>
        </div>
        <div className="vibe-skeleton vibe-skeleton--rectangular" style={{ width: '100%', aspectRatio: '1/1' }} />
        <div className="vibe-skeleton-post__footer">
          <div className="vibe-skeleton vibe-skeleton--text" style={{ width: 100, height: 16 }} />
          <div className="vibe-skeleton vibe-skeleton--text" style={{ width: '85%', height: 14 }} />
          <div className="vibe-skeleton vibe-skeleton--text" style={{ width: '60%', height: 14 }} />
        </div>
      </div>
    );
  }

  if (variant === 'user') {
    return (
      <div className={`vibe-skeleton-user ${className}`}>
        <div className="vibe-skeleton vibe-skeleton--circular" style={{ width: 44, height: 44 }} />
        <div className="vibe-skeleton-user__text">
          <div className="vibe-skeleton vibe-skeleton--text" style={{ width: 110, height: 14 }} />
          <div className="vibe-skeleton vibe-skeleton--text" style={{ width: 80, height: 12 }} />
        </div>
      </div>
    );
  }

  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={`vibe-skeleton vibe-skeleton--${variant} ${className}`}
          style={{ width, height }}
        />
      ))}
    </>
  );
};

export default Skeleton;
