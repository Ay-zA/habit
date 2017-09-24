import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './todo-item.component';

const TodoList = ({ todos, handleRemove, handleToggle }) => (
  <ul className="todo__list">
    {todos.map(todo => <TodoItem key={todo._id} {...todo} handleRemove={handleRemove} handleToggle={handleToggle} />)}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array,
  handleRemove: PropTypes.func,
  handleToggle: PropTypes.func
};

export default TodoList;
