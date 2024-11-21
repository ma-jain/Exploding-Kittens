import React, { useState } from 'react';
// import './Game.css';

const Game = ({ username }) => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState(null);

  const endGame = async () => {
    setIsGameOver(true);
    try {
      const response = await fetch(`http://localhost:8081/api/update-score?username=${username}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update score');
      }

      const data = await response.json();
      setMessage(data.message); // Display success message
    } catch (err) {
      setMessage(err.message);
      console.error('Error submitting score:', err);
    }
  };

  return (
    <div className="game-container">
      <h1>Game</h1>
      <p>Score: {score}</p>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {!isGameOver ? (
        <button onClick={() => setScore(score + 10)}>Increase Score</button>
      ) : (
        <button disabled>Game Over</button>
      )}
      <button onClick={endGame}>End Game</button>
    </div>
  );
};

export default Game;
