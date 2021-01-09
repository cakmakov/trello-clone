import * as types from '../types/board';

const initialState = {
    lists: [],
};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_LIST: {
        const { listId } = action.payload;
        return { lists: [...state.lists, listId] };
      }
      case types.MOVE_LIST: {
        const { oldListIndex, newListIndex } = action.payload;
        const newLists = Array.from(state.lists);
        const [removedList] = newLists.splice(oldListIndex, 1);
        newLists.splice(newListIndex, 0, removedList);
        return { lists: newLists };
      }
      case types.DELETE_LIST: {
        const { listId } = action.payload;
        const filterDeleted = tmpListId => tmpListId !== listId;
        const newLists = state.lists.filter(filterDeleted);
        return { lists: newLists };
      }
      default:
        return state;
    }
};

  export default boardReducer;