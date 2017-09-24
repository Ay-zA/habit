import { combineReducers } from 'redux';
import todos from './todo.redux';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;
