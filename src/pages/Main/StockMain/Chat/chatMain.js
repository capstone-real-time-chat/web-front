import React, { useState, useEffect, useRef } from 'react';
import './chatMain.css';
import ChatInput from './chatInput';

function ChatMain({ onClose, symbol }) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // 웹소켓 연결 생성
    const socket = new WebSocket(`ws://localhost:8000/ws/chat?symbol=${symbol}`);
    wsRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("채팅 서버에 연결되었습니다!");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prevMessages => [...prevMessages, {
          id: Date.now(),
          username: data.username || '익명',
          message: data.message,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("채팅 서버 연결이 종료되었습니다.");
    };

    socket.onerror = (error) => {
      console.error("웹소켓 오류:", error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbol]);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "chat_message",
        message: message,
        username: "사용자" // TODO: 실제 사용자 이름으로 변경 필요
      }));
    }
  };

  return (
    <div className="chat-main">
      <button className="chat-close" onClick={onClose}>×</button>
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <span className="message-username">{msg.username}</span>
            <span className="message-time">{msg.timestamp}</span>
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatMain;