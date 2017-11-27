import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

import TodoItem from './todo-item.component';

const TodoList = ({ isFetching, todos, handleRemove, handleToggle }) => (
  <ul className="todo__list">
    {isFetching && <Spinner />}
    <div className={isFetching ? 'hidden' : undefined}>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          {...todo}
          handleRemove={handleRemove}
          handleToggle={handleToggle}
        />
      ))}
    </div>
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired
};

export default TodoList;
