import { getCard } from '../../utils/api';

export const DRAW_CARD = 'DRAW_CARD';
export const RESET_GAME = 'RESET_GAME';
export const USE_DEFUSE = 'USE_DEFUSE';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';

export const drawCard = () => async (dispatch) => {
  try {
    const card = await getCard();
    dispatch({ type: DRAW_CARD, payload: card });
  } catch (error) {
    console.error('Error drawing card:', error);
  }
};

export const resetGame = () => ({
  type: RESET_GAME
});

export const useDefuse = () => ({
  type: USE_DEFUSE
});

export const shuffleDeck = () => ({
  type: SHUFFLE_DECK
});