const TYPES = {
  ADD_TODO: 'TODO/ADD_TODO',
  REMOVE_TODO: 'TODO/REMOVE_TODO',
  TOGGLE_TODO: 'TODO/TOGGLE_TODO'
};

const todoReducer = (state = undefined, action) => {
  switch (action.type) {
    case TYPES.ADD_TODO:
      return { ...action.todo, isCompleted: false };
    case TYPES.TOGGLE_TODO:
      return { ...state, isCompleted: !state.isCompleted };
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  let index;
  switch (action.type) {
    case TYPES.ADD_TODO:
      return [...state, todoReducer(undefined, action)];
    case TYPES.REMOVE_TODO:
      index = state.findIndex(todo => todo._id === action._id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    case TYPES.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo._id !== action._id) return todo;
        return todoReducer(todo, action);
      });
    default:
      return state;
  }
};

export const actions = {
  addTodo: todo => ({ type: TYPES.ADD_TODO, todo }),
  toggleTodo: (_id: number) => ({ type: TYPES.TOGGLE_TODO, _id }),
  removeTodo: (_id: number) => ({ type: TYPES.REMOVE_TODO, _id })
};

export default todosReducer;

// TODO: Add updateTodo
// updateTodos(list, updated) {
//   const updatedIndex = list.findIndex(item => item._id === updated._id);
//   return [
//     ...list.slice(0, updatedIndex),
//     updated,
//     ...list.slice(updatedIndex + 1)
//   ];
// }
