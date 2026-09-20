import React, { useEffect, useState } from 'react';
import { Sparkles, Image as ImageIcon, CheckCircle, RefreshCw, Compass } from 'lucide-react';
import usePost from '../hook/usePost';
import useAuth from '../../auth/hook/useAuth';
import PostCard from '../components/PostCard';
import Avatar from '../../../components/ui/Avatar';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import Button from '../../../components/ui/Button';
import '../style/feed.scss';

// Curated creator stories
const STORIES = [
  { id: 's1', username: 'your_story', name: 'Your Vibe', isUser: true },
  { id: 's2', username: 'elena_visuals', name: 'Elena Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 's3', username: 'marcus_raw', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 's4', username: 'clara_ambient', name: 'Clara Oswald', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: 's5', username: 'dev_sorcery', name: 'Kenji Sato', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 's6', username: 'sara_noir', name: 'Sara Jensen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
];

// Fallback high-fidelity sample posts when database has few or no posts
const STARTER_POSTS = [
  {
    _id: 'seed-1',
    user: {
      username: 'elena_visuals',
      profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    caption: 'Golden hour minimalism in Kyoto. Shadows speaking louder than words. #MinimalistStudio #KyotoVibes #EditorialAesthetic',
    imgUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80',
  },
  {
    _id: 'seed-2',
    user: {
      username: 'marcus_raw',
      profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    caption: '35mm grain under the neon rain. Late night street walk through Shinjuku. #TokyoNights #FilmPhotography #StreetLens',
    imgUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&auto=format&fit=crop&q=80',
  },
  {
    _id: 'seed-3',
    user: {
      username: 'clara_ambient',
      profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    caption: 'Exploring fluid dynamics and brutalist light rendering. New creative series dropping soon. #CleanInterface #CyberVisuals',
    imgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
  },
];

export const Feed = () => {
  const { user } = useAuth();
  const { feed, loading, handleGetFeed, setIsCreateOpen } = usePost();
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  useEffect(() => {
    handleGetFeed().finally(() => setHasAttemptedFetch(true));
  }, [handleGetFeed]);

  // Combine backend feed with starter posts if backend feed is empty
  const displayPosts = feed && feed.length > 0 ? feed : (hasAttemptedFetch ? STARTER_POSTS : []);

  return (
    <div className="vibe-feed-page">
      {/* Stories / Highlights Reel */}
      <section className="vibe-feed-stories">
        <div className="vibe-feed-stories__list">
          {STORIES.map((story) => (
            <div key={story.id} className="vibe-story-item">
              <Avatar
                src={story.isUser ? user?.profile_image : story.avatar}
                username={story.isUser ? (user?.username || 'You') : story.username}
                size="md"
                hasStory={!story.isUser}
              />
              <span className="vibe-story-item__name">
                {story.isUser ? 'Your Story' : story.username}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Create Prompt Bar */}
      <div className="vibe-feed-composer" onClick={() => setIsCreateOpen(true)}>
        <Avatar
          src={user?.profile_image}
          username={user?.username || 'you'}
          size="sm"
        />
        <div className="vibe-feed-composer__placeholder">
          Share a vibe or photo today...
        </div>
        <button
          type="button"
          className="vibe-feed-composer__btn"
          aria-label="Upload visual"
        >
          <ImageIcon size={18} />
          <span>Upload</span>
        </button>
      </div>

      {/* Feed Stream */}
      <div className="vibe-feed-stream">
        {loading && (!displayPosts || displayPosts.length === 0) ? (
          <>
            <Skeleton variant="post" />
            <Skeleton variant="post" />
          </>
        ) : displayPosts.length > 0 ? (
          <>
            {displayPosts.map((post) => (
              <PostCard key={post._id || Math.random()} post={post} />
            ))}

            {/* End of Feed Signal */}
            <div className="vibe-feed-caught-up">
              <CheckCircle size={24} className="vibe-feed-caught-up__icon" />
              <h4 className="vibe-feed-caught-up__title">You're All Caught Up</h4>
              <p className="vibe-feed-caught-up__desc">
                You've seen all recent vibes from creators you follow.
              </p>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw size={14} />}
                onClick={() => handleGetFeed()}
              >
                Refresh Feed
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Compass />}
            title="No Vibes In Your Feed Yet"
            description="Be the first to share an aesthetic moment, or explore and follow creators to populate your feed."
            actionLabel="Create First Vibe"
            onAction={() => setIsCreateOpen(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
