import { actionTypes } from './todos.actions';

const todoReducer = (state = undefined, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO_SUCCESS:
      return { ...action.todo, isCompleted: false };
    case actionTypes.TOGGLE_TODO_SUCCESS:
      return { ...state, isCompleted: !state.isCompleted };
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  let index;
  switch (action.type) {
    case actionTypes.GET_TODOS_SUCCESS:
      return action.todos;
    case actionTypes.ADD_TODO_SUCCESS:
      return action.todo !== undefined ? [...state, todoReducer(undefined, action)] : state;
    case actionTypes.ADD_TODO_FAILED:
      return state;
    case actionTypes.REMOVE_TODO_SUCCESS:
      index = state.findIndex(todo => todo._id === action._id);
      if (index < 0) return state;
      return [...state.slice(0, index), ...state.slice(index + 1)];
    case actionTypes.TOGGLE_TODO_SUCCESS:
      return state.map((todo) => {
        if (todo._id !== action._id) return todo;
        return todoReducer(todo, action);
      });
    default:
      return state;
  }
};

export default todosReducer;

// TODO:20 0 0 0 0 Add updateTodo
// updateTodos(list, updated) {
//   const updatedIndex = list.findIndex(item => item._id === updated._id);
//   return [
//     ...list.slice(0, updatedIndex),
//     updated,
//     ...list.slice(updatedIndex + 1)
//   ];
// }
