import { useState } from 'react';
import { conversations } from '../data/mockData';
import './Messages.css';

function Messages() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      setMessageInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="messages-page">
      {/* Left Panel — Conversations List */}
      <div className="conversations-panel">
        <div className="conversations-panel__header">
          <h2 className="conversations-panel__title">Messages</h2>
        </div>

        <div className="conversations-search">
          <svg className="conversations-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="conversations-search__input"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="conversations-list">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedId === conv.id ? 'conversation-item--active' : ''}`}
              onClick={() => setSelectedId(conv.id)}
            >
              <div className="conversation-item__avatar-wrapper">
                <div
                  className="conversation-item__avatar"
                  style={{ backgroundColor: conv.color }}
                >
                  {conv.name.charAt(0)}
                </div>
                {conv.online && <span className="online-dot" />}
              </div>

              <div className="conversation-item__content">
                <div className="conversation-item__top">
                  <span className="conversation-item__name">{conv.name}</span>
                  <span className="conversation-item__time">{conv.time}</span>
                </div>
                <p className="conversation-item__preview">{conv.lastMessage}</p>
              </div>

              {conv.unread > 0 && (
                <span className="unread-badge">{conv.unread}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Chat Thread */}
      <div className="chat-panel">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header__left">
                <div className="chat-header__avatar-wrapper">
                  <div
                    className="chat-header__avatar"
                    style={{ backgroundColor: selectedConversation.color }}
                  >
                    {selectedConversation.name.charAt(0)}
                  </div>
                  {selectedConversation.online && (
                    <span className="online-dot online-dot--header" />
                  )}
                </div>
                <div className="chat-header__info">
                  <span className="chat-header__name">
                    {selectedConversation.name}
                  </span>
                  <span className="chat-header__role">
                    {selectedConversation.role}
                    {selectedConversation.online && (
                      <span className="chat-header__status"> • Online</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="chat-header__actions">
                <button className="chat-header__btn" title="Phone call">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
                <button className="chat-header__btn" title="More options">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble ${msg.sender === 'me' ? 'message--sent' : 'message--received'}`}
                >
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="chat-input">
              <button className="chat-input__attachment" title="Attach file">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <input
                type="text"
                className="chat-input__field"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="chat-input__send"
                onClick={handleSend}
                disabled={!messageInput.trim()}
                title="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="chat-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6B7280' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
