import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../states';

const configureStore = (initialState = {}) => {
  const logger = createLogger();
  return createStore(rootReducer, initialState, applyMiddleware(logger));
};

export default configureStore;
