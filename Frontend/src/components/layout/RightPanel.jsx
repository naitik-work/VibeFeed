import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Search, TrendingUp, Sparkles, Check, UserPlus } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import useUser from '../../features/users/hook/useUser';
import { useToast } from '../../context/ToastContext';
import './RightPanel.scss';

const SUGGESTED_CREATORS = [
  {
    username: 'elena_visuals',
    name: 'Elena Vance',
    role: 'Editorial Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    followers: '24.2k',
  },
  {
    username: 'marcus_raw',
    name: 'Marcus Chen',
    role: 'Street Photographer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    followers: '18.9k',
  },
  {
    username: 'clara_ambient',
    name: 'Clara Oswald',
    role: 'Motion & 3D Artist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    followers: '45.1k',
  },
  {
    username: 'dev_sorcery',
    name: 'Kenji Sato',
    role: 'Creative Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    followers: '31.6k',
  },
];

const TRENDING_TAGS = [
  { tag: '#MinimalistStudio', posts: '12.4k vibes' },
  { tag: '#TokyoNights', posts: '8.9k vibes' },
  { tag: '#EditorialAesthetic', posts: '19.2k vibes' },
  { tag: '#FilmPhotography', posts: '34.1k vibes' },
  { tag: '#CleanInterface', posts: '5.6k vibes' },
];

export const RightPanel = () => {
  const [followingMap, setFollowingMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const { handleFollow, handleUnfollow } = useUser();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const toggleFollow = async (username) => {
    const isCurrentlyFollowing = !!followingMap[username];
    // Optimistic toggle
    setFollowingMap((prev) => ({
      ...prev,
      [username]: !isCurrentlyFollowing,
    }));

    if (isCurrentlyFollowing) {
      const res = await handleUnfollow(username);
      if (res.success) {
        success(`Unfollowed @${username}`);
      } else {
        error(res.message);
        // revert
        setFollowingMap((prev) => ({ ...prev, [username]: true }));
      }
    } else {
      const res = await handleFollow(username);
      if (res.success) {
        success(`Now following @${username}`);
      } else {
        error(res.message);
        // revert
        setFollowingMap((prev) => ({ ...prev, [username]: false }));
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside className="vibe-right-panel">
      {/* Quick Search */}
      <form className="vibe-right-panel__search" onSubmit={handleSearchSubmit}>
        <Search size={16} className="vibe-right-panel__search-icon" />
        <input
          type="text"
          placeholder="Search creators & vibes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
        />
      </form>

      {/* Suggested Creators */}
      <div className="vibe-right-panel__card">
        <div className="vibe-right-panel__card-header">
          <h4 className="vibe-right-panel__title">Featured Creators</h4>
          <NavLink to="/explore" className="vibe-right-panel__see-all">
            See All
          </NavLink>
        </div>

        <div className="vibe-right-panel__creators">
          {SUGGESTED_CREATORS.map((c) => {
            const isFollowing = !!followingMap[c.username];
            return (
              <div key={c.username} className="vibe-creator-row">
                <Avatar
                  src={c.avatar}
                  username={c.username}
                  size="sm"
                  hasStory
                />
                <div className="vibe-creator-row__details">
                  <span className="vibe-creator-row__name">@{c.username}</span>
                  <span className="vibe-creator-row__followers">
                    {c.followers} followers
                  </span>
                </div>
                <button
                  type="button"
                  className={`vibe-creator-row__follow-btn ${
                    isFollowing ? 'is-following' : ''
                  }`}
                  onClick={() => toggleFollow(c.username)}
                >
                  {isFollowing ? (
                    <>
                      <Check size={13} />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={13} />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="vibe-right-panel__card">
        <div className="vibe-right-panel__card-header">
          <div className="vibe-right-panel__title-with-icon">
            <TrendingUp size={16} className="vibe-right-panel__icon-accent" />
            <h4 className="vibe-right-panel__title">Trending Vibes</h4>
          </div>
        </div>

        <div className="vibe-right-panel__tags">
          {TRENDING_TAGS.map((item) => (
            <NavLink
              key={item.tag}
              to={`/explore?tag=${encodeURIComponent(item.tag)}`}
              className="vibe-tag-item"
            >
              <span className="vibe-tag-item__label">{item.tag}</span>
              <span className="vibe-tag-item__count">{item.posts}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Platform Info / Footer */}
      <div className="vibe-right-panel__footer">
        <p className="vibe-right-panel__copyright">
          &copy; {new Date().getFullYear()} VibeFeed Platform. Designed for creators.
        </p>
      </div>
    </aside>
  );
};

export default RightPanel;
