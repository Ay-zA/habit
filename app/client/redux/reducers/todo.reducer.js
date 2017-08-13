import * as actionTypes from 'constants/actionTypes';

export default function todoReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_TODO:
      return [...state,
        Object.assign({}, action.todo)
      ];
    case actionTypes.REMOVE_TODO:
      return [...state.filter(todo => todo._id !== action.id)];
    case actionTypes.GET_TODOS_SUCCESS:
      return action.todos;
    default:
      return state;
  }
}
