import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartGame from "./components/StartGame";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
