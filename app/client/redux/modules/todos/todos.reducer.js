import { actionTypes } from './todos.actions';

const initialState = {
  todos: [],
  isFetching: false
};

const todoReducer = (state = undefined, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO_SUCCESS:
      return {
        ...action.todo,
        isCompleted: false
      };

    case actionTypes.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        isCompleted: !state.isCompleted
      };

    default:
      return state;
  }
};

const todosReducer = (state = initialState, action) => {
  let index;

  switch (action.type) {
    case actionTypes.REQUEST_ADD_TODO:
    case actionTypes.REQUEST_REMOVE_TODO:
    case actionTypes.REQUEST_TOGGLE_TODO:
    case actionTypes.REQUEST_GET_TODOS:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        isFetching: false
      };

    case actionTypes.ADD_TODO_SUCCESS:
      return action.todo !== undefined
        ? {
          ...state,
          todos: [...state.todos, todoReducer(undefined, action)],
          isFetching: false
        }
        : state;

    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        isFetching: false
      };

    case actionTypes.REMOVE_TODO_SUCCESS:
      index = state.todos.findIndex(todo => todo._id === action._id);
      if (index < 0) return state;
      return {
        ...state,
        todos: [...state.todos.slice(0, index), ...state.todos.slice(index + 1)],
        isFetching: false
      };

    case actionTypes.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id !== action._id) return todo;
          return todoReducer(todo, action);
        }),
        isFetching: false
      };

    default:
      return state;
  }
};

export default todosReducer;
