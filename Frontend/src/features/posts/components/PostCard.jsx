import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Sparkles,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import usePost from '../hook/usePost';
import useAuth from '../../auth/hook/useAuth';
import { useToast } from '../../../context/ToastContext';
import './PostCard.scss';

export const PostCard = ({ post, onCommentClick }) => {
  const { user } = useAuth();
  const { handleLikePost, setActivePost } = usePost();
  const { success, info } = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    Math.floor(Math.random() * 45) + 8 // Initial realistic count if unseeded
  );
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      username: 'art_minimalist',
      text: 'The lighting composition here is simply stunning.',
    },
  ]);

  // Post author info (safely extract whether populated or plain id)
  const author = post?.user && typeof post.user === 'object' ? post.user : {};
  const authorUsername = author.username || 'creator';
  const authorAvatar =
    author.profile_image ||
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`;
  const postImage =
    post?.imgUrl ||
    post?.image ||
    `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80`;

  // Like interaction
  const triggerLike = async () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    if (post?._id) {
      await handleLikePost(post._id);
    }
  };

  // Double tap to like on image
  const handleDoubleTap = () => {
    if (!isLiked) {
      triggerLike();
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 900);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/#post-${post?._id || ''}`);
      success('Link copied to clipboard!');
    } else {
      info('Post link ready to share');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      success('Saved to your collection');
    } else {
      info('Removed from collection');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        username: user?.username || 'you',
        text: commentInput.trim(),
      },
    ]);
    setCommentInput('');
    success('Comment added');
  };

  // Format caption with styled hashtags
  const renderCaption = (text) => {
    if (!text) return null;
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="vibe-post-card__hashtag">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="vibe-post-card">
      {/* Header */}
      <header className="vibe-post-card__header">
        <div className="vibe-post-card__author">
          <Avatar
            src={authorAvatar}
            username={authorUsername}
            size="sm"
            hasStory
          />
          <div className="vibe-post-card__author-info">
            <span className="vibe-post-card__username">@{authorUsername}</span>
            <span className="vibe-post-card__timestamp">Recently posted</span>
          </div>
        </div>

        <button
          type="button"
          className="vibe-post-card__options"
          aria-label="More options"
          onClick={() => info('Post options')}
        >
          <MoreHorizontal size={18} />
        </button>
      </header>

      {/* Media Image with Double Tap */}
      <div
        className="vibe-post-card__media"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={postImage}
          alt={post?.caption || 'Post visual'}
          loading="lazy"
          className="vibe-post-card__img"
        />

        {/* Heart Burst Pop Animation */}
        {showHeartAnim && (
          <div className="vibe-post-card__heart-burst">
            <Heart size={80} fill="#f43f5e" color="#f43f5e" />
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="vibe-post-card__actions">
        <div className="vibe-post-card__actions-left">
          <button
            type="button"
            className={`vibe-post-card__action-btn ${isLiked ? 'is-liked' : ''}`}
            onClick={triggerLike}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              size={22}
              fill={isLiked ? '#f43f5e' : 'none'}
              color={isLiked ? '#f43f5e' : 'currentColor'}
            />
          </button>

          <button
            type="button"
            className="vibe-post-card__action-btn"
            onClick={() => {
              setActivePost(post);
              if (onCommentClick) onCommentClick(post);
            }}
            aria-label="Comment"
          >
            <MessageCircle size={22} />
          </button>

          <button
            type="button"
            className="vibe-post-card__action-btn"
            onClick={handleShare}
            aria-label="Share"
          >
            <Share2 size={22} />
          </button>
        </div>

        <button
          type="button"
          className={`vibe-post-card__action-btn ${isSaved ? 'is-saved' : ''}`}
          onClick={handleSave}
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          <Bookmark
            size={22}
            fill={isSaved ? '#f43f5e' : 'none'}
            color={isSaved ? '#f43f5e' : 'currentColor'}
          />
        </button>
      </div>

      {/* Likes Count */}
      <div className="vibe-post-card__likes">
        <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
      </div>

      {/* Caption */}
      {post?.caption && (
        <div className="vibe-post-card__caption-wrap">
          <span className="vibe-post-card__caption-author">
            @{authorUsername}
          </span>
          <span className="vibe-post-card__caption-text">
            {renderCaption(post.caption)}
          </span>
        </div>
      )}

      {/* Inline Comments Preview */}
      {comments.length > 0 && (
        <div className="vibe-post-card__comments-preview">
          {comments.slice(-2).map((c) => (
            <div key={c.id} className="vibe-post-card__comment-line">
              <span className="vibe-post-card__comment-user">@{c.username}</span>
              <span className="vibe-post-card__comment-text">{c.text}</span>
            </div>
          ))}

          {comments.length > 2 && (
            <button
              type="button"
              className="vibe-post-card__view-all-comments"
              onClick={() => {
                setActivePost(post);
                if (onCommentClick) onCommentClick(post);
              }}
            >
              View all {comments.length} comments
            </button>
          )}
        </div>
      )}

      {/* Comment Input */}
      <form
        className="vibe-post-card__comment-form"
        onSubmit={handleAddComment}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          aria-label="Add comment"
        />
        <button
          type="submit"
          disabled={!commentInput.trim()}
          className="vibe-post-card__comment-submit"
          aria-label="Post comment"
        >
          <Send size={16} />
        </button>
      </form>
    </article>
  );
};

export default PostCard;
