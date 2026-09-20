import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Send, X } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Avatar from '../../../components/ui/Avatar';
import usePost from '../hook/usePost';
import useAuth from '../../auth/hook/useAuth';
import { useToast } from '../../../context/ToastContext';
import './PostDetailModal.scss';

export const PostDetailModal = () => {
  const { activePost, setActivePost, handleLikePost } = usePost();
  const { user } = useAuth();
  const { success } = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(28);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: '1', user: 'elena_visuals', text: 'This lighting harmony is purely immaculate ✨' },
    { id: '2', user: 'marcus_raw', text: 'What lens was this captured on?' },
    { id: '3', user: 'clara_ambient', text: 'Such strong editorial mood.' },
  ]);

  if (!activePost) return null;

  const author = activePost?.user && typeof activePost.user === 'object' ? activePost.user : {};
  const authorUsername = author.username || 'creator';
  const authorAvatar =
    author.profile_image ||
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`;
  const postImage =
    activePost?.imgUrl ||
    activePost?.image ||
    `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80`;

  const onLike = async () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikesCount((c) => (next ? c + 1 : c - 1));
    if (activePost?._id) {
      await handleLikePost(activePost._id);
    }
  };

  const onAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: user?.username || 'you',
        text: commentText.trim(),
      },
    ]);
    setCommentText('');
    success('Comment posted');
  };

  return (
    <Modal
      isOpen={!!activePost}
      onClose={() => setActivePost(null)}
      size="xl"
      className="vibe-post-detail-modal"
      showClose={false}
    >
      <div className="vibe-post-detail">
        {/* Left Visual Column */}
        <div className="vibe-post-detail__visual">
          <img src={postImage} alt={activePost?.caption || 'Post image'} />
        </div>

        {/* Right Info & Comments Column */}
        <div className="vibe-post-detail__sidebar">
          {/* Header */}
          <div className="vibe-post-detail__header">
            <div className="vibe-post-detail__author">
              <Avatar
                src={authorAvatar}
                username={authorUsername}
                size="sm"
                hasStory
              />
              <div className="vibe-post-detail__author-text">
                <span className="vibe-post-detail__username">@{authorUsername}</span>
                <span className="vibe-post-detail__tag">Creator</span>
              </div>
            </div>

            <button
              type="button"
              className="vibe-post-detail__close"
              onClick={() => setActivePost(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Comments and Caption Scrollable Stream */}
          <div className="vibe-post-detail__stream">
            {activePost?.caption && (
              <div className="vibe-post-detail__caption-item">
                <Avatar
                  src={authorAvatar}
                  username={authorUsername}
                  size="xs"
                />
                <div className="vibe-post-detail__comment-body">
                  <span className="vibe-post-detail__comment-author">
                    @{authorUsername}
                  </span>
                  <span className="vibe-post-detail__comment-content">
                    {activePost.caption}
                  </span>
                </div>
              </div>
            )}

            {comments.map((c) => (
              <div key={c.id} className="vibe-post-detail__comment-item">
                <Avatar username={c.user} size="xs" />
                <div className="vibe-post-detail__comment-body">
                  <span className="vibe-post-detail__comment-author">
                    @{c.user}
                  </span>
                  <span className="vibe-post-detail__comment-content">
                    {c.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row & Like Count */}
          <div className="vibe-post-detail__actions-section">
            <div className="vibe-post-detail__action-buttons">
              <button
                type="button"
                className={`vibe-detail-btn ${isLiked ? 'is-liked' : ''}`}
                onClick={onLike}
              >
                <Heart
                  size={22}
                  fill={isLiked ? '#f43f5e' : 'none'}
                  color={isLiked ? '#f43f5e' : 'currentColor'}
                />
              </button>
              <button type="button" className="vibe-detail-btn">
                <MessageCircle size={22} />
              </button>
              <button type="button" className="vibe-detail-btn">
                <Share2 size={22} />
              </button>
              <button type="button" className="vibe-detail-btn ml-auto">
                <Bookmark size={22} />
              </button>
            </div>
            <span className="vibe-post-detail__likes-label">
              {likesCount} likes
            </span>
          </div>

          {/* Comment Form */}
          <form
            className="vibe-post-detail__comment-input"
            onSubmit={onAddComment}
          >
            <input
              type="text"
              placeholder="Add your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="vibe-post-detail__send-btn"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PostDetailModal;
