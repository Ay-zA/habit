import * as actionTypes from 'constants/actionTypes';

export function createTodo(todo) {
  return { type: actionTypes.CREATE_TODO, todo };
}

export function removeTodo(todo) {
  return { type: actionTypes.REMOVE_TODO, id: todo._id };
}

export function getTodosSuccess(todos) {
  return { type: actionTypes.GET_TODOS_SUCCESS, todos };
}

export function getTodos() {
  return function(dispatch) {
    return fetch('api/todos', { method: 'GET' }).then(res => res.json()).then(todos => { dispatch(getTodosSuccess(todos.todos)); }).catch(err => { throw err; });
  };
}
