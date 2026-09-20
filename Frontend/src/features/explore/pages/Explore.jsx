import React, { useState } from 'react';
import { Search, Sparkles, UserPlus, Check, TrendingUp, Grid, Compass } from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import usePost from '../../posts/hook/usePost';
import useUser from '../../users/hook/useUser';
import { useToast } from '../../../context/ToastContext';
import './Explore.scss';

const EXPLORE_CREATORS = [
  {
    username: 'mona_minimal',
    name: 'Mona K.',
    bio: 'Architectural geometry & interior calm',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    followers: '52.3k',
  },
  {
    username: 'kenzo_street',
    name: 'Kenzo T.',
    bio: 'High contrast urban nightscapes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    followers: '38.1k',
  },
  {
    username: 'sylvia_render',
    name: 'Sylvia V.',
    bio: 'Digital artist & creative director',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    followers: '76.8k',
  },
];

const EXPLORE_MEDIA = [
  {
    id: 'e1',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    caption: 'Silicon textures and circuits in macro photography.',
    tag: '#CyberVisuals',
    likes: 312,
  },
  {
    id: 'e2',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    caption: 'Pure serenity at sunrise in the temple courtyard.',
    tag: '#KyotoVibes',
    likes: 540,
  },
  {
    id: 'e3',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
    caption: 'Minimalist mountain peak through foggy dawn.',
    tag: '#NordicVibe',
    likes: 810,
  },
  {
    id: 'e4',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    caption: 'Architectural symmetry in Scandinavian concrete.',
    tag: '#Architecture',
    likes: 420,
  },
  {
    id: 'e5',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
    caption: 'Vivid color spectrum over nocturnal highways.',
    tag: '#NightDrive',
    likes: 672,
  },
  {
    id: 'e6',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    caption: 'Clean athletic aesthetic and crimson tones.',
    tag: '#ProductDesign',
    likes: 290,
  },
];

export const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [followingMap, setFollowingMap] = useState({});

  const { setActivePost } = usePost();
  const { handleFollow, handleUnfollow } = useUser();
  const { success, error } = useToast();

  const toggleFollow = async (username) => {
    const isCurrentlyFollowing = !!followingMap[username];
    setFollowingMap((prev) => ({ ...prev, [username]: !isCurrentlyFollowing }));

    if (isCurrentlyFollowing) {
      const res = await handleUnfollow(username);
      if (res.success) success(`Unfollowed @${username}`);
      else {
        error(res.message);
        setFollowingMap((prev) => ({ ...prev, [username]: true }));
      }
    } else {
      const res = await handleFollow(username);
      if (res.success) success(`Now following @${username}`);
      else {
        error(res.message);
        setFollowingMap((prev) => ({ ...prev, [username]: false }));
      }
    }
  };

  const filteredMedia = EXPLORE_MEDIA.filter((m) => {
    if (!searchTerm) return true;
    return (
      m.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="vibe-explore-page">
      {/* Search Header */}
      <div className="vibe-explore-search">
        <Search size={18} className="vibe-explore-search__icon" />
        <input
          type="text"
          placeholder="Search by keyword, visual style, or #tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="vibe-explore-search__clear"
            onClick={() => setSearchTerm('')}
          >
            &times;
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="vibe-explore-filters">
        {['All', 'Trending', 'Visuals', 'Creators', 'Architecture', 'Motion'].map((tag) => (
          <button
            key={tag}
            type="button"
            className={`vibe-explore-filter-chip ${activeFilter === tag ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Discover Creators Section */}
      <section className="vibe-explore-creators-sec">
        <div className="vibe-explore-creators-sec__header">
          <Sparkles size={16} className="vibe-explore-creators-sec__icon" />
          <h3>Rising Creators</h3>
        </div>

        <div className="vibe-explore-creators-grid">
          {EXPLORE_CREATORS.map((c) => {
            const isFollowing = !!followingMap[c.username];
            return (
              <div key={c.username} className="vibe-explore-creator-card">
                <Avatar src={c.avatar} username={c.username} size="lg" hasStory />
                <span className="vibe-explore-creator-card__name">@{c.username}</span>
                <p className="vibe-explore-creator-card__bio">{c.bio}</p>
                <button
                  type="button"
                  className={`vibe-explore-creator-card__btn ${isFollowing ? 'is-following' : ''}`}
                  onClick={() => toggleFollow(c.username)}
                >
                  {isFollowing ? (
                    <>
                      <Check size={13} /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={13} /> Follow
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Discovery Visual Grid */}
      <section className="vibe-explore-media-sec">
        <div className="vibe-explore-media-sec__header">
          <TrendingUp size={16} className="vibe-explore-creators-sec__icon" />
          <h3>Explore Vibes</h3>
        </div>

        <div className="vibe-explore-masonry">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="vibe-explore-card"
              onClick={() =>
                setActivePost({
                  _id: item.id,
                  imgUrl: item.url,
                  caption: item.caption,
                  user: { username: 'creator_collective' },
                })
              }
            >
              <img src={item.url} alt={item.caption} loading="lazy" />
              <div className="vibe-explore-card__badge">{item.tag}</div>
              <div className="vibe-explore-card__info">
                <p className="vibe-explore-card__caption">{item.caption}</p>
                <span className="vibe-explore-card__likes">♥ {item.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
