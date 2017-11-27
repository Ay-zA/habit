import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { todosReducer, todosSagas } from './todos';

export const rootReducer = combineReducers({
  todoState: todosReducer
});

// FIXME: HMR notworking with sagas see: https://github.com/redux-saga/redux-saga/issues/22
export const rootSaga = function* () {
  yield all([...Object.values(todosSagas)].map(fork));
};
