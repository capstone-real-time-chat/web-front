import React, { useRef, useState } from 'react';
import './chatInput.css';

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="chat-input">
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder="메시지를 입력하세요" 
          className="chat-textbox"
          rows="1"
          ref={textareaRef}
          onInput={handleInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-button">전송</button>
      </form>
    </div>
  );
}

export default ChatInput;