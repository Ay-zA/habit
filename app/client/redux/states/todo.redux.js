const TYPES = {
  ADD_TODO: 'TODO/ADD_TODO',
  REMOVE_TODO: 'TODO/REMOVE_TODO',
  TOGGLE_TODO: 'TODO/TOGGLE_TODO'
};

export const todoReducer = (state = undefined, action) => {
  switch (action.type) {
    case TYPES.ADD_TODO:
      return { ...action.todo, completed: false };
    case TYPES.TOGGLE_TODO:
      return { ...action.todo, completed: action.todo.completed };
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_TODO:
      return [...state, todoReducer(undefined, action)];
    case TYPES.REMOVE_TODO:
      const removeIndex = state.findIndex(todo => todo._id === action.id);
      return [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)];
    case TYPES.TOGGLE_TODO:
      return state.map(todo => {
        if (todo._id !== action.todo._id) return todo;
        return todoReducer(todo, action);
      });
    default:
      return state;
  }
};

export const actions = {
  addTodo: todo => ({ type: TYPES.ADD_TODO, todo }),
  toggleTodo: todo => ({ type: TYPES.TOGGLE_TODO, todo }),
  removeTodo: id => ({ type: TYPES.REMOVE_TODO, id })
};

export default todosReducer;
