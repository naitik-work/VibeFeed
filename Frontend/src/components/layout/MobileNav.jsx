import React from 'react';
import { NavLink } from 'react-router';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';
import useAuth from '../../features/auth/hook/useAuth';
import usePost from '../../features/posts/hook/usePost';
import Avatar from '../ui/Avatar';
import './MobileNav.scss';

export const MobileNav = () => {
  const { user } = useAuth();
  const { setIsCreateOpen } = usePost();

  return (
    <nav className="vibe-mobile-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `vibe-mobile-nav__item ${isActive ? 'is-active' : ''}`
        }
        aria-label="Feed"
      >
        <Home size={22} />
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `vibe-mobile-nav__item ${isActive ? 'is-active' : ''}`
        }
        aria-label="Explore"
      >
        <Compass size={22} />
      </NavLink>

      <button
        type="button"
        className="vibe-mobile-nav__create"
        onClick={() => setIsCreateOpen(true)}
        aria-label="Create Post"
      >
        <div className="vibe-mobile-nav__create-inner">
          <Plus size={22} />
        </div>
      </button>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          `vibe-mobile-nav__item ${isActive ? 'is-active' : ''}`
        }
        aria-label="Messages"
      >
        <MessageSquare size={22} />
      </NavLink>

      <NavLink
        to={user ? '/profile' : '/login'}
        className={({ isActive }) =>
          `vibe-mobile-nav__item ${isActive ? 'is-active' : ''}`
        }
        aria-label="Profile"
      >
        {user ? (
          <Avatar
            src={user.profile_image}
            username={user.username}
            size="xs"
          />
        ) : (
          <User size={22} />
        )}
      </NavLink>
    </nav>
  );
};

export default MobileNav;
