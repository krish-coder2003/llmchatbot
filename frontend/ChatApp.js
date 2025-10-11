// ChatApp.js (or App.js)

import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css'; // Import the CSS file
import ReactMarkdown from 'react-markdown'; // npm install react-markdown

function ChatApp() {
  const [input, setInput] = useState('');
  // message: { text: string, sender: 'user' | 'bot' }
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat box whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    // 1. Add user message to history and clear input
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Send request to the backend /chat endpoint
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // 3. Handle bot response or error
      if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { text: data.error || "Could not connect to AI service.", sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Frontend Fetch Error:', error);
      setMessages(prev => [...prev, { text: 'Connection failed. Check server status.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="app-container">
      <div className="chat-window">
        
        {/* Chat History */}
        <div className="message-history">
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              <div className="message-text">
                {/* Use ReactMarkdown to render formatted text from Gemini */}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="loading-indicator bot">
              <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chat-input"
            placeholder="Ask Gemini anything..."
            disabled={isLoading}
          />
          <button onClick={sendMessage} className="send-button" disabled={isLoading}>
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;