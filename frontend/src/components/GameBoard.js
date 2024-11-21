import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawCard, resetGame, shuffleDeck } from '../redux/actions/gameActions';
import { updateScore } from '../utils/api';
import Card from './Card';
import Leaderboard from './Leaderboard';
import '../styles/GameBoard.css';

const GameBoard = ({ username }) => {
  const dispatch = useDispatch();
  const { drawnCards, cardCount, gameStatus } = useSelector(state => state.game);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (gameStatus === 'WON') {
      updateScore(username);
    }
  }, [gameStatus, username]);

  const handleDrawCard = () => {
    if (gameStatus === 'NOT_STARTED') {
      dispatch(drawCard());
    } else if (gameStatus === 'PLAYING') {
      dispatch(drawCard());
    }
  };

  const resetGameHandler = () => {
    dispatch(resetGame());
  };

  const shuffleDeckHandler = () => {
    dispatch(shuffleDeck());
  };

  return (
    <div className="game-board">
      <h1>Exploding Kittens</h1>
      <div className="game-status">
        {gameStatus === 'NOT_STARTED' && <p>Start your game!</p>}
        {gameStatus === 'PLAYING' && <p>Cards drawn: {cardCount}/5</p>}
        {gameStatus === 'WON' && <p>Congratulations! You won!</p>}
        {gameStatus === 'LOST' && <p>Game Over! Exploding Kitten got you!</p>}
      </div>

      <div className="card-container">
        {drawnCards.map((card, index) => (
          <Card key={index} type={card} />
        ))}
      </div>

      <div className="game-controls">
        <button 
          onClick={handleDrawCard} 
          disabled={gameStatus === 'WON' || gameStatus === 'LOST'}
        >
          Draw Card
        </button>
        <button onClick={resetGameHandler}>Reset Game</button>
        <button onClick={shuffleDeckHandler}>Shuffle Deck</button>
        <button onClick={() => setShowLeaderboard(!showLeaderboard)}>
          {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
        </button>
      </div>

      {showLeaderboard && <Leaderboard />}
    </div>
  );
};

export default GameBoard;