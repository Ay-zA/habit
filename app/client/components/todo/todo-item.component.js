import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ _id, isCompeleted, title, handleRemove, handleToggle }) => {
  const boundhandleRemove = handleRemove.bind(null, _id);
  const boundHandleToggle = handleToggle.bind(null, _id);
  return (
    <li className="todo__item">
      <input className="todo__item-toggle" checked={isCompeleted} onChange={boundHandleToggle} type="checkbox" />
      <span className="todo__item-title">{title}</span>
      <button className="todo__item-remove" onClick={boundhandleRemove}>
        ×
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  isCompeleted: PropTypes.bool,
  title: PropTypes.string,
  _id: PropTypes.number,
  handleRemove: PropTypes.func,
  handleToggle: PropTypes.func
};

export default TodoItem;
