import React, { useState } from 'react';
import { createUsername } from '../utils/api';
import '../styles/UsernameModal.css';

const UsernameModal = ({ onUsernameSet }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setError('Username cannot be empty');
      return;
    }

    // eslint-disable-next-line
    try { 
      // eslint-disable-next-line
      const response = await createUsername(username);
      onUsernameSet(username);
    } catch (error) {
      setError('Failed to create username');
      console.error('Username creation error:', error);
    }
  };

  return (
    <div className="username-modal">
      <div className="modal-content">
        <h2>Welcome to Exploding Kittens</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Start Game</button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;