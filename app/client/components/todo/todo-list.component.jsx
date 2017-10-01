import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './todo-item.component';

const TodoList = ({ todos, handleRemove, handleToggle }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <TodoItem key={todo._id} {...todo} handleRemove={handleRemove} handleToggle={handleToggle} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.boolean
    })
  ).isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired
};

export default TodoList;
