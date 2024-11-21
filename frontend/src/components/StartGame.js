import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StartGame = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8081/api/username?username=${username}`);
      alert(response.data.message);
      localStorage.setItem("username", username);
      navigate("/game");
    } catch (error) {
      console.error("Error starting the game", error);
    }
  };

  return (
    <div>
      <h2>Welcome to the Card Game</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default StartGame;
