import React, { useState } from "react";
import axios from "axios";

const Game = () => {
  const [card, setCard] = useState(null);

  const drawCard = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get-card");
      setCard(response.data.card);

      if (response.data.card === "💣 Exploding Kitten Card") {
        alert("You lost the game!");
      }
      if (response.data.card === "🔀 Shuffle Card") {
        alert("Deck shuffled!");
      }
    } catch (error) {
      console.error("Error drawing a card", error);
    }
  };

  const winGame = async () => {
    const username = localStorage.getItem("username");
    try {
      await axios.post(`http://localhost:8081/api/update-score?username=${username}`);
      alert("You won! Your score has been updated.");
    } catch (error) {
      console.error("Error updating score", error);
    }
  };

  return (
    <div>
      <h2>Game in Progress</h2>
      <button onClick={drawCard}>Draw a Card</button>
      {card && <div className="card">{card}</div>}
      <button onClick={winGame}>End Game</button>
    </div>
  );
};

export default Game;
