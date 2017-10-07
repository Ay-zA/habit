import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ _id, isCompleted, title, handleRemove, handleToggle }) => {
  const boundhandleRemove = handleRemove.bind(null, _id);
  const boundHandleToggle = handleToggle.bind(null, _id);
  return (
    <li className="todo__item">
      <input
        className="todo__item-toggle"
        checked={isCompleted}
        onChange={boundHandleToggle}
        type="checkbox"
      />
      <span className="todo__item-title">{title}</span>
      <button className="todo__item-remove" onClick={boundhandleRemove}>
        ×
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  isCompleted: PropTypes.bool,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired
};

TodoItem.defaultProps = {
  isCompleted: false
};

export default TodoItem;