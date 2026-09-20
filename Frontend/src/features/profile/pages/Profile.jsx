import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Grid,
  Bookmark,
  Heart,
  Settings,
  Share2,
  Edit3,
  Check,
  UserPlus,
  PlusSquare,
  Sparkles,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import useAuth from '../../auth/hook/useAuth';
import usePost from '../../posts/hook/usePost';
import useUser from '../../users/hook/useUser';
import { useToast } from '../../../context/ToastContext';
import './Profile.scss';

export const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const { userPosts, handleGetUserPosts, setActivePost, setIsCreateOpen } = usePost();
  const { handleFollow, handleUnfollow } = useUser();
  const { success, error, info } = useToast();
  const navigate = useNavigate();

  const isOwnProfile = !username || username === currentUser?.username;
  const profileUsername = username || currentUser?.username || 'creator';

  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'liked'
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(128);

  useEffect(() => {
    if (isOwnProfile) {
      handleGetUserPosts();
    }
  }, [isOwnProfile, handleGetUserPosts]);

  const onToggleFollow = async () => {
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    setFollowerCount((prev) => (nextState ? prev + 1 : prev - 1));

    if (nextState) {
      const res = await handleFollow(profileUsername);
      if (res.success) {
        success(`Following @${profileUsername}`);
      } else {
        error(res.message);
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      }
    } else {
      const res = await handleUnfollow(profileUsername);
      if (res.success) {
        success(`Unfollowed @${profileUsername}`);
      } else {
        error(res.message);
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      }
    }
  };

  // Sample creator posts if user hasn't posted any yet
  const samplePosts = [
    {
      _id: 'p1',
      caption: 'Midnight architecture study in monochrome.',
      imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      likes: 42,
      comments: 6,
    },
    {
      _id: 'p2',
      caption: 'Neon contrasts and shadow lines.',
      imgUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
      likes: 89,
      comments: 14,
    },
    {
      _id: 'p3',
      caption: 'Geometric balance in urban living.',
      imgUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      likes: 130,
      comments: 21,
    },
  ];

  const displayedPosts =
    userPosts && userPosts.length > 0 ? userPosts : samplePosts;

  return (
    <div className="vibe-profile-page">
      {/* Creator Profile Header */}
      <header className="vibe-profile-header">
        <div className="vibe-profile-header__top">
          <Avatar
            src={currentUser?.profile_image}
            username={profileUsername}
            size="xl"
            hasStory
            isOnline
          />

          <div className="vibe-profile-header__info">
            <div className="vibe-profile-header__handle-row">
              <h2 className="vibe-profile-header__username">@{profileUsername}</h2>
              <span className="vibe-profile-header__badge">
                <Sparkles size={12} /> Creator
              </span>

              <div className="vibe-profile-header__actions">
                {isOwnProfile ? (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<Edit3 size={14} />}
                      onClick={() => info('Edit Profile settings')}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<PlusSquare size={14} />}
                      onClick={() => setIsCreateOpen(true)}
                    >
                      New Post
                    </Button>
                  </>
                ) : (
                  <Button
                    variant={isFollowing ? 'secondary' : 'primary'}
                    size="sm"
                    leftIcon={isFollowing ? <Check size={14} /> : <UserPlus size={14} />}
                    onClick={onToggleFollow}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Share profile"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    success('Profile link copied!');
                  }}
                >
                  <Share2 size={16} />
                </Button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="vibe-profile-header__stats">
              <div className="vibe-stat-item">
                <span className="vibe-stat-item__value">{displayedPosts.length}</span>
                <span className="vibe-stat-item__label">posts</span>
              </div>
              <div className="vibe-stat-item">
                <span className="vibe-stat-item__value">{followerCount}</span>
                <span className="vibe-stat-item__label">followers</span>
              </div>
              <div className="vibe-stat-item">
                <span className="vibe-stat-item__value">94</span>
                <span className="vibe-stat-item__label">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="vibe-profile-header__bio">
              <p className="vibe-profile-header__bio-name">
                {currentUser?.bio ? profileUsername : `${profileUsername} • Creative Studio`}
              </p>
              <p className="vibe-profile-header__bio-text">
                {currentUser?.bio || 'Documenting light, brutalist architecture, and digital interfaces. Tokyo & Worldwide.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="vibe-profile-tabs">
        <button
          type="button"
          className={`vibe-profile-tab ${activeTab === 'posts' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={16} />
          <span>Vibes</span>
        </button>
        <button
          type="button"
          className={`vibe-profile-tab ${activeTab === 'saved' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={16} />
          <span>Saved</span>
        </button>
        <button
          type="button"
          className={`vibe-profile-tab ${activeTab === 'liked' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          <Heart size={16} />
          <span>Liked</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="vibe-profile-grid">
        {activeTab === 'posts' ? (
          displayedPosts.map((post) => (
            <div
              key={post._id || Math.random()}
              className="vibe-profile-grid__item"
              onClick={() => setActivePost(post)}
            >
              <img
                src={post.imgUrl || post.image}
                alt={post.caption || 'User post'}
                loading="lazy"
              />
              <div className="vibe-profile-grid__overlay">
                <div className="vibe-profile-grid__stat">
                  <Heart size={18} fill="#ffffff" />
                  <span>{post.likes || 32}</span>
                </div>
                <div className="vibe-profile-grid__stat">
                  <Bookmark size={18} />
                  <span>{post.comments || 5}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="vibe-profile-empty">
            <EmptyState
              icon={activeTab === 'saved' ? <Bookmark /> : <Heart />}
              title={activeTab === 'saved' ? 'No Saved Vibes' : 'No Liked Vibes Yet'}
              description={
                activeTab === 'saved'
                  ? 'Tap the bookmark icon on any post to save it for later inspiration.'
                  : 'Posts you like will appear here for easy reference.'
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
