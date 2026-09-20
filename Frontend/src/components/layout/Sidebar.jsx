import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  User,
  PlusSquare,
  LogOut,
  Sparkles,
} from 'lucide-react';
import useAuth from '../../features/auth/hook/useAuth';
import usePost from '../../features/posts/hook/usePost';
import Avatar from '../ui/Avatar';
import ThemeToggle from '../ui/ThemeToggle';
import './Sidebar.scss';

export const Sidebar = () => {
  const { user, handleLogout } = useAuth();
  const { setIsCreateOpen } = usePost();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Feed', icon: <Home size={22} /> },
    { to: '/explore', label: 'Explore', icon: <Compass size={22} /> },
    { to: '/notifications', label: 'Activity', icon: <Bell size={22} />, badge: 3 },
    { to: '/messages', label: 'Messages', icon: <MessageSquare size={22} />, badge: 1 },
    { to: user ? `/profile` : '/login', label: 'Profile', icon: <User size={22} /> },
  ];

  return (
    <aside className="vibe-sidebar">
      {/* Brand Header */}
      <div className="vibe-sidebar__brand">
        <NavLink to="/" className="vibe-sidebar__logo">
          <div className="vibe-sidebar__logo-icon">
            <Sparkles size={22} />
          </div>
          <span className="vibe-sidebar__logo-text">VibeFeed</span>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="vibe-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `vibe-sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            <span className="vibe-sidebar__link-icon">{item.icon}</span>
            <span className="vibe-sidebar__link-label">{item.label}</span>
            {item.badge && <span className="vibe-sidebar__badge">{item.badge}</span>}
          </NavLink>
        ))}

        {/* Create Post Action Button */}
        <button
          type="button"
          className="vibe-sidebar__create-btn"
          onClick={() => setIsCreateOpen(true)}
        >
          <PlusSquare size={20} />
          <span>Create Vibe</span>
        </button>
      </nav>

      {/* Footer Controls */}
      <div className="vibe-sidebar__footer">
        <div className="vibe-sidebar__theme-wrap">
          <ThemeToggle />
        </div>

        {user ? (
          <div className="vibe-sidebar__user">
            <NavLink to="/profile" className="vibe-sidebar__user-info">
              <Avatar
                src={user.profile_image}
                username={user.username}
                size="sm"
                isOnline
              />
              <div className="vibe-sidebar__user-names">
                <span className="vibe-sidebar__user-name">
                  @{user.username || 'creator'}
                </span>
                <span className="vibe-sidebar__user-role">Creator</span>
              </div>
            </NavLink>
            <button
              type="button"
              className="vibe-sidebar__logout-btn"
              onClick={onLogout}
              title="Log out"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="vibe-sidebar__auth-prompt">
            <NavLink to="/login" className="vibe-sidebar__auth-btn">
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
