import { createStore } from 'redux';
import rootReducer from '../states';

const configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState);
};

export default configureStore;
