import { 
  DRAW_CARD, 
  RESET_GAME, 
  USE_DEFUSE, 
  SHUFFLE_DECK 
} from '../actions/gameActions';

const initialState = {
  drawnCards: [],
  cardCount: 0,
  defuseCards: 0,
  gameStatus: 'NOT_STARTED', // 'NOT_STARTED', 'PLAYING', 'WON', 'LOST'
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAW_CARD:
      const newDrawnCards = [...state.drawnCards, action.payload];
      const isExplodingKitten = action.payload === '💣 Exploding Kitten Card';
      const isShuffleCard = action.payload === '🔀 Shuffle Card';
      const isDefuseCard = action.payload === '🙅‍♂️ Defuse Card';

      // Handle Shuffle Card - restart the game
      if (isShuffleCard) {
        return {
          ...initialState,
          gameStatus: 'PLAYING',
          defuseCards: state.defuseCards
        };
      }

      // Handle Defuse Card
      if (isDefuseCard) {
        return {
          ...state,
          drawnCards: newDrawnCards,
          cardCount: state.cardCount + 1,
          defuseCards: state.defuseCards + 1
        };
      }

      // Game win condition
      const gameStatus = newDrawnCards.length === 5 ? 'WON' : 
        (isExplodingKitten && state.defuseCards === 0 ? 'LOST' : 'PLAYING');

      return {
        ...state,
        drawnCards: newDrawnCards,
        cardCount: state.cardCount + 1,
        gameStatus,
        defuseCards: isExplodingKitten && state.defuseCards > 0 
          ? state.defuseCards - 1 
          : state.defuseCards
      };
    case RESET_GAME:
      return initialState;
    case USE_DEFUSE:
      return { ...state, defuseCards: state.defuseCards + 1 };
    case SHUFFLE_DECK:
      return {
        ...initialState,
        gameStatus: 'PLAYING',
        defuseCards: state.defuseCards
      };
    default:
      return state;
  }
};

export default gameReducer;