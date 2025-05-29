import Main from "./pages/Main/Main";
import Center from "./pages/Main/Center/Center";
import LeftBar from "./components/leftBar/leftBar";
import TopBar from "./components/topBar/topBar";
import Login from "./pages/Login/Login/Login";
import Search from "./components/leftBar/Search/Search";
import SignUp from "./pages/Login/Signup/SignUp";
import StockMain from "./pages/Main/StockMain/stockMain";
import React, { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCenter, setShowCenter] = useState(true);
  const [showStockMain, setShowStockMain] = useState(false);

  const handleAccountClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Login 표시 시 SignUp 닫기
    setShowCenter(false); // Center 숨기기
    setShowStockMain(false);
  };
  const handleMenuClick = () => {
    setShowSearch(!showSearch); // showSearch 상태를 토글
  };
  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false); // SignUp 표시 시 Login 닫기
    setShowStockMain(false);
  };
  const handleHomeClick = () => {
    setShowLogin(false);
    setShowSearch(false);
    setShowSignUp(false);
    setShowStockMain(false);
    setShowCenter(true); // Center 다시 보이게
  };

  const handleStockClick = () => {
    setShowCenter(false);
    setShowLogin(false);
    setShowSearch(false);
    setShowSignUp(false);
    setShowStockMain(true);
  }
  
  return (
    <div className="main-screen">
      <Main />
      <Center onClickStock={handleStockClick} isVisible={showCenter}/>
      {showStockMain && <StockMain />}
      {showSignUp && <SignUp />}
      {showLogin && <Login onClickSignUp={handleSignUpClick}/>}
      <TopBar onClickHome={handleHomeClick}/>
      <Search isVisible={showSearch} />
      <LeftBar onClickAccount={handleAccountClick} onClickMenu={handleMenuClick}/>
    </div>
  );
}

export default App;