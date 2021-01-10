import * as types from '../types/lists';

const initialState = {};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_LIST: {
        const { listId, listTitle } = action.value;
        return {
          ...state,
          [listId]: { _id: listId, title: listTitle, cards: [] }
        };
      }
      case types.CHANGE_LIST_TITLE: {
        const { listId, listTitle } = action.value;
        return {
          ...state,
          [listId]: { ...state[listId], title: listTitle }
        };
      }
      case types.DELETE_LIST: {
        const { listId } = action.value;
        const { [listId]: deletedList, ...restOfLists } = state;
        return restOfLists;
      }
      case types.ADD_CARD: {
        const { listId, cardId } = action.value;
        return {
          ...state,
          [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
        };
      }
      case types.MOVE_CARD: {
        const {
          oldCardIndex,
          newCardIndex,
          sourceListId,
          destListId
        } = action.value;
        // Move within the same list
        if (sourceListId === destListId) {
          const newCards = Array.from(state[sourceListId].cards);
          const [removedCard] = newCards.splice(oldCardIndex, 1);
          newCards.splice(newCardIndex, 0, removedCard);
          return {
            ...state,
            [sourceListId]: { ...state[sourceListId], cards: newCards }
          };
        }
        // Move card from one list to another
        const sourceCards = Array.from(state[sourceListId].cards);
        const [removedCard] = sourceCards.splice(oldCardIndex, 1);
        const destinationCards = Array.from(state[destListId].cards);
        destinationCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: sourceCards },
          [destListId]: { ...state[destListId], cards: destinationCards }
        };
      }
      case types.DELETE_CARD: {
        const { cardId: deletedCardId, listId } = action.value;
        const filterDeleted = cardId => cardId !== deletedCardId;
        return {
          ...state,
          [listId]: {
            ...state[listId],
            cards: state[listId].cards.filter(filterDeleted)
          }
        };
      }
      default:
        return state;
    }
};

  export default listsReducer;