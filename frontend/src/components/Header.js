import React from "react";
import { Link } from "react-router-dom";
// import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>Card Game</h1>
      <nav>
        <Link to="/">Start Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
    </div>
  );
};

export default Header;
