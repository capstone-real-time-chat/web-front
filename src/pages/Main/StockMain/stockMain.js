import React, { useState, useEffect, useRef } from 'react';
import './stockMain.css';
import Chat from "./Chat/chatMain";
import Stock from "../Center/Stock/Stock";
import chatImg from '../../../img/chat.png';

function StockMain() {
  const [showChat, setShowChat] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // 웹소켓 연결 생성 (예시로 BINANCE:BTCUSDT 사용)
    const symbol = "BINANCE:BTCUSDT";
    const socket = new WebSocket(`ws://localhost:8000/ws/stocks?symbol=${symbol}`);
    wsRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("주식 데이터 웹소켓 연결됨");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.data && data.data.length > 0) {
          setStockData(data.data[0]);
        }
      } catch (error) {
        console.error("데이터 파싱 오류:", error);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("웹소켓 연결 종료");
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleChatClick = () => {
    setShowChat(true);
  };

  const handleChatClose = () => {
    setShowChat(false);
  };

  return (
    <div className="stock-main">
      {!showChat && (
        <img src={chatImg} alt="chat" className="chat-img" onClick={handleChatClick} style={{ cursor: "pointer" }}/>
      )}
      {showChat && <Chat onClose={handleChatClose}/>}
      {stockData && (
        <div className="stock-info">
          <h3>실시간 주식 정보</h3>
          <p>심볼: {stockData.s}</p>
          <p>가격: {stockData.p}</p>
          <p>거래량: {stockData.v}</p>
          <p>업데이트 시간: {new Date(stockData.t).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default StockMain;