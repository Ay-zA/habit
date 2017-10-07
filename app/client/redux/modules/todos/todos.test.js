import deepFreeze from 'deep-freeze';
import todosReducer from './todos.reducer';
import todosActions from './todos.actions';

const initialState = [
  {
    _id: 1,
    title: 'Todo',
    isCompleted: false
  },
  {
    _id: 2,
    title: 'Todo 2',
    isCompleted: true
  },
  {
    _id: 4,
    title: 'Todo 4',
    isCompleted: false
  }
];

deepFreeze(initialState);
deepFreeze(todosActions);

describe('Todos:', () => {
  it('Add todo', () => {
    const action = todosActions.addTodo({ title: 'Todo 5', _id: 5 });
    const expectedState = [
      {
        _id: 1,
        title: 'Todo',
        isCompleted: false
      },
      {
        _id: 2,
        title: 'Todo 2',
        isCompleted: true
      },
      {
        _id: 4,
        title: 'Todo 4',
        isCompleted: false
      },
      {
        _id: 5,
        title: 'Todo 5',
        isCompleted: false
      }
    ];

    expect(todosReducer(initialState, action)).toEqual(expectedState);
  });
  it('Remove todo', () => {
    const action = todosActions.removeTodo(2);
    const expectedState = [
      {
        _id: 1,
        title: 'Todo',
        isCompleted: false
      },
      {
        _id: 4,
        title: 'Todo 4',
        isCompleted: false
      }
    ];

    expect(todosReducer(initialState, action)).toEqual(expectedState);
  });
  it('Toggle todo', () => {
    const action = todosActions.toggleTodo(1);
    const expectedState = [
      {
        _id: 1,
        title: 'Todo',
        isCompleted: true
      },
      {
        _id: 2,
        title: 'Todo 2',
        isCompleted: true
      },
      {
        _id: 4,
        title: 'Todo 4',
        isCompleted: false
      }
    ];

    expect(todosReducer(initialState, action)).toEqual(expectedState);
  });
});
