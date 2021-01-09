import * as types from '../types/cards';

const initialState = {};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_CARD: {
        const { cardText, cardId } = action.payload;
        return { ...state, [cardId]: { text: cardText, _id: cardId } };
      }
      case types.CHANGE_CARD_TEXT: {
        const { cardText, cardId } = action.payload;
        return { ...state, [cardId]: { ...state[cardId], text: cardText } };
      }
      case types.DELETE_CARD: {
        const { cardId } = action.payload;
        const { [cardId]: deletedCard, ...restOfCards } = state;
        return restOfCards;
      }
      // Find every card from the deleted list and remove it
      case types.DELETE_LIST: {
        const { cards: cardIds } = action.payload;
        return Object.keys(state)
          .filter(cardId => !cardIds.includes(cardId))
          .reduce(
            (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
            {}
          );
      }
      default:
        return state;
    }
  };

  export default cardsReducer;