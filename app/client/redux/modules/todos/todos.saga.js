import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import TodosService from '-/services/todos.service';
import { actionTypes } from './todos.actions';

const todosService = new TodosService();

function* createTodoAsync(action) {
  try {
    const response = yield call(todosService.addTodo, action.todo);
    yield put({ type: actionTypes.ADD_TODO_SUCCESS, todo: response });
  } catch (error) {
    yield put({ type: actionTypes.REQUEST_FAILED, error });
  }
}

export function* watchCreateTodo() {
  yield takeEvery(actionTypes.REQUEST_ADD_TODO, createTodoAsync);
}

function* getTodosAsync() {
  try {
    const response = yield call(todosService.getTodos);
    yield put({ type: actionTypes.GET_TODOS_SUCCESS, todos: response });
  } catch (error) {
    yield put({ type: actionTypes.REQUEST_FAILED, error });
  }
}

export function* watchGetTodos() {
  yield takeLatest(actionTypes.REQUEST_GET_TODOS, getTodosAsync);
}

export function* removeTodoAsync(action) {
  try {
    yield call(todosService.removeTodo, action._id);
    yield put({ type: actionTypes.REMOVE_TODO_SUCCESS, _id: action._id });
  } catch (error) {
    yield put({ type: actionTypes.REQUEST_FAILED, error });
  }
}

export function* watchRemoveTodo() {
  yield takeEvery(actionTypes.REQUEST_REMOVE_TODO, removeTodoAsync);
}

export function* toggleTodoAsync(action) {
  try {
    yield call(todosService.toggleTodo, action._id);
    yield put({ type: actionTypes.TOGGLE_TODO_SUCCESS, _id: action._id });
  } catch (error) {
    yield put({ type: actionTypes.REQUEST_FAILED, error });
  }
}

export function* watchToggleTodo() {
  yield takeEvery(actionTypes.REQUEST_TOGGLE_TODO, toggleTodoAsync);
}
