import { combineReducers, createStore } from "redux";
import boardReducer from './reducers/board';
import listsReducer from './reducers/lists';
import cardsReducer from './reducers/cards';

const rootReducer = combineReducers({
    board: boardReducer,
    lists: listsReducer,
    cards: cardsReducer
});

const configureStore = () => {
  return createStore(
      rootReducer
  );
};

export default configureStore;