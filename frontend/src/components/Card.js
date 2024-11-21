import React from 'react';
import '../styles/Card.css';

const Card = ({ type }) => {
  const getCardClass = (cardType) => {
    switch (cardType) {
      case '💣 Exploding Kitten Card':
        return 'card exploding-kitten';
      case '🙅‍♂️ Defuse Card':
        return 'card defuse';
      case '🔀 Shuffle Card':
        return 'card shuffle';
      case '😼 Cat Card':
        return 'card cat';
      default:
        return 'card';
    }
  };

  return (
    <div className={getCardClass(type)}>
      <div className="card-content">
        <span className="card-emoji">
          {type.split(' ')[0]}
        </span>
        <p className="card-type">{type}</p>
      </div>
    </div>
  );
};

export default Card;