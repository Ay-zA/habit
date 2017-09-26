import todosReducer, { actions } from './todos';
import deepFreeze from 'deep-freeze';
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
deepFreeze(actions);

describe('Todos:', () => {
  it('Add todo', () => {
    const action = actions.addTodo({ title: 'Todo 5', _id: 5 });
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
    const action = actions.removeTodo(2);
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
    const action = actions.toggleTodo(1);
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
