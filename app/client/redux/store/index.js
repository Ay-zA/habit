import configureStore from './configure';

const initialState = {
  todoState: {
    isFetching: false,
    todos: [{ _id: '0', title: "I'm initial todo", isCompleted: true }]
  }
};

const store = configureStore(initialState);

export default store;
