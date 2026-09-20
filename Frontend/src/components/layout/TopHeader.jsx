import React from 'react';
import { NavLink } from 'react-router';
import { Sparkles, Bell, PlusCircle } from 'lucide-react';
import usePost from '../../features/posts/hook/usePost';
import ThemeToggle from '../ui/ThemeToggle';
import './TopHeader.scss';

export const TopHeader = () => {
  const { setIsCreateOpen } = usePost();

  return (
    <header className="vibe-mobile-header">
      <NavLink to="/" className="vibe-mobile-header__logo">
        <div className="vibe-mobile-header__logo-icon">
          <Sparkles size={18} />
        </div>
        <span className="vibe-mobile-header__logo-text">VibeFeed</span>
      </NavLink>

      <div className="vibe-mobile-header__actions">
        <button
          type="button"
          className="vibe-mobile-header__btn"
          onClick={() => setIsCreateOpen(true)}
          aria-label="Create Vibe"
        >
          <PlusCircle size={22} />
        </button>

        <ThemeToggle isCompact />

        <NavLink
          to="/notifications"
          className="vibe-mobile-header__btn"
          aria-label="Notifications"
        >
          <Bell size={22} />
          <span className="vibe-mobile-header__dot" />
        </NavLink>
      </div>
    </header>
  );
};

export default TopHeader;
