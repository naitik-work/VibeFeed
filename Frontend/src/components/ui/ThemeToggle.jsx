import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.scss';

export const ThemeToggle = ({ className = '', isCompact = false }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vibefeed-theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('vibefeed-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      type="button"
      className={`vibe-theme-toggle ${isCompact ? 'is-compact' : ''} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="vibe-theme-toggle__icon-wrap">
        {theme === 'dark' ? (
          <Sun size={18} className="vibe-theme-toggle__icon" />
        ) : (
          <Moon size={18} className="vibe-theme-toggle__icon" />
        )}
      </div>
      {!isCompact && (
        <span className="vibe-theme-toggle__label">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
