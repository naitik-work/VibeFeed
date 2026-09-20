import React, { useState } from 'react';
import { Send, ArrowLeft, MoreVertical, Phone, Video, Search, MessageSquare } from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import useAuth from '../../auth/hook/useAuth';
import './Messages.scss';

const CONVERSATIONS = [
  {
    id: 'c1',
    user: {
      username: 'elena_visuals',
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      isOnline: true,
    },
    lastMessage: 'Love the grading in your latest visual series!',
    time: '12:30 PM',
    unread: 1,
    messages: [
      { id: 'm1', sender: 'elena_visuals', text: 'Hey! Loved your latest post from Kyoto.', time: '12:28 PM' },
      { id: 'm2', sender: 'you', text: 'Thank you Elena! Captured on an old 35mm lens.', time: '12:29 PM' },
      { id: 'm3', sender: 'elena_visuals', text: 'Love the grading in your latest visual series!', time: '12:30 PM' },
    ],
  },
  {
    id: 'c2',
    user: {
      username: 'marcus_raw',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      isOnline: false,
    },
    lastMessage: 'Are you joining the Tokyo photo walk tomorrow?',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm4', sender: 'marcus_raw', text: 'Are you joining the Tokyo photo walk tomorrow?', time: 'Yesterday' },
    ],
  },
  {
    id: 'c3',
    user: {
      username: 'clara_ambient',
      name: 'Clara Oswald',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      isOnline: true,
    },
    lastMessage: 'Sending over the 3D assets in a bit.',
    time: '2d ago',
    unread: 0,
    messages: [
      { id: 'm5', sender: 'clara_ambient', text: 'Sending over the 3D assets in a bit.', time: '2d ago' },
    ],
  },
];

export const Messages = () => {
  const { user: currentUser } = useAuth();
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeId, setActiveId] = useState('c1');
  const [inputText, setInputText] = useState('');
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const activeChat = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'you',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeId) {
          return {
            ...conv,
            lastMessage: newMessage.text,
            time: 'Just now',
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );

    setInputText('');
  };

  return (
    <div className={`vibe-messages-page ${mobileThreadOpen ? 'mobile-thread-active' : ''}`}>
      {/* Conversations List Panel */}
      <div className="vibe-messages-sidebar">
        <div className="vibe-messages-sidebar__header">
          <h3>Messages</h3>
        </div>

        <div className="vibe-messages-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`vibe-conv-item ${conv.id === activeId ? 'is-active' : ''}`}
              onClick={() => {
                setActiveId(conv.id);
                setMobileThreadOpen(true);
              }}
            >
              <Avatar
                src={conv.user.avatar}
                username={conv.user.username}
                size="md"
                isOnline={conv.user.isOnline}
              />
              <div className="vibe-conv-item__content">
                <div className="vibe-conv-item__top">
                  <span className="vibe-conv-item__name">@{conv.user.username}</span>
                  <span className="vibe-conv-item__time">{conv.time}</span>
                </div>
                <p className="vibe-conv-item__last-msg">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="vibe-conv-item__unread-badge">{conv.unread}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Conversation Chat Window */}
      <div className="vibe-messages-chat">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="vibe-chat-header">
              <button
                type="button"
                className="vibe-chat-header__back"
                onClick={() => setMobileThreadOpen(false)}
                aria-label="Back to messages"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="vibe-chat-header__user">
                <Avatar
                  src={activeChat.user.avatar}
                  username={activeChat.user.username}
                  size="sm"
                  isOnline={activeChat.user.isOnline}
                />
                <div className="vibe-chat-header__names">
                  <span className="vibe-chat-header__username">
                    @{activeChat.user.username}
                  </span>
                  <span className="vibe-chat-header__status">
                    {activeChat.user.isOnline ? 'Active now' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="vibe-chat-header__actions">
                <button type="button" className="vibe-chat-btn">
                  <Phone size={18} />
                </button>
                <button type="button" className="vibe-chat-btn">
                  <Video size={18} />
                </button>
                <button type="button" className="vibe-chat-btn">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Message Stream */}
            <div className="vibe-chat-stream">
              {activeChat.messages.map((m) => {
                const isMe = m.sender === 'you';
                return (
                  <div
                    key={m.id}
                    className={`vibe-msg-row ${isMe ? 'is-me' : 'is-other'}`}
                  >
                    {!isMe && (
                      <Avatar
                        src={activeChat.user.avatar}
                        username={activeChat.user.username}
                        size="xs"
                      />
                    )}
                    <div className="vibe-msg-bubble">
                      <p className="vibe-msg-bubble__text">{m.text}</p>
                      <span className="vibe-msg-bubble__time">{m.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form className="vibe-chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder={`Message @${activeChat.user.username}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="vibe-chat-input__send"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        ) : (
          <div className="vibe-chat-empty">
            <MessageSquare size={48} />
            <h4>Select a Conversation</h4>
            <p>Choose an existing thread or start a direct message with a creator.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
