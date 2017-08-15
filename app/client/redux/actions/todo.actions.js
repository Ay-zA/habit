import * as actionTypes from 'constants/actionTypes';

export function createTodoSuccess(todo) {
  return { type: actionTypes.CREATE_TODO, todo };
}

export function removeTodoSuccess(todo) {
  return { type: actionTypes.REMOVE_TODO, id: todo._id };
}

export function getTodosSuccess(todos) {
  return { type: actionTypes.GET_TODOS_SUCCESS, todos };
}

export function getTodos() {
  return function(dispatch) {
    return fetch('api/todos', { method: 'GET' })
      .then(res => res.json())
      .then(todos => { dispatch(getTodosSuccess(todos)); })
      .catch(err => { throw err; });
  };
}

export function removeTodo(todo) {
  return function(dispatch) {
    return fetch(`api/todos/${todo._id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(res => { dispatch(removeTodoSuccess(todo)); })
      .catch(err => { throw err; });
  };
}

export function createTodo(todo) {
  const body = JSON.stringify(todo);

  return function(dispatch) {
    return fetch('api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      .then(res => res.json())
      .then(res => { dispatch(createTodoSuccess(res)); })
      .catch(err => { throw err; });
  };
}
