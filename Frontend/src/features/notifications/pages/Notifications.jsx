import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Sparkles, CheckCheck, Bell } from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import { useToast } from '../../../context/ToastContext';
import './Notifications.scss';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'like',
    username: 'elena_visuals',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    message: 'liked your vibe "Golden hour minimalism in Kyoto"',
    time: '5m ago',
    unread: true,
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'n2',
    type: 'follow',
    username: 'marcus_raw',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    message: 'started following your creative journey',
    time: '42m ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'comment',
    username: 'clara_ambient',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    message: 'commented: "This lighting harmony is purely immaculate ✨"',
    time: '2h ago',
    unread: false,
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'n4',
    type: 'like',
    username: 'dev_sorcery',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    message: 'liked your vibe "Midnight architecture study in monochrome"',
    time: '1d ago',
    unread: false,
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&auto=format&fit=crop&q=80',
  },
];

export const Notifications = () => {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all' | 'like' | 'comment' | 'follow'
  const { success } = useToast();

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    success('Marked all as read');
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={12} fill="#f43f5e" color="#f43f5e" />;
      case 'comment':
        return <MessageCircle size={12} color="#818cf8" />;
      case 'follow':
        return <UserPlus size={12} color="#10b981" />;
      default:
        return <Sparkles size={12} />;
    }
  };

  return (
    <div className="vibe-notifications-page">
      <div className="vibe-notifications-header">
        <div>
          <h2>Activity Center</h2>
          <p>Updates from creators and interactions with your vibes</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<CheckCheck size={16} />}
          onClick={markAllRead}
        >
          Mark all read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="vibe-notifications-tabs">
        {[
          { id: 'all', label: 'All' },
          { id: 'like', label: 'Likes' },
          { id: 'comment', label: 'Comments' },
          { id: 'follow', label: 'Follows' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`vibe-notification-tab ${filter === tab.id ? 'is-active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Stream */}
      <div className="vibe-notifications-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((n) => (
            <div
              key={n.id}
              className={`vibe-notification-item ${n.unread ? 'is-unread' : ''}`}
            >
              <div className="vibe-notification-item__avatar-wrap">
                <Avatar src={n.avatar} username={n.username} size="md" />
                <span className={`vibe-notification-item__badge vibe-notification-item__badge--${n.type}`}>
                  {getBadgeIcon(n.type)}
                </span>
              </div>

              <div className="vibe-notification-item__content">
                <p className="vibe-notification-item__text">
                  <span className="vibe-notification-item__user">@{n.username}</span>{' '}
                  {n.message}
                </p>
                <span className="vibe-notification-item__time">{n.time}</span>
              </div>

              {n.thumbnail && (
                <div className="vibe-notification-item__thumb">
                  <img src={n.thumbnail} alt="Post preview" />
                </div>
              )}

              {n.unread && <span className="vibe-notification-item__dot" />}
            </div>
          ))
        ) : (
          <EmptyState
            icon={<Bell />}
            title="No Activity Yet"
            description="When people like your vibes, comment, or follow you, you will see notifications here."
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
