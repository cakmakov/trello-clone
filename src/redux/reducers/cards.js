import * as types from '../types/cards';

const initialState = {};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_CARD: {
        const { cardText, cardId } = action.value;
        return { ...state, [cardId]: { text: cardText, _id: cardId } };
      }
      case types.CHANGE_CARD_TEXT: {
        const { cardText, cardId } = action.value;
        return { ...state, [cardId]: { ...state[cardId], text: cardText } };
      }
      case types.DELETE_CARD: {
        const { cardId } = action.value;
        const { [cardId]: deletedCard, ...restOfCards } = state;
        return restOfCards;
      }
      case types.DELETE_LIST: {
        const { cards: cardIds } = action.value;
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